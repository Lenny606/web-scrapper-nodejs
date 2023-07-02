const { sortPages } = require('./report.js')

//import jest from 'jest
const { test, expect } = require('@jest/globals')

test("sortPages", () => {
    const input = {
        'https:google.com': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https:google.com', 3],
        ['https:google.com/path', 1]
    ]

    expect(actual).toEqual(expected)
})