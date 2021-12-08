const mongodb = require("mongodb");
const { userInfo } = require("os");
const { cursorTo } = require("readline");
const User = require("../models/User");

const UserCollection = (db) => {
    const collection = db.collection("users");

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

    return {
        getAllUsers,
        createUser,
    };
};

module.exports = UserCollection;