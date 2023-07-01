function formatURL(url) {
    const urlObject = new URL(url)
    if (urlObject.pathname.length > 0 && urlObject.pathname.slice(-1) === '/') {
        return `${urlObject.hostname}${urlObject.pathname.slice(0, -1)}`
    }
    return `${urlObject.hostname}${urlObject.pathname}`
}

//available for other modules
module.exports = {
    formatURL
}
