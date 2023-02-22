package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"strings"

	http "github.com/adam-0001/fhttp"
	"github.com/adam-0001/fhttp/cookiejar"
)

func CreateHeaders(req *http.Request, headers string, method string) {
	// Default values for headers.
	//req.Header.Set("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9")
	// req.Header.Set("accept-encoding", "gzip, deflate, br")
	//req.Header.Set("accept-language", "en-US,en;q=0.9")
	//req.Header.Set("cache-control", "no-cache")
	//req.Header.Set("connection", "keep-alive")
	// content-length header is set outside this function.

	if method == "FORM" || method == "POST" {
		req.Header.Set("content-type", "application/x-www-form-urlencoded")
	}

	// host header set automatically
	// origin header should probably be manually set but as a default can just be the base path of the destination.
	if method == "FORM" {
		// a little indirect, but ensures that the port number doesn't come with.
		u, _ := url.Parse(req.Host)
		req.Header.Set("origin", "https://"+u.Hostname())
	}

	// Default user-agent
	//req.Header.Set("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")

	var hmap map[string]string
	var hArray []string

	if headers != "{}" {
		req.Header = http.Header{}
	}

	json.Unmarshal([]byte(headers), &hmap)

	strArr := strings.Split(headers, "\",\"")

	for _, v := range strArr {
		v = strings.ReplaceAll(v, "\"", "")
		v = strings.ReplaceAll(v, "{", "")
		v = strings.ToLower(v)
		str := strings.Split(v, ":")
		hArray = append(hArray, str[0])
		//oMap.Set(str[0], "header")
	}

	for k, v := range hmap {
		req.Header.Set(k, v)
	}

	for _, val := range hArray {
		req.Header.Add(http.HeaderOrderKey, val)
	}
}

func FillCookieJar(j *cookiejar.Jar, ru string, s string) {
	// Slice that the cookies string get parsed into
	var cookieArray map[string]interface{}
	// Set of cookie objects that gets passed to the cookiejar
	var cookieObjs []*http.Cookie
	// Parses json cookies string into cookieArray
	json.Unmarshal([]byte(s), &cookieArray)

	// Turns the raw domain url into a url object
	u, err := url.Parse(ru)
	if err != nil {
		log.Fatal(err)
	}

	// Loops through each cookie in the cookieArray slice and adds it to the object array.
	for k, v := range cookieArray {
		cookieObjs = append(cookieObjs, new(http.Cookie))
		cookieObjs[len(cookieObjs)-1].Name = fmt.Sprintf("%v", k)
		cookieObjs[len(cookieObjs)-1].Value = fmt.Sprintf("%v", v)
	}

	// Fills the cookies jar.
	j.SetCookies(u, cookieObjs)

}
