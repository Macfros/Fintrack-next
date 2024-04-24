'use server'


import * as mindee from "mindee";
import { NextRequest, NextResponse } from 'next/server';
import fs from "fs";
import { ReceiptV5Document } from 'mindee/src/product/receipt/receiptV5Document';
import { FormItem } from '@/components/ui/form';
import prisma from "@/libs/prismadb";
import getUser from '../../hooks/getUser';
import { savePhotosToLocal, uploadPhotosToCloudinary } from '../UploadBillsActions';

import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUD_API_KEY as string,
    api_secret: process.env.CLOUD_API_SECRET as string,
  });

export async function POST(req:any, res: any) {
    try{

        const user = await getUser();
        const formData = await req.formData();
        let newFiles = await savePhotosToLocal(formData);
        newFiles= await uploadPhotosToCloudinary(newFiles);
        
            const mindeeClient = new mindee.Client({ apiKey: process.env.MINDEE_API_KEY });
                // Load a file from disk
                const inputSource = await mindeeClient.docFromUrl(newFiles[0].secure_url);

                // Parse the file
                const apiResponse =  mindeeClient.parse(
                mindee.product.ReceiptV5,
                inputSource
                );

                // Handle the response Promise
                apiResponse.then(async(resp) => {
                // print a string summary

                const currphoto = await prisma.photo.create({
                    data: {
                        name: resp.document.inference.prediction.supplierName.value || "",
                        category: resp.document.inference.prediction.category.value || " ",
                        amount: resp.document.inference.prediction.totalAmount.value || 0,
                        authorId: user?.id,
                        secure_url: newFiles[0].secure_url,
                        subitems: {
                            createMany: {
                                data: resp.document.inference.prediction.lineItems.map(item => ({
                                    name: item.description || "",
                                    amount: item.totalAmount || 0
                                }))
                            }
                        }
                    },
                    include: {
                        subitems: true
                    }
                });
                    
                })
                .catch((error) => {
                    console.log("Error in promise ->",error);
                });

                    return NextResponse.json({status: 200});
                

    } catch (error){
        console.log("Error occured!", error);
        throw error;
    }
}