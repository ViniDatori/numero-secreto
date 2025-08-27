// Definição de variáveis básicas e da lista de números já gerados:

let intervaloMax = 10;
let numerosJaGerados = [];
let numeroSecreto = gerarNumSecreto();
console.log("O número secreto é: " + numeroSecreto);
let tentativas = 0;
inicioDeJogo();

// Função que gera o número secreto aleatoriamente:

function gerarNumSecreto() {
    let numeroEscolhido = parseInt(Math.random() * intervaloMax + 1);
    
    // Condicional que garante que, caso a lista de números já gerados chegue ao intervalo máximo de possíveis números gerados, a lista seja esvaziada.

    if(numerosJaGerados.length == intervaloMax) {
        numerosJaGerados = [];
    }

    // Condicional que garante que o número secreto não seja repetido.

    if(numerosJaGerados.includes(numeroEscolhido)) {
        return gerarNumSecreto();
    } else {
        numerosJaGerados.push(numeroEscolhido);
        console.log(numerosJaGerados);
        return numeroEscolhido;
    }
}

// Função que manipula as tags de texto do jogo e gera voz:

function exibirMensagens(tag, texto) {
    let mensagens = document.querySelector(tag);
    mensagens.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female")
}

// Função que exibe as mensagens inicias do jogo:

function inicioDeJogo() {
    exibirMensagens("h1", "Jogo do Número Secreto");
    exibirMensagens("p", `Digite um número de 0 a ${intervaloMax}.`);
}

// Função que limpa o campo input trocando o número do usuário por uma string vazia:

function limparCampoChute() {
    let campoChute = document.querySelector("input");
    campoChute.value = "";
}

// Função que verifica se o chute do usuário está correto e fornece dicas ao clicar no botão "Chutar":

function chutarNum() {
    tentativas++;
    console.log("Tentativa Nº:" + tentativas);
    let chute = document.querySelector("input").value;
    console.log("O usuário chutou o número: " + chute);

    if(chute == numeroSecreto) {
        exibirMensagens("h1", "Parabéns!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let vitoria = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirMensagens("p", vitoria);
        document.getElementById("nj").removeAttribute("disabled");
        document.getElementById("botaoChutar").setAttribute("disabled", true);
    } else {
        if (chute > numeroSecreto) {
            exibirMensagens("p", "O número secreto é menor!");
            limparCampoChute();
        } else {
            exibirMensagens("p", "O número secreto é maior!");
            limparCampoChute();
        }
    }

}

// Função que reinicia o jogo ao clicar no botão "Novo Jogo":

function reiniciarJogo() {
    inicioDeJogo();
    limparCampoChute();
    numeroSecreto = gerarNumSecreto();
    console.log("O número secreto é: " + numeroSecreto);
    tentativas = 0;
    document.getElementById("nj").setAttribute("disabled", true);
    document.getElementById("botaoChutar").removeAttribute("disabled");
}