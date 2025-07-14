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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getTranscript;
var axios_1 = require("axios");
// ✅ Extracts YouTube video ID from a full URL or accepts a direct ID
function extractVideoId(input) {
    var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = input.match(regex);
    return match ? match[1] : input.length === 11 ? input : null;
}
// ✅ Main function to fetch transcript from RapidAPI
function getTranscript(input_1) {
    return __awaiter(this, arguments, void 0, function (input, lang) {
        var videoId, options, response, data, fullText, error_1;
        var _a;
        if (lang === void 0) { lang = 'en'; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    videoId = extractVideoId(input);
                    if (!videoId) {
                        console.error('❌ Invalid YouTube URL or video ID:', input);
                        return [2 /*return*/, { text: '' }];
                    }
                    options = {
                        method: 'GET',
                        url: 'https://high-availability-youtube-transcript-api.p.rapidapi.com/yt_transcript',
                        params: {
                            video_id: videoId,
                            lang: lang,
                            format: 'json',
                        },
                        headers: {
                            'x-rapidapi-key': '99919ff464msh99b9a47695de3cap1af760jsn282fcfd2e0f1',
                            'x-rapidapi-host': 'high-availability-youtube-transcript-api.p.rapidapi.com',
                        },
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.request(options)];
                case 2:
                    response = _b.sent();
                    data = response.data;
                    // Assuming the API response includes `text` or an array you want to join
                    if (Array.isArray(data)) {
                        fullText = data
                            .map(function (item) { return item.text; })
                            .join(' ');
                        return [2 /*return*/, { text: fullText }];
                    }
                    else if (typeof data === 'object' && 'text' in data) {
                        return [2 /*return*/, data];
                    }
                    console.warn('⚠️ Unexpected API response format');
                    return [2 /*return*/, { text: '' }];
                case 3:
                    error_1 = _b.sent();
                    console.error('❌ Error fetching transcript:', ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.data) || error_1.message);
                    return [2 /*return*/, { text: '' }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
