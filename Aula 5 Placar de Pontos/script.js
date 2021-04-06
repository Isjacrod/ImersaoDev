//Variaveis
corpoDaTabela = document.getElementById("tabelaJogadores");
arrayJogadores=[];

//Colocando os jogadores antigos no array
adicionarJogador("Paulo", "https://s3.us-east-1.amazonaws.com/jarvis-caelum/paulo-silveira.png");
adicionarJogador("Rafa", "https://i.imgur.com/ucIdiqM.jpg");
adicionarJogador("Guilherme", "https://www.gravatar.com/avatar/54cde6974265dbf85d89dc84c6799c0c.png");

//função que retorna um jogador
//os parâmetros são: nome, avatar, vitorias, empates, derrotas e pontos
function criaJogador(n, a, v, e, d, p) { 
  var novoJogador = {
    nome : n,
    avatar : (a === undefined)? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : a,
    vitorias : (v === undefined)? 0 : v,
    empates :  (e === undefined)? 0 : e,
    derrotas : (d === undefined)? 0 : d,
    pontos : (p === undefined)? 0 : p,
  }
  //retorna o jogador criado
  return novoJogador;
}

//Cria um jogador, adiciona-o ao array de jogadores e exibe a tabela
//Usado no botão "adicionar jogador" e para adicionar manualmente com um nome e endereço de imagaem para o avatar
function adicionarJogador(n, a) {
    arrayJogadores.push(criaJogador(n, a));
    //para que cada avatar tenha um botão com um indice associado
    transformaAvatar(arrayJogadores.length-1)
    exibe();
}

//obtem o texto do input e cria o jogador
function enviarNome() {
  textoInput = document.getElementById("nome-jogador");
  if (textoInput.value !== "") {
   adicionarJogador(textoInput.value);
   textoInput.value = "";
  }
}

//Atualiza as informações na tela
function exibe() {
  var tabelaNova = "";
  //percorre cada jogador salvo no array e imprime suas propriedades na tabela
  for (var i=0; i < arrayJogadores.length; i++) {
    //Cria a linha da tabela que vai conter os pontos desse jogador
    tabelaNova += "<tr>"
    
    //Salva o objeto jogador para uso
    var jogadorDaVez = arrayJogadores[i];
    //percorre todas as propriedades do jogador da Vez coloca em uma coluna
    for (j in jogadorDaVez) {
      tabelaNova += "<td>" + jogadorDaVez[j] + "</td>"
    }
    
    //adiciona os botões e termina a linha desse jogador
    tabelaNova += "<td><button onClick='adicionarVitoria("+ i +")'>Vitória</button></td><td><button onClick='adicionarEmpate("+ i +")'>Empate</button></td><td><button onClick='adicionarDerrota("+ i +")'>Derrota</button></td> </tr>"
  }
  
  //Escreve na página as novas linhas criadas
  corpoDaTabela.innerHTML = tabelaNova;
}

//Funções para pontuação
function adicionarVitoria(indiceDoJogador) {
  arrayJogadores[indiceDoJogador].vitorias++;
  calculaPontos(indiceDoJogador);
  exibe();
}

function adicionarEmpate(indiceDoJogador) {
  arrayJogadores[indiceDoJogador].empates++;
  calculaPontos(indiceDoJogador);
  exibe();
}

function adicionarDerrota(indiceDoJogador) {
  arrayJogadores[indiceDoJogador].derrotas++;
  calculaPontos(indiceDoJogador);
  exibe();
}

function calculaPontos(indiceDoJogador) {
  var jogadorDaVez = arrayJogadores[indiceDoJogador]
  var pontos;
  //calcula primeiro a vitoria e depois desconta das derrotas e empates
  pontos = jogadorDaVez.vitorias * 10;
  pontos -= jogadorDaVez.derrotas * 5;
  pontos += jogadorDaVez.empates * 5;
  //atualiza os pontos do jogador
  arrayJogadores[indiceDoJogador].pontos = pontos;
}

//transforma a imagem em uma imagem clicavel e associada ao indice de jogadores
function transformaAvatar(i) {
  var jogadorDaVez = arrayJogadores[i];
  var imagem = jogadorDaVez.avatar;
  jogadorDaVez.avatar = "<button type='file' onclick='trocaAvatar(" + i +")' > <img src=" + imagem + "> </button>";
}

function trocaAvatar(i) {
   var imgURL = prompt("Qual o endereço da imagem?");
  if (imgURL != null) {
    arrayJogadores[i].avatar = imgURL;
    transformaAvatar(i);
    exibe();
  }
}


