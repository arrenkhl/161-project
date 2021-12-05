const http = require("http");
const sendResponse = require("./utils/send-response");

const handleRequests = (db) => {
    const routingTable = {

    };

    return (req, res) => {
        let handlersForURL = null;
        for (const [route, handlers] of Object.entries(routingTable)) {
            if (req.url.match(route)) {
                handlersForURL = handlers;
                break;
            }
        }

        if (!handlersForURL) {
            return sendResponse(res, 404, {
                error: `Could not find handler for url ${req.url}`,
            });
        }

        const handlerForRequestMethod = handlersForURL(req.method);
        if (!handlerForRequestMethod) {
            return sendResponse(res, 405, {
                error: `${req.method} requests are not allowed fr ${req.url}`,
            });
        }
        req.app = { db };
        return handlerForRequestMethod(req, res);
    };
};

module.exports = handleRequests;