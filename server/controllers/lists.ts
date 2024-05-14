import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";


interface IBodyList {
    name: string
}

export const createList = async (req: Request, res: Response) => {
    const { name }: IBodyList = req.body;

    if(!name){
        return res.status(400).json({message: "Please give the list a name"})
    }

    const existedList = await prisma.list.findFirst({
        where: {
            name,
        }
    });

     if(existedList){
        return res.status(400).json({message: "A list with the same name already exists"})
     } 

    const createdList = await prisma.list.create({
        data: {
            name
        }
    });

    return res.status(201).json(
        createdList
    )
}

///////////////////////////////////////////////
// .../api/list/id
export const getList = async (req: Request, res: Response) => {
    // const name = (req.query.name || '') as string;
    const id = req.params.id;


    const list = await prisma.list.findFirst({
        where: {
            id,
        }
    });

    if(!list){
        return res.status(400).json({message: "No list with this name/id"})
     }

    return res.status(200).json(
        list
    )   
}

//////////////////////////////////////////////////////

// .../api/list/allLists
export const getAllLists = async (req: Request, res: Response) => {
    const allLists = await prisma.list.findMany();

    console.log("allLists", allLists)

    return res.status(200).json(
        allLists 
    )
}
//////////////////////////////////////////////////////

// .../api/list/id
export const updateListId = async (req: Request, res: Response) => {
    const id1 = req.params.id;
    const { name }: IBodyList = req.body;

    try{
        const updateList = await prisma.list.update({
            where: {
            id: id1,
            },
            data: {
                name: name,
            },
    
        })

        return res.status(200).json(
            updateList
        )
    } catch (error) {
        return res.status(400).json({message: "No list with such id"})
    }
}

//////////////////////////////////////////////////////

export const deleteListId = async (req: Request, res: Response) => {

    const id1 = req.params.id;

    try { 
        const deleteList = await prisma.list.delete({
            where: {
            id: id1,
            },
        })
        return res.status(200).json(
            deleteList 
        )
    } catch (error) {
        return res.status(400).json({message: "No list with such id"})
    }
}

// export { createList };
