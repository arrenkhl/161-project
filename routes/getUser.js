const url = require("url");
const sendResponse = require("./utils/send-response");

const getUser = (req, res) => {
    const query = url.parse(req.url, true).query;
    console.log(url.parse("http://localhost:8080/user?id=61ac55a09074dc732117b024", true).query);
    if (!query.id) {
        return sendResponse(res, 400, {
            error: "id is required as a search parameter",
        });
    }

    return req.app.db
        .getUser(query.id)
        .then((user) => {
            sendResponse(res, 200, user);
        })
        .catch((err) => {
            if (err.code === "INVALID_ID") {
                return sendResponse(res, 400, {
                    error: `Invalid id ${query.id} was found`,
                });
            } else if (err.code === "NOT_FOUND") {
                return sendResponse(res, 400, {
                    error: `No user with id ${query.id} was found`,
                });
            } else {
                return sendResponse(res, 500);
            }
        });
};

module.exports = getUser;