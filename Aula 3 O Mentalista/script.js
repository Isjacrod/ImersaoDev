//setando variaveis 
  var tentativas = 6;
  var minimo = 1
  var maximo = 100
  var chute = maximo / 2
  var primeiraVez = true;
  
  //obtendo os elementos da página
  paragrafo = document.querySelector(".page-subtitle")
  btIniciar = document.getElementById("start")
  areaDoNumero = document.getElementById("local-do-numero")
  areaDeComentario = document.getElementById("comentario")


function iniciar() {
  if (primeiraVez == true) {
    paragrafo.innerHTML = "Pense em um número de " + minimo + " a " + maximo;

     //apresentação
    alert("Vou tentar adivinhar o número que VOCÊ está pensando em até "+ tentativas +" tentativas\nSeja honesto, pense em um número de " + minimo + " a " + maximo + "\nE se o mentalista acertou, então ele acertou")

    //confirmação de jogo
    resposta = confirm(minimo + " a " + maximo + "... 1 número...\nPensou?")
    if (resposta == true) {
      btIniciar.innerHTML = "Acertou"
      primeiraVez = false
      mudaTexto()
    } else {
      alert("Então tchau")
    }
    
  } else if (primeiraVez == false) {
    vitoria()
  }
}

//Mudança dos textos
function mudaTexto() {
  paragrafo.innerHTML = "O número que você pensou foi " 
  areaDoNumero.innerHTML = chute;
  
  if (tentativas < 0) {
    areaDeComentario.innerHTML = "Parece que você se equivocou. Você não está se concentrando direito"
  } else {
    areaDeComentario.innerHTML = "O mentalista tem só: <span class=\"big-number\">" + tentativas + " </span> tentativas";
  }
}

//Para quando o numero for menor
function menor() {
  maximo = chute - 1
  chute = maximo - parseInt( (maximo - minimo) / 2)
  tentativas--
  mudaTexto()
}

//para quando o número é maior
function maior() {
  minimo = chute + 1
  chute = minimo + parseInt( (maximo - minimo) / 2)
  tentativas--
  mudaTexto();
}

function vitoria() {
  alert("Parabens! Eu ganhei")
  paragrafo.innerHTML = "Fim do jogo"
  areaDeComentario.innerHTML = "Assista Doctor Stone!"
  areaDoNumero.innerHTML = "(T_T)"
}