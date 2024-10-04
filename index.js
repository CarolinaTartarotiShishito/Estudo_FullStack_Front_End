// console.log('Hello, NodeJS!! ^_^')

const express = require('express') //importando a biblioteca
const app = express() //construindo uma aplicação express
app.use(express.json())

app.listen(3000, console.log("server up & running aa"))