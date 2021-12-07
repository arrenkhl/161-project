const sendResponse = require("./utils/send-response");

const getAllUsers = (req, res) => {
    res.headers = { 'Content-Type': 'application/json' };
    return req.app.db.getAllUsers().then((users) => {
        sendResponse(res, 200, { users });
    });
};

module.exports = getAllUsers;