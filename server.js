const path = require("path");
const fs = require("fs").promises;
const http = require("http");
const mongodb = require("mongodb");

const

const REQUIRED_CONFIGURATION = [
    "username",
    "password",
    "address",
    "defaultDatabase",
    "port",
];

const setupServer = (config) => {
    const authentication = `${config.username}:${config.password}`;
    const address = `${config.address}/${config.defaultDatabase}`;
    const options = "retryWrites=true&w=majority";
    const mongoURL = `mongodb+srv://${authentication}@${address}?${options}`;

    const client = new mongodb.MongoClient(mongoURL, {
        useUnifiedTopology: true,
    });

    const connectionPromise = client.connect();
    return connectionPromise.then(() => {
        return {
            port: config.port,
            db: TaskCollection(client.db(config.defaultDatabase)),
        };
    });
};

const catchJSONConfigFileReadingErrors = (file, err) => {
    if (err instanceof SyntaxError) {
        console.log(
            "File contents could not be decoded as JSON, verify the JSON is proper using a JSON linter."
        );
    } else if (err.code === "ENOENT") {
        console.log(`${file} was not found`);
    } else if (err.code === "EISDIR") {
        console.log(`${file} is a directory but a file was expected`);
    } else {
        console.log(err);
    }
    process.exit(1);
};

const createServer = (initializedServerState) => {
    const server = http.createServer(handleRequest(initializedServerState.db));
    server.listen(initializedServerState.port);
    console.log(
        `PID: ${process.pid}, Running on: ${initializedServerState.port}`
    );
};

const main = () => {
    const mainDirectory = __dirname;

    const configurationFilePath = path.join(mainDirectory, "config.json");
    fs.readFile(configurationFilePath, "utf-8")
        .then((configRawContents) => {
            const config = JSON.parse(configRawContents);

            const missingKeys = [];
            for (const key of REQUIRED_CONFIGURATION) {
                if (!config[key]) {
                    missingKeys.push(key);
                }
            }

            if (missingKeys.length > 0) {
                console.log(
                    `Configuration is invalid. Missing the following keys: ${missingKeys}`
                );
                process.exit(1);
            }
            return setupServer(config);
        })
        .catch((err) => {
            catchJSONConfigFileReadingErrors(configurationFilePath, err);
        })
        .then(createServer);
};

main();