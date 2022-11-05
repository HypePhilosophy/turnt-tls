import { turnt } from "./turnt";
import { CookieJar } from "tough-cookie";
import { inflateRaw } from "zlib";

var cookieJar = new CookieJar();

// testTLS();
// testPeetTLS();
testZalando();
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

async function testPeetTLS() {
    let options = {
        method: 'GET',
        cookieJar: cookieJar,
        headers: {
            // 'authority': 'tls.peet.ws',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'dnt': '1',
            'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        }
    }

        let response = await turnt("https://tls.peet.ws/api/all", options)
        console.log(response.body)
}

async function testZalando() {
    const options = {
      method: "GET",
      cookieJar: cookieJar,
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'dnt': '1',
        'pragma': 'no-cache',
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
      },
    };
  
    //   Produces correct response body
    //   const fingerPrintResponse = await turnt(
    //     "https://incolumitas.com/pages/TLS-Fingerprint/",
    //     options
    //   );
  
    //   console.log(fingerPrintResponse.body);
    //   console.log(fingerPrintResponse.status);
  
    //   Produces encrypted response body
    const zalandoResponse = await turnt("https://en.zalando.de/?_rfl=de", options);
  
    console.log(zalandoResponse.body.toString("utf8"));
    console.log(zalandoResponse.status);
  }
