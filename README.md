# node-review
node-review
## Global variable
globalThis
It has many properties sucha as Console log
- global for node
- window for chrome
## Design patter modules
Separate code in block so we can re use it. 
## Create default values
npm init -y
## Standard
npm install standard  -D 
## Powershell env 
```bash
$env:PORT=1234; node 9.http.js
```
## Refresh automatically
```bash
node --watch file_name
```
another option is install nodemon
```bash
npm install nodemon -D
```
then, add in package.json the script
```json
  "scripts": {
    "dev": "nodemon 1-http.js"
  },
```
so you just run
```bash 
npm run dev
```
the
## Cheetlist http status code list 
https://http.cat/
## Intall express, which is a framework 
```bash
npm install express -E
```

