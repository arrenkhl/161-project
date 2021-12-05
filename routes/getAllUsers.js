const sendResponse = require("./utils/send-response");

const getAllUsers = (req, res) => {
    return req.app.db.getAllUsers().then((users) => {
        sendResponse(res, 200, { users });
    });
};

module.exports = getAllUsers;