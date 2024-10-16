// console.log('Hello, NodeJS!! ^_^')
//mongodb+srv://carolinashishito:redpepper.14@cluster0.6xmnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express') //importando a biblioteca
const cors = require('cors')

const app = express() //construindo uma aplicação express
app.use(express.json())
app.use(cors())

let filmes = [
    {
        titulo: "Soul",
        sinopse: "Joe é um professor de música do ensino médio apaixonado por jazz, cuja vida não foi como ele esperava. Quando ele viaja a uma outra realidade para ajudar outra pessoa a encontrar sua paixão, ele descobre o verdadeiro sentido da vida."
    },
    {
        titulo: "O Menino e a Garça",
        sinopse: "Mahito, um menino de 12 anos, luta para se estabelecer em uma nova cidade após a morte de sua mãe. Quando uma garça falante conta para Mahito que sua mãe ainda está viva, ele entra em uma torre abandonada em busca dela, o que o leva para outro mundo."
    }
]

// get url: http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi :)')
})

app.get('/filmes', (req, res) => {
    res.json(filmes)
})

app.post('/filmes', (req, res) => {
    //obter os dados que o cliente enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o json filme
    const filme = {titulo: titulo, sinopse: sinopse}
    //inserir o filme na lista de filmes
    filmes.push(filme)
    res.json(filmes)
})

app.listen(3000, console.log("server up & running aa"))