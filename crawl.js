const jsdom = require("jsdom");
const { JSDOM } = jsdom; // package jsdom https://www.npmjs.com/package/jsdom

async function crawl(currentUrl, urlBase, pages) {

    const urlBaseObject = new URL(urlBase)
    const currentUrlObject = new URL(currentUrl)
    if (urlBaseObject.hostname !== currentUrlObject.hostname) {
        return pages
    }

    const normalizedCurrentUrl = formatURL(currentUrl)
    if (pages[normalizedCurrentUrl] > 0) {
        pages[normalizedCurrentUrl]++
        return pages
    }

    pages[normalizedCurrentUrl] = 1  //pages object 

    try {
        const response = await fetch(currentUrl)

        if (response.status > 399) {
            console.log("error: " + response.status + "on " + currentUrl)
            return pages
        }

        const contentType = response.headers.get("Content-Type")
        if (!contentType.includes("text/html")) {
            console.log("error: " + contentType + "on " + currentUrl)
            return pages
        }

        const htmlBody = await response.text() //parse response as text not json

        const nextURLs = getURLFromHTML(htmlBody, urlBase)

        for (const nextURL of nextURLs) {
            pages = await crawl(urlBase, nextURL, pages) //
        }

    } catch (e) {
        console.log("error message: " + e.message)

    }

    return pages
}

function formatURL(url) {
    const urlObject = new URL(url)
    if (urlObject.pathname.length > 0 && urlObject.pathname.slice(-1) === '/') {
        return `${urlObject.hostname}${urlObject.pathname.slice(0, -1)}`
    }
    return `${urlObject.hostname}${urlObject.pathname}`
}

function getURLFromHTML(urlBody, urlBase) {
    const urls = []
    const dom = new JSDOM(urlBody)
    const linkedElements = dom.window.document.getElementsByTagName('a') //selects all anchors in arr
    for (const linkedElement of linkedElements) {
        if (linkedElement.href.slice(1, 0) === "/") {
            urls.push(`${urlBase}${linkedElement.href}`)
        } else {
            urls.push(linkedElement.href)
        } //
    }
    return urls;
}

//available for other modules
module.exports = {
    formatURL,
    getURLFromHTML,
    crawl
}
