const { crawl } = require('./crawl');

async function main() {

    if (process.argv.length < 3) {
        console.log("error on input - no arguments")
        process.exit(1)  //standard error on exit
    }

    // for (const arg of process.argv) {  //logs arguments in console
    //     console.log(arg)
    // }

    if (process.argv.length > 3) {
        console.log("error on input - too many arguments")
        process.exit(1)
    }

    const urlBase = process.argv[2]

    console.log("crawling - url: " + urlBase)

    const pages = await crawl(urlBase, urlBase, {})

    for (const page of Object.entries(pages)) {
        console.log(page)
    }

}

main()
//use cmd -> node main.js <url>