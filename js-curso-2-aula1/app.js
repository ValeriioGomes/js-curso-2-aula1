let listaNumerosSorteados = []; //lista vazia
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let contador = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 3.0; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random( ) * numeroMaximo) + 1;
    let qtdNumerosSorteados = listaNumerosSorteados.length;
    if(qtdNumerosSorteados == numeroMaximo) {
        listaNumerosSorteados = [];
    }
    if(listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido; 
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function mensagemInicial() {
    exibirTextoNaTela ('h1', 'Jogo do encontre o numero secreto')
    exibirTextoNaTela ('p', 'Tente adivinhar o número secreto que está entre 1 e 10')
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    contador = 1;
    limparCampo();
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

mensagemInicial();
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns, você acertou!')
        let palavraTentativas = contador > 1 ? ' tentativas' : ' tentativa';
        let mensagemTentativas = "Você Acertou com " + contador + palavraTentativas;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{ 
        if(chute > numeroSecreto) {
            exibirTextoNaTela('h1', 'O número secreto é menor')
        }else {
            exibirTextoNaTela('h1', 'O número secreto é maior')
        }
        contador++;
        limparCampo();
    }  
}
