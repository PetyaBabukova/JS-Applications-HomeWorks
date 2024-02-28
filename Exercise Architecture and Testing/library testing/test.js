const { chromium, request } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://127.0.0.1:5500/';

const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
}

describe('Tests', async function () {
    this.timeout(6000);

    let browser, page;

    before(async () => {
        browser = await chromium.launch();
        // browser = await chromium.launch({ headless: false, slowMo: 1000 }); //The test fale with slowMo
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage()
    });

    afterEach(async () => {
        await page.close()
    });

    it('loads all books', async () => {

        await page.route('**/jsonstore/collections/books', (route, request) => {
            route.fulfill({
                body: JSON.stringify(mockData),
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })

        });

        // Navigate to page
        await page.goto(host);
        await page.screenshot({ path: 'page.png' });

        // Find and click Load button
        await page.click('text=load all books');

        // Check if the books are displayed
        await page.waitForSelector('text=Harry Potter');

        const rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));

        expect(rowData[0]).to.contains('Harry Potter');
        expect(rowData[0]).to.contains('Rowling');
        expect(rowData[1]).to.contains('C# Fundamentals');
        expect(rowData[1]).to.contains('Nakov');
    });

    it('Create book', async () => {
        // Navigate to the page
        await page.goto(host);

        // Find form

        // Fill in the input fields
        await page.fill('input[name=title]', 'Title');
        await page.fill('input[name=author]', 'Author');

        // Click on Submit
        const[request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Submit'),
        ]);

        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    })
});