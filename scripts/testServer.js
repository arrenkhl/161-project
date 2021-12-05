const path = require("path");
const fs = require("fs").promises;
const fetch = require("node-fetch");
const commander = require("commander");

const handleResponse = (response) => {
    const isSuccess = response.status >= 200 && response.status < 300;
    const isClientError = response.status >= 400 && response.status < 500;
    return isSuccess || isClientError
        ? response.json()
        : Promise.reject(response.status);
};