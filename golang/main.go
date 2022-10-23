package main

import "C"

import (
	"encoding/json"
	"github.com/adam-0001/fhttp/cookiejar"
	"io"
	"log"
	"net/url"
	"strconv"
	"strings"

	// "github.com/x04/cclient"
	"github.com/adam-0001/cclient"
	http "github.com/adam-0001/fhttp"
	tls "github.com/adam-0001/utls"
	// "github.com/HypePhilosophy/cclient"
	// tls "github.com/refraction-networking/utls"
)

func main() {}

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
