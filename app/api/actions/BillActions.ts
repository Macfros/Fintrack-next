'use server'

import getUser from "../hooks/getUser";
import prisma from "@/libs/prismadb";
import { startOfMonth, endOfMonth } from 'date-fns';


// Get the start and end dates for the current month
const startDate = startOfMonth(new Date());
const endDate = endOfMonth(new Date());

const userFunction = async() => {
    return await getUser();
}


export async function getTotalAmount(){
    try {
        const user = await userFunction();
        const id = user?.id;

        if(!user || !user.id){
            throw new Error("User not found");
        }
        const records = await prisma.photo.findMany({
            where: {
                authorId: id,
            }
        });
        
        let totalAmount = 0;

        if(records.length>0)
            records.map((data) => totalAmount+=data.amount);

        const totalAmountString = new Intl.NumberFormat("en-IN").format(totalAmount);

        return totalAmountString;
        
    } catch (error) {
        throw error;
    }
}


export async function getMonthlyAmount(){
    try {
        const user = await userFunction();
        const id = user?.id;

        if(!user || !user.id){
            throw new Error("User not found");
        }
        const records = await prisma.photo.findMany({
            where: {
                authorId: id,
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });


        let totalAmount = 0;

        if(records.length>0)
            records.map((data) => totalAmount+=data.amount);

        const totalAmountString = new Intl.NumberFormat("en-IN").format(totalAmount);

        return totalAmountString;
        
    } catch (error) {
        throw error;
    }
}


export async function getMostSpent(){
    try {
        const user = await userFunction();
        const id = user?.id;

        if(!user || !user.id){
            throw new Error("User not found");
        }
        const records = await prisma.photo.findMany({
            where: {
                authorId: id,
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        
        let maxAmount = 0;
        let maxCategory = '';
        const categoryTotalAmountMap = new Map();


            if(records.length>0)
            {
                records.map((data) =>{

                    const currentAmount = categoryTotalAmountMap.get(data.category) || 0;
                    const newAmount = currentAmount + data.amount;
                    categoryTotalAmountMap.set(data.category, newAmount);
            
                    if (newAmount > maxAmount) {
                        maxAmount = newAmount;
                        maxCategory = data.category;
                    }
                });


            }

            const record = await prisma.photo.findFirst({
                where: {
                    category: maxCategory,
                }
            })
            
            const myObj = {
                category: record?.category,
                amount: record? new Intl.NumberFormat("en-IN").format(record.amount): undefined
            };

       

        return JSON.stringify(myObj);
        
    } catch (error) {
        throw error;
    }
}


export async function pieDataTotal(){
    try {
        const user = await userFunction();
        const id = user?.id;

        const records = await prisma.photo.findMany({
            where: {
                authorId: id
            }
        });

        const dataMap = new Map();

        records.map((record)=> {

           if (dataMap.has(record.category)) {
            dataMap.set(record.category, dataMap.get(record.category) + record.amount);
            } else {
                dataMap.set(record.category, record.amount);
            }
    });

    const dataObject: {[key: string]: number} = {};
        dataMap.forEach((value, key) => {
            dataObject[key] = value;
        });

        const labels: string[] = [];
    const data: number[] = [];

    dataMap.forEach((value, key) => {
      labels.push(key);
      data.push(value);
    });

   
    return { labels, data };

    } catch (error: any) {

        console.log("Error colecting data:"+ error.message);
        throw error;
    }
}

export async function pieDataMonthly(){
    try {
        const user = await userFunction();
        const id = user?.id;

        const records = await prisma.photo.findMany({
            where: {
                authorId: id,
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            }
        });

        const dataMap = new Map();

        records.map((record)=> {

           if (dataMap.has(record.category)) {
            dataMap.set(record.category, dataMap.get(record.category) + record.amount);
            } else {
                dataMap.set(record.category, record.amount);
            }
    });

    const dataObject: {[key: string]: number} = {};
        dataMap.forEach((value, key) => {
            dataObject[key] = value;
        });

        const labels: string[] = [];
    const data: number[] = [];

    dataMap.forEach((value, key) => {
      labels.push(key);
      data.push(value);
    });

   
    return { labels, data };

    } catch (error: any) {

        console.log("Error colecting data:"+ error.message);
        throw error;
    }
}



export async function getMisc(){
    try {
        const user = await userFunction();
        const id = user?.id;

        if(!user || !user.id){
            throw new Error("User not found");
        }
        const records = await prisma.photo.findMany({
            where: {
                authorId: id,
                category: "Miscellaneous",
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        
        let miscAmount = 0;
        
        if (records.length > 0) {
            records.forEach((record) => {
                miscAmount += record.amount;
            });
        }
        
        return miscAmount.toLocaleString();
        
    } catch (error) {
        throw error;
    }
}



export async function BillInfo(val: any){
    try {
        
        const id = await val;

        const bill = await prisma.photo.findFirst({
            where:{
                id: id
            },
            include: {
                subitems: true
            }
        });

        return bill;

    } catch (error) {
        console.log("An error occured");
        throw error;
    }
}