import express, { Express, Request, Response } from "express";
import { createItem, getItem, getAllItems, updateItemId, deleteItemId } from "../controllers/items";
const router = express.Router();

router.post('/:listId', createItem);

router.get('/:listId/allItems', getAllItems);

router.get('/:listId/:id', getItem);

router.put('/:listId/:id', updateItemId);

router.delete('/:listId/:id', deleteItemId);


export default router