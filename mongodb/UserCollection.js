const mongodb = require("mongodb");
const { userInfo } = require("os");
const User = require("../models/User");

const UserCollection = (db) => {
    const collection = db.collection("users");

    const getUser = (id) => {
        let filter;

        try {
            filter = { _id: new mongodb.ObjectId(id) };
        } catch (err) {
            return Promise.reject({ code: "INVALID_ID" });
        }

        return collection.findOne(filter).then((user) => {
            if (!user) {
                return Promise.reject({ code: "NOT_FOUND" });
            }
            return { user };
        });
    };

    return {

    };
};

module.exports = UserCollection;