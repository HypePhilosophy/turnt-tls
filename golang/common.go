package main

import (
	"encoding/json"
	"fmt"
	http "github.com/adam-0001/fhttp"
	"github.com/adam-0001/fhttp/cookiejar"
	"log"
	"net/url"
)

func CreateHeaders(req *http.Request, headers string, method string) {
	// Default values for headers.

	// Gotta look at the accept header later to make sure I don't get caught lacking.
	req.Header.Set("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9")
	// req.Header.Set("accept-encoding", "gzip, deflate, br")
	req.Header.Set("accept-language", "en-US,en;q=0.9")

	req.Header.Set("cache-control", "no-cache")
	req.Header.Set("connection", "keep-alive")
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
	req.Header.Set("sec-fetch-dest", "document")
	req.Header.Set("sec-fetch-mode", "navigate")

	// check fetch-site
	req.Header.Set("sec-fetch-site", "none")
	req.Header.Set("sec-fetch-user", "?1")

	req.Header.Set("upgrade-insecure-requests", "1")
	req.Header.Set("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")

	var hmap map[string]string

	json.Unmarshal([]byte(headers), &hmap)

	for k, v := range hmap {
		req.Header.Set(k, v)
	}

}

func FillCookieJar(j *cookiejar.Jar, ru string, s string) {
	// Slice that the cookies string get parsed into
	var cookiearray map[string]interface{}
	// Set of cookie objects that gets passed to the cookiejar
	var cookieobjs []*http.Cookie
	// Parses json cookies string into cookiearray
	json.Unmarshal([]byte(s), &cookiearray)

	// Turns the raw domain url into a url object
	u, err := url.Parse(ru)
	if err != nil {
		log.Fatal(err)
	}

	// Loops through each cookie in the cookiearray slice and adds it to the object array.
	for k, v := range cookiearray {
		cookieobjs = append(cookieobjs, new(http.Cookie))
		cookieobjs[len(cookieobjs)-1].Name = fmt.Sprintf("%v", k)
		cookieobjs[len(cookieobjs)-1].Value = fmt.Sprintf("%v", v)
	}

	// Fills the cookies jar.
	j.SetCookies(u, cookieobjs)

}
