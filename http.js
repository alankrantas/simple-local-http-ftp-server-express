const express = require("express")
const app = express();
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const xmlparser = require("express-xml-bodyparser");
app.use(xmlparser());

const multer = require("multer");
const upload = multer();

app.get("/get", async function (req, res) {
    console.log("Invoking /get...");
    req.setEncoding("utf8");
    if (req.get("Authorization")) console.log(`- authorization: ${req.get("Authorization")}`);
    console.log(req.query);
    res.setHeader("Content-Type", "application/json");
    res.send(req.query);
});

app.post("/post", async function (req, res) {
    console.log("Invoking /post...");
    req.setEncoding("utf8");
    console.log(`- Content type: ${req.get("content-type")}`);
    if (req.get("Authorization")) console.log(`- authorization: ${req.get("Authorization")}`);
    console.log(req.body);
    res.setHeader("Content-Type", req.get("content-type"));
    res.send(req.body);
});

app.post("/file", upload.any(), async function (req, res) {
    console.log("Invoking /file...");
    req.setEncoding("utf8");
    if (req.get("Authorization")) console.log(`- authorization: ${req.get("Authorization")}`);
    let contentType = req.get("content-type");
    console.log(`- content type: ${contentType}`);
    let data = null;
    if (req.files.length > 0) {
        try {
            const file = req.files[0];
            console.log(`- field name: ${file.fieldname}`);
            console.log(`- file name: ${file.originalname}`);
            console.log(`- MIME type: ${file.mimetype}`);
            data = new TextDecoder().decode(file.buffer);
            contentType = file.mimetype;
        } catch (err) {
            data = err.toString();
        }
    } else if ("body" in req) {
        console.log(req.body);
        for (let field in req.body) {
            console.log(`- field name: ${field}`);
            console.log(`- content type: ${contentType}`);
            data = req.body[field];
            break
        }
    }
    console.log(data);
    res.setHeader("Content-Type", "text/plain");
    res.send(data);
});

const host = process.argv[2] || "localhost";
const port = process.argv[3] || 8080;
app.listen(
    port,
    host,
    () => {
        console.log("HTTP test server started...");
        console.log(`  http://${host}:${port}/get  | GET with QueryString`);
        console.log(`  http://${host}:${port}/post | POST with text/JSON/XML`);
        console.log(`  http://${host}:${port}/file | POST with multipart/file`);
    }
);
