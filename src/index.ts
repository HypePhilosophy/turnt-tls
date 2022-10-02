import { turnt } from "./client";
import { CookieJar } from "tough-cookie";

var cookieJar = new CookieJar();

testTLS();
// diffSiteTest();
async function testTLS() {
    let options = {
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
    }
    
    let GetResp = await turnt("https://incolumitas.com/pages/TLS-Fingerprint/", options)

    // console.log(GetResp.body);

    console.log(GetResp.status)
}

async function diffSiteTest() {
    let options = {
        method: 'GET',
        cookieJar: cookieJar,
        headers: {
            'authority': 'www.bestbuy.com',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
            'sec-ch-ua-mobile': '?0',
            'dnt': '1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'en-US,en;q=0.9',
        },
    }
    
    let GetResp = await turnt("https://www.bestbuy.com/", options)

    console.log(GetResp);
}

async function transformCookie(cookies: any) {
    var cookieArray: any;
    cookieArray = {};
    if (cookies == null) return
    cookies.forEach((cookie: any) => {
        cookieArray[cookie.key] = cookie.value;
    });
    return cookieArray;
}

async function setCookies(cookies: any) {
    if (cookies == null) return
    cookies.forEach(async (cookie: any) => {
        await cookieJar.setCookie(`${cookie.Name}=${cookie.Value}`,'https://www.amazon.com')
    });
    return await transformCookie((cookieJar.toJSON().cookies))
}