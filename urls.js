const fs = require('fs').promises;
const axios = require('axios');
const { URL } = require('url');
const process = require('process');

// function to get HTML from URL and save it to a file
async function getHTMLAndSave(url) {
    try {
        const response = await axios.get(url);
        const hostname = new URL(url).hostname; // get hostname from the URL

        await fs.writeFile(`${hostname}`, response.data, 'utf8'); // write HTML to file
        console.log(`Wrote to ${hostname}`);
    } catch (err) {
        console.error(`Couldn't download ${url}`);

    }
}

// function to read URLS from file and process them
async function readFileAndProcess(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        const urls = data.split('\n').filter(Boolean); // split and remove empty lines

        // fetch and save URLs
        await Promise.all(urls.map(url => getHTMLAndSave(url)));
    } catch (err) {
        console.error(`Error reading ${filename}: ${err.message}`);
        process.exit(1); // exit if file reading fails
    }
}

const filename = process.argv[2];
if (!filename) {
    console.error('Please provide a filename');
    process.exit(1); // exit if no filename is provided
}

readFileAndProcess(filename); // start process