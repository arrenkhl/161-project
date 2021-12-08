const fs = require('fs/promises');
const sendResponse = require('./utils/send-response');

const serveFolder = (req, res) => {
    const url = "." + req.url;
    return fs.readFile(url)
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