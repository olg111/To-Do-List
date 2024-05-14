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
exports.deleteListId = exports.updateListId = exports.getAllLists = exports.getList = exports.createList = void 0;
const prisma_client_1 = require("../prisma/prisma-client");
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Please give the list a name" });
    }
    const existedList = yield prisma_client_1.prisma.list.findFirst({
        where: {
            name,
        }
    });
    if (existedList) {
        return res.status(400).json({ message: "A list with the same name already exists" });
    }
    const createdList = yield prisma_client_1.prisma.list.create({
        data: {
            name
        }
    });
    return res.status(201).json(createdList);
});
exports.createList = createList;
///////////////////////////////////////////////
const getList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name1 = (req.query.name || '');
    const list = yield prisma_client_1.prisma.list.findFirst({
        where: {
            name: name1,
        }
    });
    if (!list) {
        return res.status(400).json({ message: "No list with this name" });
    }
    return res.status(200).json(list);
});
exports.getList = getList;
//////////////////////////////////////////////////////
const getAllLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allLists = yield prisma_client_1.prisma.list.findMany();
    if (allLists.length < 1) {
        return res.status(400).json({ message: "No lists" });
    }
    return res.status(200).json(allLists);
});
exports.getAllLists = getAllLists;
//////////////////////////////////////////////////////
const updateListId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id1 = req.params.id;
    const { name } = req.body;
    console.log(name);
    console.log(id1);
    console.log(req.body);
    try {
        const updateList = yield prisma_client_1.prisma.list.update({
            where: {
                id: id1,
            },
            data: {
                name: name,
            },
        });
        return res.status(200).json(updateList);
    }
    catch (error) {
        return res.status(400).json({ message: "No list with such id" });
    }
});
exports.updateListId = updateListId;
//////////////////////////////////////////////////////
const deleteListId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id1 = req.params.id;
    try {
        const deleteList = yield prisma_client_1.prisma.list.delete({
            where: {
                id: id1,
            },
        });
        return res.status(200).json(deleteList);
    }
    catch (error) {
        return res.status(400).json({ message: "No list with such id" });
    }
});
exports.deleteListId = deleteListId;
// export { createList };
