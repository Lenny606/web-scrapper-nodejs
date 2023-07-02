function sortPages(pages) {

    //convert object to array of arrays where first index is key, second index is value [[http,count],[http,count]]
    const pagesArr = Object.entries(pages)

    pagesArr.sort((a, b) => {
        //custom sorting by value from array what has index 1 [http,count]
        //return value 1/-1
        aElement = a[1]
        bElement = b[1]
        return b[1] - a[1]

    })

    return pagesArr
}

//logs the results
function logResults(pages) {
    const sortgedPages = sortPages(pages)
    for (const page of sortgedPages) {
        const url = page[0]
        const hits = page[1]
        console.log("foudn url: " + url + "with hits: " + hits)
    }
}


module.exports = {
    sortPages,
    logResults
}