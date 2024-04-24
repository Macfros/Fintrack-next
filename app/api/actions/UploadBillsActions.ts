'use server'

import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import cloudinary from 'cloudinary';
import getUser from '../hooks/getUser';
import prisma from "@/libs/prismadb";



cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUD_API_KEY as string,
    api_secret: process.env.CLOUD_API_SECRET as string,
  });

  export async function savePhotosToLocal(formData: any) {
    try {
        const files = formData.getAll('files'); // Assuming the field name is 'files'
        const filesObj: any = [];

        // Use `Promise.all` to wait for all asynchronous operations to complete
        await Promise.all(files.map(async (file: any) => {
            const data = await file.arrayBuffer();
            const buffer = Buffer.from(data);
            const name = uuidv4();
            const ext = file.type.split("/")[1];

            const tempDir = os.tmpdir();
            const uploadDir = path.join(tempDir, `${name}.${ext}`);

            // Write file content to disk
            await fs.writeFile(uploadDir, buffer);

            const newObj = {
                filename: `${name}.${ext}`,
                filepath: uploadDir,
            };

            // Push the new object into the array
            filesObj.push(newObj);
        }));

        // Return the filesObj array after all files have been processed
        return filesObj;
    } catch (error: any) {
        throw new Error(`Failed to save files locally: ${error.message}`);
    }
}

export async function getAllBills(){
        try {
            const data = await prisma.photo.findMany({
                orderBy: {
                    createdAt: 'desc',
                }
            });

            return data;

        } catch (error) {
            
            console.log("Something went Wrong");
            throw error;
        }
}

export async function DeleteBill(val: any){
    try {
        const id = await val;

        const deletedsubbills = await prisma.subitem.deleteMany({
            where: {
                photoId: id
            }
        })

        const deletedbill = await prisma.photo.delete({
            where: {
                id: id
            }
        });



        return deletedbill;
    } catch (error) {
        
        throw error;
    }
}


export async function uploadPhoto(formData: any){
    try {
        const user = await getUser();
        //console.log(formData);
        const name = formData.get('name');
        const category = formData.get('category');
        const price = formData.get('price');
        const priceInt = parseInt(price, 10);
         const newFiles = await savePhotosToLocal(formData);
         
         const photos = await uploadPhotosToCloudinary(newFiles);

         if (user && user.id) {
           
            const currphoto = await prisma.photo.create({
                data: {
                    name: name,
                    category: category,
                    amount: priceInt,
                    authorId: user.id,
                    secure_url: photos[0].secure_url,
                }
            });

            return currphoto;
        } else {
            // Handle the case where user or user.id is undefined
            return { message: "Error", status: 200 };
        }
         
    } catch (error) {
         console.error(error);
    }
 }
 



 export async function uploadPhotosToCloudinary(newFiles: any){
    try {
        const multiplePhotosPromise = newFiles.map((file:any) => (
            cloudinary.v2.uploader.upload(file.filepath, {folder: 'bills_upload'})
        ));

        return await Promise.all(multiplePhotosPromise);
    } catch (error) {
        console.error("Error uploading photos to Cloudinary:", error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}


