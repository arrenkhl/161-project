/**
 * How to test (example):
 * 1) npm run start
 * 2) curl -i -X POST http://localhost:8080/user -d '{"username": "arren", "highscore": 999}'
 */

const http = require("http");
const sendResponse = require("./utils/send-response");

const createUser = require("./createUser");
const getAllUsers = require("./getAllUsers");
const serveIndex = require("./home");
const serveLeaderboard = require("./leaderboard");
const serveRules = require("./rules");
const serveFolder = require("./public");
const { homedir } = require("os");

const handleRequests = (db) => {
    const routingTable = {
        "/users": {
            GET: getAllUsers,
        },
        "/user": {
            POST: createUser,
        },
        "/play": {
            GET: serveIndex,
        },
        "/leaderboard": {
            GET: serveLeaderboard,
        },
        "/rules": {
            GET: serveRules,
        },
        "/public": {
            GET: serveFolder,
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