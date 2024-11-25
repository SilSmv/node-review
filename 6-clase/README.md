## Logger

```bash
npm install morgan -E
```
## Implement web socat

```bash
npm install socket.io -E
```

## Database turso 

You have to run this command in wsl if your are with linux in order to recreate database

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

Then authenticate 
```bash
turso auth login --headless
```

Copy token in the terminal

```bash
turso db create
```

Install dependencies 
```bash
npm install @libsql/client dotenv
```