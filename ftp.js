const FtpSrv = require("ftp-srv");

const user = "user";
const pw = "pw";

const host = process.argv[2] || "localhost";
const port = process.argv[3] || 21;

const ftpServer = new FtpSrv({
    url: `ftp://${host}:${port}`,
    anonymous: true
});

ftpServer.on("login", ({ connection, username, password }, resolve, reject) => {

    connection.on("RETR", (error, filePath) => {
        if (error) {
            console.log(`File download error: ${error}`);
        } else {
            console.log(`File downloaded: ${filePath}`);
        }
    });

    connection.on("STOR", (error, filePath) => {
        if (error) {
            console.log(`File upload error: ${error}`);
        } else {
            console.log(`File uploaded: ${filePath}`);
        }
    });
    if (username === user && password === pw) {
        return resolve({ root: "./files" });
    }
    console.log("Invalid username or password");
    return reject(new errors.GeneralError("Invalid username or password", 401));
});

ftpServer.on("client-error", ({ connection, context, error }) => {
    console.log(`Client error at ${context}: ${error}`);
});

ftpServer.listen().then(() => {
    console.log(`Ftp server started at ftp://${host}:${port}...`);
    console.log(`Test file url: ftp://${user}:${pw}@${host}:${port}/[filename]`);
});