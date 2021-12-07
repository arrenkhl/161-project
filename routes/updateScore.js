const readBody = require("./utils/read-body");
const sendResponse = require("./utils/send-response");

const updateScore = (req, res) => {
    res.headers = { 'Content-Type': 'application/json' };
    return readBody(req).then((body) => {
        const options = JSON.parse(body);
        if (!options.id) {
            return sendResponse(res, 400, {
                error: "id is a required field",
            });
        }
        return req.app.db.updateScore(options.id).then((user) => {
            sendResponse(res, 200, { user });
            return { user };
        });
    });
};

module.exports = updateScore;