# Local HTTP/FTP Test Server with Node.js/Express

A simple local HTTP/FTP test server that can be run on Node.js.

The HTTP services (GET, POST, POST with file) return whatever you send them and print them in the console. The FTP service allows you to access any files under the ```./files``` directory.

## Install

Install Node.js and download/unzip this project:

```bash
npm install
```

## Run Server

Run the http server:

```bash
node http.js
node http.js 127.0.0.1 3000
```

Run the FTP server:

```bash
node ftp.js
node ftp.js 127.0.0.1 21
```

Or start both with default settings:

```bash
npm start
```

## Invoke the Services

### HTTP GET with QueryString

```
http://localhost:3000/get
http://localhost:3000/get?params1=value1&params2=value2
```

The service would return the QueryString object in ```application/json```.

### HTTP POST with Text/JSON/XML

```
http://localhost:3000/post
```

The service would return the payload text or object in the same content type.

### HTTP POST with Multipart (File)

The requester has to use POST and set the ```Content-Type``` header to ```multipart/form-data```. The payload can be either a file or a text with any field name. Be noted that *only* the first text or file field will be read.

```
http://localhost:3000/file
```

The service would return the content of the text or file in text/plain.

### FTP

The default user is ```user``` and password is ```pw```. You can read or write a file with a URL like this:

```
ftp://user:pw@localhost:21/test.txt
```

You can test this with ```curl``` (Windows users can install Git and use Git Bash console for this):

```bash
curl 'ftp://user:pw@localhost:21/test.txt' > './test.txt'
```

You can put whatever files under ```./files``` and they will show up in the FTP server.