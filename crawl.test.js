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



test(' getURLsFromHTML',()=>{
    const input = `<html>
<body>
<a href="https://blog.boot.dev">Boot.dev Blog </a>
</body>
</html>`
    const actual = normalizeURL(input)
    const exected = 'blog.boot.dev/path'

    expect(actual).toEqual(exected)
})
