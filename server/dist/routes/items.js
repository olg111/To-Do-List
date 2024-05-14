"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_1 = require("../controllers/items");
const router = express_1.default.Router();
router.post('/:listId', items_1.createItem);
router.get('/:listId/allItems', items_1.getAllItems);
router.get('/:listId/:id', items_1.getItem);
router.put('/:listId/:id', items_1.updateItemId);
router.delete('/:listId/:id', items_1.deleteItemId);
exports.default = router;
