const readBody = require("./utils/read-body");
const sendResponse = require("./utils/send-response");

const createUser = (req, res) => {
    return readBody(req).then((body) => {
        const options = JSON.parse(body);
        if (!options.username) {
            return sendResponse(res, 400, {
                error: "username is a required field",
            });
        }
        return req.app.db.createUser(options.username, options.highscore).then((user) => {
            sendResponse(res, 201, { user });
        });
    });
};

module.exports = createUser;