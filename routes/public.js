const fs = require('fs/promises');
const path = require('path');
const sendResponse = require('./utils/send-response');

const serveFolder = (req, res) => {
    const urlArr = req.url.split('/');
    const file = path.join(...urlArr.slice(urlArr.indexOf('public')));
    if (req.url.includes('css')) {
        res.headers = { 'Content-Type': 'text/css' };
    }
    if (req.url.includes('js')) {
        res.headers = { 'Content-Type': 'application/javascript' };
    }
    return fs.readFile(file)
        .then((result) => {
            sendResponse(res, 200, result);
        })
        .catch((err) => {
            if (err.code === 'ENOENT') {
                sendResponse(res, 404, err.code);
            } else {
                sendResponse(res, 500, err.code);
            }
        });
};

module.exports = serveFolder;