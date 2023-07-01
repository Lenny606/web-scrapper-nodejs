const { formatURL } = require('./crawl.js')

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
