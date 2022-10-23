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
Object.defineProperty(exports, "__esModule", { value: true });
var turnt_1 = require("./turnt");
var tough_cookie_1 = require("tough-cookie");
var cookieJar = new tough_cookie_1.CookieJar();
testTLS();
function testTLS() {
    return __awaiter(this, void 0, void 0, function () {
        var options, GetResp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        method: 'GET',
                        cookieJar: cookieJar,
                        headers: {
                            'Connection': 'keep-alive',
                            'Pragma': 'no-cache',
                            'Cache-Control': 'no-cache',
                            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
                            'sec-ch-ua-mobile': '?0',
                            'DNT': '1',
                            'Upgrade-Insecure-Requests': '1',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'none',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'Accept-Language': 'en-US,en;q=0.9'
                        },
                    };
                    return [4 /*yield*/, (0, turnt_1.turnt)("https://incolumitas.com/pages/TLS-Fingerprint/", options)
                        // console.log(GetResp.body);
                    ];
                case 1:
                    GetResp = _a.sent();
                    // console.log(GetResp.body);
                    console.log(GetResp.status);
                    return [2 /*return*/];
            }
        });
    });
}
function transformCookie(cookies) {
    return __awaiter(this, void 0, void 0, function () {
        var cookieArray;
        return __generator(this, function (_a) {
            cookieArray = {};
            if (cookies == null)
                return [2 /*return*/];
            cookies.forEach(function (cookie) {
                cookieArray[cookie.key] = cookie.value;
            });
            return [2 /*return*/, cookieArray];
        });
    });
}
function setCookies(cookies) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (cookies == null)
                        return [2 /*return*/];
                    cookies.forEach(function (cookie) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cookieJar.setCookie("".concat(cookie.Name, "=").concat(cookie.Value), 'https://www.amazon.com')];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, transformCookie((cookieJar.toJSON().cookies))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
