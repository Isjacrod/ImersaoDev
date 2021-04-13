var tentativas, minimo, maximo, chute, novaRodada;
function initValues(){
  tentativas = 6;
  minimo = 1
  maximo = 100
  chute = maximo / 2
  novaRodada = true;
  toggleLAndG("hide");
} 

function iniciar() {
  if (novaRodada == true) {
    initValues();
    instrucoes();
  } else if (novaRodada == false) {
    vitoria();
  }
}

function instrucoes() {
  textoMentalista(`Pense em um número de ${minimo} a ${maximo}`);
  alert(`Vou tentar adivinhar o número que VOCÊ está pensando em até ${tentativas} tentativas\nSeja honesto, pense em um número de ${minimo} a ${maximo} \nE se o mentalista acertou, então ele acertou`);

  //confirmação de jogo
  resposta = confirm(minimo + " a " + maximo + "... 1 número...\nPensou?");
  if (resposta == true) {
    changeMiddleBtn("Acertou");
    toggleLAndG("show");
    novaRodada = false;
    adivinha();
  } else {
    alert("Então tchau");
    gameOver("(╥﹏╥)");
  }  
}

function adivinha() {
  textoMentalista("O número que você pensou foi ") 
  textoNumero(chute);
  
  if (tentativas < 0) {
    endLine();
  } else {
    textoComentario(`O mentalista tem só: <span class="big-number"> ${tentativas} </span> tentativas`);
  }
}

//Para quando o numero for menor
function menor() {
  maximo = chute - 1
  chute = maximo - parseInt( (maximo - minimo) / 2)
  tentativas--
  adivinha()
}

//para quando o número é maior
function maior() {
  minimo = chute + 1
  chute = minimo + parseInt( (maximo - minimo) / 2)
  tentativas--
  adivinha();
}

//Mudança dos textos
function textoMentalista(txt) {
  var paragrafo = document.querySelector(".page-subtitle");
  paragrafo.textContent = txt;
}

function textoComentario(txt) {
  var areaDeComentario = document.getElementById("comentario");
  areaDeComentario.innerHTML = txt;
}

function textoNumero(txt) {
  var areaDoNumero = document.getElementById("local-do-numero");
  areaDoNumero.textContent = txt;
}

//Mudança dos Botões
function changeMiddleBtn(txt) {
  var btnIniciar = document.getElementById("start");
  btnIniciar.textContent = txt;
}

//esconde ou mostra os botões de menor e maior
function toggleLAndG(acao) {
  var buttons = document.querySelectorAll("button[name=menor], button[name=maior]");
  if (acao == "hide") {
    buttons[0].style.visibility = 'hidden';
    buttons[1].style.visibility = 'hidden';
  } else {
    buttons[0].style.visibility = 'visible';
    buttons[1].style.visibility = 'visible';
  }
}

function vitoria() {
  alert("Parabens! Eu ganhei");
  gameOver("(─‿‿─)");
}

function gameOver(kao) {
  scenarioRestart();
  textoMentalista("Fim do jogo");
  textoComentario("Assista Doctor Stone");
  textoNumero(kao);
}

function endLine() {
  scenarioRestart();
  textoMentalista("Parece que você se equivocou ");
  textoNumero("(︶︹︺)");
  textoComentario("Você não esta se concentrando direito");
}


function scenarioRestart() {
  changeMiddleBtn("Reiniciar");
  toggleLAndG("hide");
  novaRodada = true;
}

initValues();
