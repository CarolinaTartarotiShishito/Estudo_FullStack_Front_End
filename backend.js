// console.log('Hello, NodeJS!! ^_^')
//mongodb+srv://carolinashishito:redpepper.14@cluster0.6xmnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express') //importando a biblioteca
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express() //construindo uma aplicação express
app.use(express.json())
app.use(cors())

//instanciando um esquema do banco, criando uma classe -> obs: toda classe começa com letra maiuscula
const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

//programando para o login
const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

//conectando ao banco de dados, e como é algo q vai demorar, usamos async
async function conectarAoMongo(){
    await mongoose.connect(`mongodb+srv://carolinashishito:redpepper.14@cluster0.6xmnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

// let filmes = [
//     {
//         titulo: "Soul",
//         sinopse: "Joe é um professor de música do ensino médio apaixonado por jazz, cuja vida não foi como ele esperava. Quando ele viaja a uma outra realidade para ajudar outra pessoa a encontrar sua paixão, ele descobre o verdadeiro sentido da vida."
//     },
//     {
//         titulo: "O Menino e a Garça",
//         sinopse: "Mahito, um menino de 12 anos, luta para se estabelecer em uma nova cidade após a morte de sua mãe. Quando uma garça falante conta para Mahito que sua mãe ainda está viva, ele entra em uma torre abandonada em busca dela, o que o leva para outro mundo."
//     }
// ]

// get url: http://localhost:3000/oi
// app.get('/oi', (req, res) => {
//     res.send('oi :)')
// })

app.get('/filmes', async(req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post('/filmes', async(req, res) => {
    //obter os dados que o cliente enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //construir um objeto filme de acordo com a classe Filme definida 
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    //salva o filme criado
    await filme.save()
    //busca pela lista de filmes atualizada
    const filmes = await Filme.find()

    // //montar o json filme
    // const filme = {titulo: titulo, sinopse: sinopse}
    // //inserir o filme na lista de filmes
    // filmes.push(filme)
    res.json(filmes)
})

//post para login
app.post('/signup', async(req, res) => {
    try{
        const login = req.body.login
        const password = req.body.password

        const password_criptografada = await bcrypt.hash(password, 10)

        const usuario = new Usuario ({login: login, password: password_criptografada})
        const respMongo = await usuario.save()
        console.log(respMongo)
        //para dar o status de q deu certo
        res.status(201).end()
    }
    catch(e) {
        console.log(e)
        res.status(409).end()
    }
    
})

app.post('/login', async(req, res) => {
    const login = req.body.login
    const password = req.body.password

    const usuarioExiste = await Usuario.findOne({login: login})
    if(!usuarioExiste) {
        return res.status(401).json({mensagem: "Login inválido ＞︿＜"})
    }
    const senhaValida = await bcrypt.compare(password, usuarioExiste.password)

    if(!senhaValida) {
        return res.status(401).json({mensagem: "Senha inválida ＞︿＜"})
    }
    
    const token = jwt.sign(
        {login: login},
        "id-secreto",
        {expiresIn: "1h"}
    )
    res.status(200).json({token: token})
})

//listen escuta uma porta (3000 neste caso) e faz uma ação com ela
app.listen(3000, () => {
    try{
    conectarAoMongo()
    console.log("server up & running and conexão okay")
    }
    catch(e){
        console.log('Erro de conexão ＞︿＜: ', e)
    }
})