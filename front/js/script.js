const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndPoint = '/filmes'

async function obterFilmes() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
    const filmes = (await axios.get(URLcompleta)).data
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    
    for (let filme of filmes){ //vai inserindo linha no início da tabela, empilhando
	    let linha = corpoTabela.insertRow(0) 
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
    
    console.log(filmes)
}

function cadastrarFilme() {
    console.log('vamos cadastrar')
}