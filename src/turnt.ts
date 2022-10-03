import * as ffi from 'ffi-napi'
import path from 'path'

export function turnt(url: string, options: any) : any  {
return new Promise (async (resolve, reject) => {


    let DOptions = {
        body: '',
        cookies: {},
        cookieJar: null,
        headers: {},
        method: 'GET',
        proxy: null,
        timeout: 0,
    }
    Object.assign(DOptions, options)
    options = DOptions;

    // Validation
    options["method"] = options["method"].toUpperCase()
    const validMethods = ["GET", "POST", "FORM", "PUT", "PUTFORM"];
    if (!validMethods.includes(options["method"]))
        reject(new Error("Method must be either GET, POST, FORM, PUT, or PUTFORM."));
    if (Number.isNaN(options["timeout"])) reject(new Error("Timeout must be a number."));
    if (typeof options["headers"] !== "object") reject(new Error("Headers must be an object."));

    if (CountAttributes(options["cookies"]) != 0 && options["cookieJar"] != null) reject(new Error("Only cookies or cookieJar may be set."))

    if (typeof options["cookies"] !== "object") reject(new Error("Cookies must be an object."));
    if (options["cookieJar"] !== null && typeof options["cookieJar"] !== "object") reject(new Error("cookiesJar must be a tough-cookie CookieJar."))

    if (options["body"] == null) options["body"] = '';
    if (options["method"] == "GET" && options["body"] != '') reject(new Error("Get requests can not have bodies."));
    
    if (options["proxy"] == null) options["proxy"] = "";

    // Loads DLL

    // * /Users/jeffmao/Documents/GitHub/ja3spoof/golang/goturnt.dylib
    let GoRequests = ffi.Library(path.join(__dirname, '../golang/goturnt'), {
        'CreateRequest': ['string', ['string','string','string','string','string', 'string']]
    })


    let headers = options["headers"];
    let cookies;
    let body = options["body"];
    // * Switch between cookieJar and default cookies

    if(options.cookieJar != null && options.cookie == undefined) {
        cookies = await convertCookies(url, options.cookieJar);
    } else {
        cookies = options["cookies"];
    }

    // There's no point in spoofing an ssl signature if ssl isn't used.
    //if (!url.startsWith("https"))
    //    throw new Error('Only https is supported.');

    let res = "";

    
    
    if (Buffer.isBuffer(body)) body = body.toString();
    if (typeof body === 'object') body = FormEncode(body);
    
    res = GoRequests.CreateRequest(url, JSON.stringify(headers), JSON.stringify(cookies), body, options["method"], options["proxy"])

    let result = JSON.parse(res);
    
    for (var header in result["headers"]) {
        result["headers"][header] = result["headers"][header][0]
    }
    if(options.cookieJar != null && options.cookie == undefined) setCookies(result.cookies, options.cookieJar, url);
    resolve(result);

});
}


function FormEncode (body : { [key: string]: string | number }) : string {
    let res = ""

    for (var key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            res += encodeURIComponent(key) + "=" + encodeURIComponent(body[key].toString()) + "&";
        }
    }

    return res.slice(0, -1);

}

function CountAttributes (obj : Object) {
    let count = 0;
    for (var k in obj) if (obj.hasOwnProperty(k)) count++;
    return count;
}

async function convertCookies(url: string, cookieJar: any) {
    var cookieArray: any;
    cookieArray = {};
    await cookieJar.getCookiesSync(url).forEach(async (cookie: any) => {
        cookieArray[cookie.key] = await cookie.value;
    });
    return cookieArray;
}

async function setCookies(cookies: any[], cookieJar: any, url: string) {
    if (cookies == null) return;
    cookies.forEach((cookie: {[key: string]: string | number}) => {
        cookieJar.setCookieSync(CookieToRaw(cookie), url);
    });
}

function CookieToRaw(cookieObj: any) {
    return `${cookieObj.Name}=${cookieObj.Value}`
}
