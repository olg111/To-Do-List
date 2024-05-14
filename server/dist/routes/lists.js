"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lists_1 = require("../controllers/lists");
const router = express_1.default.Router();
router.post('/', lists_1.createList);
router.get('/allLists', lists_1.getAllLists);
router.get('/:id', lists_1.getList);
router.delete('/:id', lists_1.deleteListId);
router.put('/:id', lists_1.updateListId);
exports.default = router;
// module.exports = router
