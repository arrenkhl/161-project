const mongodb = require("mongodb");
const { userInfo } = require("os");
const { cursorTo } = require("readline");
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

    const getAllUsers = () => {
        return collection
            .find()
            .toArray()
            .then((cursor) => {
                console.log(`getAllUsers::returning ${cursor.length} items`);
                return { users: cursor };
            });
    };

    const createUser = (username, highscore) => {
        const user = User(username, highscore);
        return collection.insertOne(user).then(() => {
            return user;
        });
    };

    const updateScore = (id, score) => {
        const filter = { _id: new mongodb.ObjectId(id) };
        return collection
            .updateOne(filter, {
                $set: {
                    highscore: score,
                },
            })
            .then(() => {
                return collection.findOne(filter);
            });
    };

    return {
        getUser,
        getAllUsers,
        createUser,
        updateScore,
    };
};

module.exports = UserCollection;