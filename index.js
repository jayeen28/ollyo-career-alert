const api = require("./api");
const { JSDOM } = require('jsdom');
const notifier = require('node-notifier');
const keywords = ['node.js', 'nodejs', 'node js', 'node', 'express', 'nestjs', 'backend'];

async function main() {
    while (true) {
        try {
            const res = await api();
            const html = await res.text();
            console.log('Data received from ollyo');
            const dom = new JSDOM(html);
            const document = dom.window.document;
            const jobTitles = [];

            // get job titles
            const openings = document.getElementsByClassName('openings')?.[0];
            for (let e of openings.children) {
                const titles = e.getElementsByClassName('opening-title') || [];
                for (let title of titles) {
                    jobTitles.push((title.textContent || '').trim().toLowerCase());
                }
            }

            // check keyword exists
            for (let title of jobTitles) {
                if (keywords.some(k => title.includes(k))) {
                    notifier.notify({
                        title: 'Ollyo is hiring',
                        message: `Found keyword match on ollyo job title ${title}`
                    });
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        // sleep
        await new Promise((r) => setTimeout(r, 3 * 60 * 1000));
    }
}
main();