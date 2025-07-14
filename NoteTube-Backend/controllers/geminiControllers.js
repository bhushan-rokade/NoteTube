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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gemini_1 = __importDefault(require("../core_programs/gemini"));
const geminiController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { youtubeURL, message } = req.body;
        // Validate the inputs (youtubeURL and message are required)
        if (!youtubeURL || !message) {
            return res
                .status(400)
                .json({ error: 'youtubeURL and message are required' });
        }
        // Process the data (This can be your logic to summarize the YouTube video or handle the message)
        const responseMessage = yield (0, gemini_1.default)(youtubeURL, message);
        // Respond with the processed result
        res.status(200).json({ response: responseMessage });
    }
    catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = geminiController;
