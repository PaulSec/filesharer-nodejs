filesharer-nodejs
=================

File sharer based on Node.js using AES encryption for your files 

This is currently under development. 

Installation
======

Create a SSL certificate, quick example:

```
openssl genrsa -des3 -out ca.key 4096
openssl req -new -key ca.key -out ca.csr
openssl x509 -req -days 365 -in ca.csr -out ca.crt -signkey ca.key
```

Install mongodb and launch it: 

```
sudo mongod --dbpath .
```

Install node and npm, then: 

```
npm install
```

Then, 

```
node server.js
```