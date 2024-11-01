const protocolo = 'http://'
const baseURL = 'localhost:3000'

function exibirFilmes(filmes) {
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for(let filme of filmes){
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}

async function obterFilmes() {
    const filmesEndPoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
    const filmes = (await axios.get(URLcompleta)).data
    exibirFilmes(filmes)
    // console.log(filmes)
}

async function cadastrarFilme() {
    const filmesEndPoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    tituloInput.value = ""
    sinopseInput.value = ""
    if(titulo && sinopse) {
        const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data
        exibirFilmes(filmes)
    }
    else { //se o usuário n escrever nada em titulo e sinopse
        let alert = document.querySelector('.alert')
        alert.classList.add('show')
        alert.classList.remove('d-none')
        // para ter um tempo para voltar tudo ao normal
        setTimeout(() => {
            alert.classList.remove('show')
            alert.classList.add('d-none')
        }, 2000)
    }
    
}

async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if(usuarioCadastro && passwordCadastro) {
        try {
            let cadastrarUsuarioEndPoint = '/signup'
            let URLcompleta = `${protocolo}${baseURL}${cadastrarUsuarioEndPoint}`
            await axios.post(URLcompleta, 
                            {login: usuarioCadastro, password: passwordCadastro})
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            let alert = document.querySelector('.alert-modal-cadastro')
            alert.innerHTML = "Usuário Cadastrado com sucesso!!! ^_____^"
            alert.classList.add('show', 'alert-success')
            alert.classList.remove('d-none')
            setTimeout(() => {
                alert.classList.remove('show', 'alert-success')
                alert.classList.add('d-none')
                // para sumir o modal inteiro de Novo usuário
                let modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                modalCadastro.hide()
            }, 2000)
        }
        catch(e) {
            //depois a gente faz
        }
    }
    else {
        let alert = document.querySelector('.alert-modal-cadastro')
        alert.innerHTML = "Preencha todos os campos!!! (* ￣︿￣)"
        alert.classList.add('show', 'alert-danger')
        alert.classList.remove('d-none')
        // para ter um tempo para voltar tudo ao normal
        setTimeout(() => {
            alert.classList.remove('show', 'alert-danger')
            alert.classList.add('d-none')
        }, 2000)
    }
}