//Jogo da Velha
var localDoTabuleiro = document.getElementById("tabuleiro");
var tabuleiro = preenche();
var campeoes = ['❌','⭕'];
var campeaoDaVez = 0;
var posicoesDeVitoria = {
  0 : [[0,1,2], [0,4,8], [0,3,6]],
  1 : [[1,4,7], [1,0,2]],
  2 : [[2,1,0], [2,4,6], [2,5,8]],
  3 : [[3,0,6], [3,4,5]],
  4 : [[4,1,7], [4,3,5]],
  5 : [[5,4,3], [5,2,8]],
  6 : [[6,3,0], [6,7,8], [6,4,2]],
  7 : [[7,6,8], [7,4,1]],
  8 : [[8,5,2], [8,7,6], [8,4,0]],
}
nMaxDeJogadas = 9;

//evento para o formulário e botao
var iaBtn = document.getElementById("ia");
var jogada = document.getElementById("jogada");
jogada.addEventListener("keyup", validaJogada);


//preenche um tabuleiro com os números da interface
function preenche() {
  var tmpTab = [];
  for (var i = 0; i < 9; i++) {
    tmpTab[i] = i+1;
  }
  return tmpTab;
}

//desenha o tabuleiro
function desenha() {
  var gradeJogoDaVelha = "<tr>";
  for (var i = 0; i < tabuleiro.length; i++) {
    gradeJogoDaVelha += "<td>"+ tabuleiro[i] +"</td>";
    //se chegou na borda do tabulheiro, fecha linha e inicia nova linha
    if ((i+1) % 3 == 0) {
      gradeJogoDaVelha += "</tr>";
    if ((i+1 != tabuleiro.length ))
      gradeJogoDaVelha += "<tr>"
    }
  }
  //fecha a ultima linha e escreve no documento
  localDoTabuleiro.innerHTML = gradeJogoDaVelha;
  jogada.value = "";
}

//retorna o indice do próximo jogador
function proximoJogador() {
   if (campeaoDaVez == 0)
      return 1;
    else 
      return 0;
}

//coloca x ou bola no tabuleiro e alterna os jogadores
function colocar(pos, marca) {
  tabuleiro[pos] = marca;
  nMaxDeJogadas--;
  desenha();
  
  //se deu velha
  if (vitoriaKa(pos, marca)) {
    fimDoJogo();
  } else {
    //Se acabou as jogadas
    if (nMaxDeJogadas == 0) {
      fimDoJogo("empate")
      //alterna a vez do jogador e jogo continua
    } else {
      campeaoDaVez = proximoJogador();
      document.getElementById("cabecalho").innerHTML= "Vez da " + campeoes[campeaoDaVez];
    }
  }
}

//recebe a jogada do usuário, trata de acordo com quem tá na vez.
function validaJogada() {
  var tentativa = jogada.value;
  //garante que o número corresponde ao tabuleiro permitido
  if ( (tentativa > 0) && (tentativa < 10) ) {
    var marcaAtual = campeoes[campeaoDaVez];
    var marcaProxima = campeoes[proximoJogador()];
    //se a posição do tabuleiro está livre,
    //então é possivel fazer a jogada
    if (tabuleiro[tentativa-1] != marcaAtual && tabuleiro[tentativa-1] != marcaProxima) {
      colocar(tentativa-1, marcaAtual);
    }
  }
}

//dado uma posiçao, testa todas posibilidades de vitoria baseado no objeto 'posicoesDeVitoria' previamente criado
function vitoriaKa(indice, marca) {
  var combinacoes;
  var subArray = posicoesDeVitoria[indice];
  //primeiro nível do subArray
  for (var i = 0; i < subArray.length; i++) {
    combinacoes = 0;
    //Segundo nível do subArray, as posições em si
    for (var j = 0; j < subArray[i].length; j++) {
      if (tabuleiro[subArray[i][j]] == marca)
        combinacoes++;
      //Se somou três consecutivos, então ganhou
      if (combinacoes == 3)
        return true;
    }
  }
  //se testou tudo e ainda não retornou 'true'...
  return false; 
}

//A fazer...
function fimDoJogo(oQ) {
  if (oQ == "empate") {
    alert("Empate! Ninguem ganhou")
  } else {
    alert(campeoes[campeaoDaVez] + "Ganhou");
  }
  jogada.disabled = true;
  iaBtn.disabled = false;
}

//A implementar
//jogar contra ia
function jogoIa() {
  iaBtn.disabled = true;
  jogada.disabled = false;
  resetTabuleiro();
}

function resetTabuleiro() {
  nMaxDeJogadas = 9;
  tabuleiro = preenche();
  desenha();
}

//testes
exibe();
desenha();