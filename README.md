# turnt-tls

This is an advanced NodeJS implementation of Golang's utls repository with session support provided through [tough-cookie](https://www.npmjs.com/package/tough-cookie). It's syntax is similar to that of npm's popular (deprecated) request package. Additionally, it supports pseudo-header order as well as normal header order.

## Installation
```
npm i turnt-tls
```

## Setup
1. Clone the repository
2. Install the necessary dependencies with `npm install`
3. Run and build the test case `npm run start`

## What is TLS/SSL and why is it important?
Please read the following writeups for a better understanding of TLS/SSL Handshakes and why JA3 can fingerprint them.

1. [Salesforce Article](https://engineering.salesforce.com/tls-fingerprinting-with-ja3-and-ja3s-247362855967/)
2. [Darktrace Article](https://darktrace.com/blog/beyond-the-hash-how-unsupervised-machine-learning-unlocks-the-true-power-of-ja3)
3. [Medium Article](https://infosecwriteups.com/demystifying-ja3-one-handshake-at-a-time-c80b04ccb393)

## Support
Currently, the turnt-tls client supports the following methods: `GET`, `POST`, `FORM`, `PUT`, and `PUTFORM`. 

**Note: FORM is essentially a request with query parameters. We just decided this warranted a separate method.**

## Use Case
```
{
    var cookieJar = new CookieJar();

    async function checkTLS() {
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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-User': '?1',
                'Sec-Fetch-Dest': 'document',
                'Accept-Language': 'en-US,en;q=0.9'
            },
        }
        
        let GetResp = await turnt("https://incolumitas.com/pages/TLS-Fingerprint/", options)

        console.log(GetResp.status)
    }
    checkTLS();
}
```

## Notes
Much of the syntax is similar to the popular but deprecated [requests](https://www.npmjs.com/package/request) package.

I have also taken the liberty to provide pre-made binaries that will run on MacOS, Linux, and Windows, however you are free to build your own. All that would entail would be changing a few lines in the `./golang/build.bat` file.

Anyone is welcome to contribute to this module to implement any more http methods or functionality. Just make a pull request and I will review it :)

## Reflections
I would like to give an enormous shoutout to [Will](https://github.com/missingsemi) for his contributions to this repository. Please go check out his work!