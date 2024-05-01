require('dotenv').config();
const api = require("./api");
const { JSDOM } = require('jsdom');
const notifier = require('node-notifier');
const mail = require("./mail");
const keywords = ['node.js', 'nodejs', 'node js', 'node', 'express', 'nestjs', 'backend', 'motion'];

async function main() {
    while (true) {
        try {
            const { data: html } = await api();
            if (typeof html !== 'string' && !html) throw new Error('Empty response from olio');
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
                    mail({ to: process.env.EMAIL_FOR_ALERT, subject: 'Ollyo is hiring', text: `Found keyword match on ollyo job title ${title}` });
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