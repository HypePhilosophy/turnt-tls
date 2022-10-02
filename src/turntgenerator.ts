function FormEncode (body : { [key: string]: string | number }) : string {
    let res = ""

    for (var key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            res += encodeURIComponent(key) + "=" + encodeURIComponent(body[key].toString()) + "&";
        }
    }

    return res.slice(0, -1);
}

// Returns the function that actually creates the requests.
export function TurntGenerator (method: string, responseFormat: string, browserType: string | null, acceptedStatusCode: number, GoRequests: any) : Function {
// keeping it here just in case I want proper typing later.
// headers?: { [key: string]: string | number }, cookies?: { [key: string]: string | number }, body?: string | { [key: string]: string | number }) => {

    return (url: string, options: any) => {

        let headers = options["headers"];
        let cookies = options["cookies"];
        let body = options["body"]

        // There's no point in spoofing an ssl signature if ssl isn't used.
        //if (!url.startsWith("https"))
        //    throw new Error('Only https is supported.');

        let res = "";

        if (method == "GET") {
            if (body) 
                throw new Error('Get requests cannot have bodies');

            res = GoRequests.CreateRequest(url, JSON.stringify(headers), JSON.stringify(cookies), "", "GET")
        }

        if (method == "POST" || method == "PUTFORM") {
            let b;
            if (Buffer.isBuffer(body)) {
                b = body.toString()
            } else if (typeof body === "object") {
                b = FormEncode(body)
            }

            res = GoRequests.CreateRequest(url, JSON.stringify(headers), JSON.stringify(cookies), b, "POST")
        }

        if ((method == "FORM" || method == "PUTFORM") && typeof body === "object") {
            res = GoRequests.CreateRequest(url, JSON.stringify(headers), JSON.stringify(cookies), FormEncode(body), "FORM")
        }


        let temp = JSON.parse(res);
        
        for (var header in temp["headers"]) {
            temp["headers"][header] = temp["headers"][header][0]
        }
        
        if (responseFormat == "JSON") {
        return temp;
        } else if (responseFormat == "string") {
            return JSON.stringify(temp);
        }


    }
}