/**
 * How to test (example):
 * 1) npm run start
 * 2) curl -i -X POST http://localhost:8080/user -d '{"username": "arren", "highscore": 999}'
 */

const http = require("http");
const sendResponse = require("./utils/send-response");

const createUser = require("./createUser.js");
const getUser = require("./getUser.js");
const getAllUsers = require("./getAllUsers.js");
const updateScore = require("./updateScore");

const handleRequests = (db) => {
    const routingTable = {
        "/users": {
            GET: getAllUsers,
        },
        "/user": {
            POST: createUser,
            GET: getUser,
        },
        "/user/score": {
            POST: updateScore,
        },
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

        const handlerForRequestMethod = handlersForURL[req.method];
        if (!handlerForRequestMethod) {
            return sendResponse(res, 405, {
                error: `${req.method} requests are not allowed for ${req.url}`,
            });
        }
        req.app = { db };
        return handlerForRequestMethod(req, res);
    };
};

module.exports = handleRequests;