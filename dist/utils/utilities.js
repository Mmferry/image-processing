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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFileByName = exports.processImg = exports.errorHandler = exports.isOriginalImgExist = exports.makeDir = exports.removeDir = exports.INPUT_FILE = exports.THUMB_PATH = exports.DIR_PATH = void 0;
var sharp_1 = __importDefault(require("sharp"));
var node_fs_1 = require("node:fs");
var promises_1 = require("node:fs/promises");
var node_path_1 = __importDefault(require("node:path"));
var data_1 = require("./data");
exports.DIR_PATH = "".concat(node_path_1.default.resolve('./'), "/src/images");
exports.THUMB_PATH = "".concat(exports.DIR_PATH, "/thumbnails");
var INPUT_FILE = function (filename) {
    return "".concat(exports.DIR_PATH, "/").concat(filename, ".jpg");
};
exports.INPUT_FILE = INPUT_FILE;
var removeDir = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fs_1.promises.rmdir(exports.THUMB_PATH, { recursive: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.removeDir = removeDir;
var makeDir = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fs_1.promises.mkdir(exports.THUMB_PATH)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.makeDir = makeDir;
var isOriginalImgExist = function (filename) {
    return data_1.images.includes(filename);
};
exports.isOriginalImgExist = isOriginalImgExist;
var errorHandler = function (props) {
    if (!props.filename)
        return props.res
            .status(400)
            .send('Bad request, query parameter ( filename ) is required.');
    if (!props.width)
        return props.res
            .status(400)
            .send('Bad request, query parameter ( width ) is required.');
    if (!props.height)
        return props.res
            .status(400)
            .send('Bad request, query parameter ( height ) is required.');
    if (!(0, exports.isOriginalImgExist)(props.filename) ||
        !(0, node_fs_1.existsSync)((0, exports.INPUT_FILE)(props.filename)))
        return props.res
            .status(404)
            .send('Image does not exist!, try another filename');
};
exports.errorHandler = errorHandler;
var processImg = function (props) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, sharp_1.default)((0, exports.INPUT_FILE)(props.filename))
                    .resize(props.width, props.height)
                    .toFile("".concat(exports.THUMB_PATH, "/").concat(props.filename, "_").concat(props.width, "_").concat(props.height, ".jpg"))
                    .then(function (info) { })
                    .catch(function (err) {
                    return props.res
                        .status(500)
                        .send('Something went wrong, please try later!');
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.processImg = processImg;
var findFileByName = function (dir, name) { return __awaiter(void 0, void 0, void 0, function () {
    var matchedFile, files, _i, files_1, file, filename, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                matchedFile = false;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, promises_1.readdir)(dir)];
            case 2:
                files = _a.sent();
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    filename = node_path_1.default.parse(file).name;
                    if (filename === name) {
                        matchedFile = true;
                    }
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, matchedFile];
        }
    });
}); };
exports.findFileByName = findFileByName;
