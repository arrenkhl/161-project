const fs = require('fs/promises');
const sendResponse = require('./utils/send-response');

const serveRules = (req, res) => {
    const url = './public/rules.html';
    res.headers = { 'Content-Type': 'text/html' };
    return fs.readFile(url)
        .then((result) => {
            sendResponse(res, 200, result);
        })
        .catch((err) => {
            sendResponse(res, 500, err.code);
        });
};

module.exports = serveRules;