const fs = require("fs")

const env = fs.readFileSync("./.env").toString()
const arr = env.split("\r\n")
const hostLine = arr.filter(line => line.includes("HOST="))
const url = hostLine[0].split("=")[1]

fs.writeFileSync("./.env.local", `NEXT_PUBLIC_APP_URL2=https://dek-shopify.loca.lt
NEXT_PUBLIC_APP_URL=${url}`)