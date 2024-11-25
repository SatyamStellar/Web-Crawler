const {normalizeURL, getURLsFromHTML} = require("./crawl.js");
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const exected = 'blog.boot.dev/path'

    expect(actual).toEqual(exected)
})

test('normalizeURL strip trailing',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const exected = 'blog.boot.dev/path'

    expect(actual).toEqual(exected)
})


test('normalizeURL capitals',()=>{
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const exected = 'blog.boot.dev/path'

    expect(actual).toEqual(exected)
})


test('normalizeURL strip http',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const exected = 'blog.boot.dev/path'

    expect(actual).toEqual(exected)
})



test(' getURLsFromHTML absolute',()=>{
    const inputHTMLBody = `<html>
                                <body>
                                     <a href="https://blog.boot.dev/path/">Boot.dev Blog </a>
                                </body>
                            </html>`
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const exected =["https://blog.boot.dev/path/"]

    expect(actual).toEqual(exected)
})



test(' getURLsFromHTML relative',()=>{
    const inputHTMLBody = `<html>
                                <body>
                                     <a href="/path/">Boot.dev Blog </a>

                                </body>
                            </html>`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const exected =["https://blog.boot.dev/path/"]

    expect(actual).toEqual(exected)
})




test(' getURLsFromHTML both',()=>{
    const inputHTMLBody = `<html>
                                <body>
                                     <a href="https://blog.boot.dev/path1/">boot.dev blog 1</a>
                                     <a href="/path2/">boot.dev blog 2</a>
                                </body>
                            </html>`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const exected =["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]

    expect(actual).toEqual(exected)
})



test(' getURLsFromHTML invalid',()=>{
    const inputHTMLBody = `<html>
                                <body>
                                     <a href="invalid">Invalid Url</a>
                                
                                </body>
                            </html>`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const exected =[]

    expect(actual).toEqual(exected)
})
