const puppeteer = require('puppeteer');
let fs = require('fs');

let scrape = async () => {
    const browser = await puppeteer.launch({
        headless: true //show browser
    });
    const page = await browser.newPage();
    await page.goto('http://quotes.toscrape.com/', {domcontentloaded: true});

    // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');

    const result = await page.evaluate(() => {
        let quotes = [];
        let elements = document.querySelectorAll('div.quote');

        elements.forEach(el => {
            let quote = el.childNodes[1].innerText;
            let author = el.childNodes[3].innerText;
            quotes.push({quote, author});
        })
        
        return quotes;
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
    fs.writeFile('result.json', JSON.stringify(value,null,4), 'utf8', function(err){
        if (err) {
           return console.log(err)
        }
    });
});

async function getPic() {
    const browser = await puppeteer.launch(); // {headless: false} for non-headless manner
    const page = await browser.newPage();
    await page.goto('https://abv.bg');
    // await page.setViewport({width: 1000, height: 500}); center the page
    await page.screenshot({
        path: 'abvbg.png'
    });

    await browser.close();
}