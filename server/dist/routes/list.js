"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', function (req, res) {
    res.send('lists');
});
// router.get('/', (req: Request, res: Response) => {
//     res.send('Hello World !')
// });
exports.default = router;
// module.exports = router
