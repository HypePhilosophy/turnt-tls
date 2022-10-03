"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
exports.turnt = void 0;
var ffi = __importStar(require("ffi-napi"));
var path_1 = __importDefault(require("path"));
function turnt(url, options) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var DOptions, validMethods, GoRequests, headers, cookies, body, res, result, header;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    DOptions = {
                        body: '',
                        cookies: {},
                        cookieJar: null,
                        headers: {},
                        method: 'GET',
                        proxy: null,
                        timeout: 0,
                    };
                    Object.assign(DOptions, options);
                    options = DOptions;
                    // Validation
                    options["method"] = options["method"].toUpperCase();
                    validMethods = ["GET", "POST", "FORM", "PUT", "PUTFORM"];
                    if (!validMethods.includes(options["method"]))
                        reject(new Error("Method must be either GET, POST, FORM, PUT, or PUTFORM."));
                    if (Number.isNaN(options["timeout"]))
                        reject(new Error("Timeout must be a number."));
                    if (typeof options["headers"] !== "object")
                        reject(new Error("Headers must be an object."));
                    if (CountAttributes(options["cookies"]) != 0 && options["cookieJar"] != null)
                        reject(new Error("Only cookies or cookieJar may be set."));
                    if (typeof options["cookies"] !== "object")
                        reject(new Error("Cookies must be an object."));
                    if (options["cookieJar"] !== null && typeof options["cookieJar"] !== "object")
                        reject(new Error("cookiesJar must be a tough-cookie CookieJar."));
                    if (options["body"] == null)
                        options["body"] = '';
                    if (options["method"] == "GET" && options["body"] != '')
                        reject(new Error("Get requests can not have bodies."));
                    if (options["proxy"] == null)
                        options["proxy"] = "";
                    GoRequests = ffi.Library(path_1.default.join(__dirname, '../golang/goturnt'), {
                        'CreateRequest': ['string', ['string', 'string', 'string', 'string', 'string', 'string']]
                    });
                    headers = options["headers"];
                    body = options["body"];
                    if (!(options.cookieJar != null && options.cookie == undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, convertCookies(url, options.cookieJar)];
                case 1:
                    cookies = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    cookies = options["cookies"];
                    _a.label = 3;
                case 3:
                    res = "";
                    if (Buffer.isBuffer(body))
                        body = body.toString();
                    if (typeof body === 'object')
                        body = FormEncode(body);
                    res = GoRequests.CreateRequest(url, JSON.stringify(headers), JSON.stringify(cookies), body, options["method"], options["proxy"]);
                    result = JSON.parse(res);
                    for (header in result["headers"]) {
                        result["headers"][header] = result["headers"][header][0];
                    }
                    if (options.cookieJar != null && options.cookie == undefined)
                        setCookies(result.cookies, options.cookieJar, url);
                    resolve(result);
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.turnt = turnt;
function FormEncode(body) {
    var res = "";
    for (var key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            res += encodeURIComponent(key) + "=" + encodeURIComponent(body[key].toString()) + "&";
        }
    }
    return res.slice(0, -1);
}
function CountAttributes(obj) {
    var count = 0;
    for (var k in obj)
        if (obj.hasOwnProperty(k))
            count++;
    return count;
}
function convertCookies(url, cookieJar) {
    return __awaiter(this, void 0, void 0, function () {
        var cookieArray;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cookieArray = {};
                    return [4 /*yield*/, cookieJar.getCookiesSync(url).forEach(function (cookie) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _a = cookieArray;
                                        _b = cookie.key;
                                        return [4 /*yield*/, cookie.value];
                                    case 1:
                                        _a[_b] = _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, cookieArray];
            }
        });
    });
}
function setCookies(cookies, cookieJar, url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (cookies == null)
                return [2 /*return*/];
            cookies.forEach(function (cookie) {
                cookieJar.setCookieSync(CookieToRaw(cookie), url);
            });
            return [2 /*return*/];
        });
    });
}
function CookieToRaw(cookieObj) {
    return "".concat(cookieObj.Name, "=").concat(cookieObj.Value);
}
