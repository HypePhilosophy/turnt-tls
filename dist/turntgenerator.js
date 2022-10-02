"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurntGenerator = void 0;
function FormEncode(body) {
    var res = "";
    for (var key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            res += encodeURIComponent(key) + "=" + encodeURIComponent(body[key].toString()) + "&";
        }
    }
    return res.slice(0, -1);
}
// Returns the function that actually creates the requests.
function TurntGenerator(method, responseFormat, browserType, acceptedStatusCode, GoRequests) {
    // keeping it here just in case I want proper typing later.
    // headers?: { [key: string]: string | number }, cookies?: { [key: string]: string | number }, body?: string | { [key: string]: string | number }) => {
    return function (url, options) {
        var headers = options["headers"];
        var cookies = options["cookies"];
        var body = options["body"];
        // There's no point in spoofing an ssl signature if ssl isn't used.
        //if (!url.startsWith("https"))
        //    throw new Error('Only https is supported.');
        var res = "";
        if (method == "GET") {
            if (body)
                throw new Error('Get requests cannot have bodies');
            res = GoRequests.CreateRequest(url, JSON.stringify(headers), JSON.stringify(cookies), "", "GET");
        }
        if (method == "POST" || method == "PUTFORM") {
            var b = void 0;
            if (Buffer.isBuffer(body)) {
                b = body.toString();
            }
            else if (typeof body === "object") {
                b = FormEncode(body);
            }
            res = GoRequests.CreateRequest(url, JSON.stringify(headers), JSON.stringify(cookies), b, "POST");
        }
        if ((method == "FORM" || method == "PUTFORM") && typeof body === "object") {
            res = GoRequests.CreateRequest(url, JSON.stringify(headers), JSON.stringify(cookies), FormEncode(body), "FORM");
        }
        var temp = JSON.parse(res);
        for (var header in temp["headers"]) {
            temp["headers"][header] = temp["headers"][header][0];
        }
        if (responseFormat == "JSON") {
            return temp;
        }
        else if (responseFormat == "string") {
            return JSON.stringify(temp);
        }
    };
}
exports.TurntGenerator = TurntGenerator;
