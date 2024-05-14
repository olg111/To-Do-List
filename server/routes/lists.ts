import express, { Express, Request, Response } from "express";
import { createList, getList, getAllLists, deleteListId, updateListId } from "../controllers/lists";
const router = express.Router();

router.post('/', createList );

router.get('/allLists', getAllLists);

router.get('/:id', getList);

router.delete('/:id', deleteListId);

router.put('/:id', updateListId);


export default router
// module.exports = router