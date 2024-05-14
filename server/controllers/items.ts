import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";


interface IBobyItem {
    name: string
}

//.../api/item/listId
export const createItem = async (req: Request, res: Response) => {
    const { name }: IBobyItem = req.body;
    const listId = req.params.listId;

    if(!name){
        return res.status(400).json({message: "Please give the item a name"})
    }

    const existedList = await prisma.list.findFirst({
        where: {
            id : listId
        }
    }); ////????

     if(!existedList){
        return res.status(400).json({message: "No list with this id"})
     } //???

     const existedItem = await prisma.item.findFirst({
        where: {
            name,
        }
    });

     if(existedItem){
        return res.status(400).json({message: "An item with the same name already exists"})
     } 

    const createdItem = await prisma.item.create({

        data: {
            name,
            listId,
        },
    });

    return res.status(201).json(
        createdItem
    )
}

///////////////////////////////////////////////
//.../api/item/listId/Id
export const getItem = async (req: Request, res: Response) => {

    const listId = req.params.listId;
    const id = req.params.id;

    const item = await prisma.item.findFirst({
        where: {
            listId,
            id,   
        }
    });

    console.log(item)

    if(!item){
        return res.status(400).json({message: "No item with this name/id"})
     }

    return res.status(200).json(
        item
    )   
}

//////////////////////////////////////////////////////
//.../api/item/listId/allItems
export const getAllItems = async (req: Request, res: Response) => {
    const listId = req.params.listId;

    const allItems = await prisma.item.findMany({
        where: {
            listId,  
        }  
    });

    return res.status(200).json(
        allItems 
    )
}
//////////////////////////////////////////////////////

//.../api/item/listId/id
export const updateItemId = async (req: Request, res: Response) => {
    const id = req.params.id;
    const listId = req.params.listId;
    const { name }: IBobyItem = req.body;

    try{
        const updateLItem = await prisma.item.update({
            where: {
                id,
                listId,
            },
            data: {
                name,
            },
    
        })

        return res.status(200).json(
            updateLItem
        )
    } catch (error) {
        return res.status(400).json({message: "No item with such name/id"})
    }
}

//////////////////////////////////////////////////////

//.../api/item/listId/id
export const deleteItemId = async (req: Request, res: Response) => {

    const listId = req.params.listId;
    const id = req.params.id;

    try { 
        const deleteItem = await prisma.item.delete({
            where: {
                listId,
                id,
            },
        })
        return res.status(200).json(
            deleteItem
        )
    } catch (error) {
        return res.status(400).json({message: "No litem with such name/id"})
    }
}

// export { createList };
