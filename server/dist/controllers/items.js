"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemId = exports.updateItemId = exports.getAllItems = exports.getItem = exports.createItem = void 0;
const prisma_client_1 = require("../prisma/prisma-client");
//.../api/item/listId
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const listId = req.params.listId;
    if (!name) {
        return res.status(400).json({ message: "Please give the item a name" });
    }
    const existedList = yield prisma_client_1.prisma.list.findFirst({
        where: {
            id: listId
        }
    }); ////????
    if (!existedList) {
        return res.status(400).json({ message: "No list with this id" });
    } //???
    const existedItem = yield prisma_client_1.prisma.item.findFirst({
        where: {
            name,
        }
    });
    if (existedItem) {
        return res.status(400).json({ message: "An item with the same name already exists" });
    }
    const createdItem = yield prisma_client_1.prisma.item.create({
        data: {
            name,
            listId,
        },
    });
    return res.status(201).json(createdItem);
});
exports.createItem = createItem;
///////////////////////////////////////////////
//.../api/item/listId/Id
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listId;
    const id = req.params.id;
    const item = yield prisma_client_1.prisma.item.findFirst({
        where: {
            listId,
            id,
        }
    });
    console.log(item);
    if (!item) {
        return res.status(400).json({ message: "No item with this name/id" });
    }
    return res.status(200).json(item);
});
exports.getItem = getItem;
//////////////////////////////////////////////////////
//.../api/item/listId/allItems
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listId;
    const allItems = yield prisma_client_1.prisma.item.findMany({
        where: {
            listId,
        }
    });
    return res.status(200).json(allItems);
});
exports.getAllItems = getAllItems;
//////////////////////////////////////////////////////
//.../api/item/listId/id
const updateItemId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const listId = req.params.listId;
    const { name } = req.body;
    try {
        const updateLItem = yield prisma_client_1.prisma.item.update({
            where: {
                id,
                listId,
            },
            data: {
                name,
            },
        });
        return res.status(200).json(updateLItem);
    }
    catch (error) {
        return res.status(400).json({ message: "No item with such name/id" });
    }
});
exports.updateItemId = updateItemId;
//////////////////////////////////////////////////////
//.../api/item/listId/id
const deleteItemId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listId;
    const id = req.params.id;
    try {
        const deleteItem = yield prisma_client_1.prisma.item.delete({
            where: {
                listId,
                id,
            },
        });
        return res.status(200).json(deleteItem);
    }
    catch (error) {
        return res.status(400).json({ message: "No litem with such name/id" });
    }
});
exports.deleteItemId = deleteItemId;
// export { createList };
