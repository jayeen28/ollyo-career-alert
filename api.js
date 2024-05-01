const axios = require('axios');
// const SocksProxyAgent = require("socks-proxy-agent")

module.exports = function () {
    return axios.get("https://ollyo.com/careers/", {
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        referrer: "https://ollyo.com/",
        referrerPolicy: "no-referrer-when-downgrade",
        // No need to specify body, method, mode, credentials in Axios, as GET request doesn't have a body
        // method: "GET",
        // mode: "cors",
        // credentials: "include"
    });
};
