const { formatURL, getURLFromHTML } = require('./crawl.js')

//import jest from 'jest
const { test, expect } = require('@jest/globals')

test("formatURL", () => {
    const input = "http://google.com"
    const actual = formatURL(input)
    const expected = "google.com"

    expect(actual).toEqual(expected)
})

test("formatURL - slash in url", () => {
    const input = "http://google.com/"
    const actual = formatURL(input)
    const expected = "google.com"

    expect(actual).toEqual(expected)
})

test("formatURL-Capitals", () => {
    const input = "http://GOOGLE.com"
    const actual = formatURL(input)
    const expected = "google.com"

    expect(actual).toEqual(expected)
})

////////////////////////////////////////////

test("getURLFromHTML - absolute", () => {
    const input = `<html> <body>
        <a href = "http://google.com">GOOGLE</a>
    </body>
    </html>`



    const input2 = 'http://google.com'
    const actual = getURLFromHTML(input, input2)
    const expected = ["http://google.com"]

    expect(actual).toEqual(expected)
})

test("getURLFromHTML - relative", () => {
    const input = `<html>
    <body>
    <a href="/path/">GOOGLE</a>
    </body>
    </html>`
    const input2 = 'http://google.com'
    const actual = getURLFromHTML(input, input2)
    const expected = ["http://google.com/path/"]

    expect(actual).toEqual(expected)
})