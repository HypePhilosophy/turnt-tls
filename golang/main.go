package main

import "C"

import (
	"encoding/json"
	"fmt"
	"github.com/adam-0001/fhttp/cookiejar"
	"io"
	"log"
	"net/url"
	"strconv"
	"strings"

	"github.com/adam-0001/cclient"
	http "github.com/adam-0001/fhttp"
	tls "github.com/adam-0001/utls"
)

func main() {
	url := "https://incolumitas.com/pages/TLS-Fingerprint/"
	headers := "{\"accept\":\"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\",\"accept-language\":\"en-US,en;q=0.9\",\"cache-control\":\"max-age=0\",\"dnt\":\"1\",\"sec-ch-ua\":\"\\\"Chromium\\\";v=\\\"106\\\", \\\"Google Chrome\\\";v=\\\"106\\\", \\\"Not;A=Brand\\\";v=\\\"99\\\"\",\"sec-ch-ua-mobile\":\"?0\",\"sec-ch-ua-platform\":\"\\\"macOS\\\"\",\"sec-fetch-dest\":\"document\",\"sec-fetch-mode\":\"navigate\",\"sec-fetch-site\":\"none\",\"sec-fetch-user\":\"?1\",\"upgrade-insecure-requests\":\"1\",\"user-agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36\"}"
	cookies := "{}"
	body := ""
	method := "GET"
	proxy := ""

	if err := CreateRequest(C.CString(url), C.CString(headers), C.CString(cookies), C.CString(body), C.CString(method), C.CString(proxy)); err != nil {
		fmt.Println(err)
	}
}

//export CreateRequest
func CreateRequest(urlC *C.char, headerC *C.char, cookiesC *C.char, bodyC *C.char, methodC *C.char, proxyC *C.char) *C.char {
	// Turns parameters into go compatible types.
	dest := C.GoString(urlC)
	header := C.GoString(headerC)
	cookies := C.GoString(cookiesC)
	body := C.GoString(bodyC)
	method := C.GoString(methodC)
	proxy := C.GoString(proxyC)

	// reqMethod is needed because FORM is just a POST request, but the later code needs to be able to differentiate between the two.
	reqMethod := method
	if reqMethod == "FORM" {
		reqMethod = "POST"
	}

	var err error
	var client http.Client

	// Creates the http client and initialises the request.
	if proxy != "" {
		client, err = cclient.NewClient(tls.HelloChrome_Auto, proxy, true, 6)
	} else {
		client, err = cclient.NewClient(tls.HelloChrome_Auto, "", true, 6)
	}

	if err != nil {
		log.Fatal("Error creating client: ", err)
	}

	var req *http.Request
	if reqMethod == "GET" {
		req, _ = http.NewRequest(http.MethodGet, dest, nil)
	} else {
		req, err = http.NewRequest(http.MethodPost, dest, strings.NewReader(body))
	}

	CreateHeaders(req, header, method)

	if method == "POST" || method == "FORM" {
		req.Header.Set("content-length", strconv.Itoa(len(body)))
	}

	if err != nil {
		log.Fatal(err)
	}

	// Fills the cookie jar
	jar, err := cookiejar.New(new(cookiejar.Options))

	if cookies != "" {
		if err != nil {
			log.Fatal(err)
		}

		FillCookieJar(jar, dest, cookies)
		client.Jar = jar
	}

	// Sends the request defined above.
	resp, err := client.Do(req)
	//resp, err := client.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	// Turns response body into a string, converts to cstring and returns.

	bodySlice, _ := io.ReadAll(resp.Body)

	//buf := new(bytes.Buffer)
	//buf.ReadFrom(resp.Body)
	//bodyStr := buf.String()

	bodyStr := string(bodySlice)

	resp.Body.Close()

	urlParsed, _ := url.Parse(dest)

	respMap := make(map[string]interface{})
	respMap["headers"] = resp.Header
	//respMap["cookies"] = resp.Cookies()
	respMap["cookies"] = client.Jar.Cookies(urlParsed)
	respMap["body"] = bodyStr
	respMap["status"] = resp.StatusCode
	respMap["location"] = resp.Request.URL.String()

	respJson, _ := json.Marshal(respMap)

	return C.CString(string(respJson))
}
