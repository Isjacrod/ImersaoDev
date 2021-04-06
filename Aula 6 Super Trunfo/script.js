//Variaveis
var cartaJogador;
var cartaMaquina;
var pPts = 0; //pontos da pessoa
var mPts = 0; //pontos da máquina
var fimDaRodada = false;

var listaDeCartas = [];
//Função que cria a carta e coloca em um array
//nome, imagem, força, saúde, inteligência, fofura
function criaCarta(n, i, f, s, q, c) {
  var obj = {};
  obj.nome = n;
  obj.imagem = i;
  obj.atributos = {};
  obj.atributos.forca = f;
  obj.atributos.saude = s;
  obj.atributos.inteligencia = q;
  obj.atributos.fofura = c;
  listaDeCartas.push(obj);
} 

//Cartas
criaCarta("Darth Vader", "https://www.wallpaperuse.com/wallp/41-419880_m.jpg", 50, 21, 37, 2);
criaCarta("Son Goku", "https://www.wallpaperuse.com/wallp/0-8620_m.jpg", 100, 83, 15, 28);
criaCarta("Rick Sanchez", "https://www.wallpaperuse.com/wallp/1-11262_m.jpg", 13, 22, 100, 11);
criaCarta("Chicorita", "https://i.pinimg.com/originals/54/77/10/5477105c7f036c52f9b0663871c253d9.png", 40, 85, 23, 90); 
criaCarta("Iberê Thenório", "https://criadoresid.com/wp-content/uploads/2016/10/Captura-de-Tela-2020-03-11-a%CC%80s-11.31.49.png", 30, 35, 45, 33);
criaCarta("Hermione Granger", "http://4.bp.blogspot.com/-clk-DZnT4F0/Tarp4GMLT_I/AAAAAAAAAKI/krB9xuLDk6c/s1600/Hermione-Jean-Granger.jpg", 21, 45, 40, 54);
criaCarta("Kim Nam-joon", "https://www.famousbirthdays.com/faces/namjoon-kim-image.jpg", 27, 47, 38, 58);
criaCarta("Batman", "https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2021/03/14/batman-dying-is-easy.jpg", 45, 50, 61, 5);
criaCarta("Pantera Negra", "https://static1.purebreak.com.br/articles/2/68/81/2/@/263014--pantera-negra-e-a-maturidade-de-um-fil-diapo-1.jpg", 72, 80, 40, 24);
criaCarta("Elon Musk", "https://imagens.canaltech.com.br/celebridades/18.400.jpg", 31, 28, 49, 22);
criaCarta("Korra", "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Korra_%28Season_4%29_appearance.jpg/220px-Korra_%28Season_4%29_appearance.jpg", 33, 59, 36, 55);
criaCarta("Lorde Voldemort", "http://2.bp.blogspot.com/-hvofcScgU-A/ToX0feiRJmI/AAAAAAAAAUA/igGdff80XtI/s1600/Lord%2BVoldemort.jpg", 47, 69, 42, 0);
criaCarta("Jair Bolsonaro", "https://static.poder360.com.br/2019/04/foto-oficial-Bolsonaro-774x644.png", 16, 19, -1, 0);
criaCarta("Walter White", "https://static.wikia.nocookie.net/breakingbad/images/e/e7/BB-S5B-Walt-590.jpg", 25, 13, 53, 13);
criaCarta("Lisa Simpsons", "https://i.pinimg.com/originals/89/05/24/890524b27d6b4cf2a70310c7ae506f99.jpg", 17, 44, 47, 25);
criaCarta("Albert Einsten", "https://100trgfisi.vpeventos.com/uploads/uploads_14104/site/logo_1_356078.jpg", 22, 25, 69, 33);
criaCarta("Mônica", "https://i.pinimg.com/originals/f5/6a/39/f56a39fa0da7071016deae566fbbef56.png", 100, 50, 30, 100);

//criaCarta(nome, imagem, força, saude, inteligencia, fofura)
//força: mais ou menos quantos quilos consegue levantar com 1 braço
//saude: saude real ou regeneração. Humanos normais dificilmente ultrapassam 50
//inteligencia: humanos normais tem 30
//fofura: feio <10, neutro 20, ok 30, beleza 50, bebês 60, 70> chibi  

//Elementos do documento
var divCenario1 = document.getElementById("cenario1");
var divCenario2 = document.getElementById("cenario2");
var divCartaJogador = document.getElementById("carta-jogador");
var divCartaMaquina = document.getElementById("carta-maquina");
var statusDisputa = document.getElementById("status-disputa");

//Funções
function iniciarJogo() {
    alternaCenario();
    proximaRodada();
}

//Sorteia uma carta aleatória para a maquina e para pessoa
function sortearCarta() {
  var numeroDoJogador;
  var numeroDaMaquina = parseInt(Math.random() * (listaDeCartas.length) );
  cartaMaquina = listaDeCartas[numeroDaMaquina];
  do { 
    numeroDoJogador = parseInt(Math.random() * (listaDeCartas.length) ); 
  } while (numeroDoJogador == numeroDaMaquina)
  cartaJogador = listaDeCartas[numeroDoJogador];
  
  exibirCartas(cartaJogador, cartaMaquina);
}

//gera cartas e coloca na pagina
function exibirCartas(carta1, carta2) {
  divCartaJogador.innerHTML = gerarCarta(carta1);
  divCartaMaquina.innerHTML = gerarCarta(carta2);
  //oculta alguns atributos para dificultar um pouco
  ocultaAtributos();
}

//Devolve um html de uma carta pronto para inserir no documento
function gerarCarta(carta) {
  //cabeçalho
  var tmpHTML = "<h3>" + carta.nome + "</h3>";
  //imagem
  tmpHTML +="<div class='carta-imagem'> <img src=" + carta.imagem + "></div>";
  //status
  tmpHTML += "<div class='carta-status'>";
  for (prop in carta.atributos) {
    tmpHTML += "<label>"
    tmpHTML += "<input type='radio' name='radio-atributos' value="+ prop +"></input>";
    tmpHTML += prop +"<span> : " + carta.atributos[prop] + "</span></label>";
  }
  tmpHTML += "</div>"
  //pronto
  return tmpHTML;
}

//Seleciona aleatoriamente metade dos atributos das cartas
//e desabilita os inputs que correspondem
function ocultaAtributos() {
  var atributos = cartaJogador.atributos;
  
  //Escolhe os indices aleatoriamente
  var qtdAtributos = Object.keys(atributos).length;
  var qtdItemsASerOcultados = Math.floor(qtdAtributos/2);
  var indiceItemsASerOcultados = [];
  //gera 1 ou mais indices aleatorios e salva no array
  do { var i = parseInt(Math.random() * qtdAtributos);
    if ( !(indiceItemsASerOcultados.includes(i)) ) {
      indiceItemsASerOcultados.push(i);
      qtdItemsASerOcultados--;
    }
  } while ( qtdItemsASerOcultados > 0)
    
  //para cada indice aleatorio gerado, desabilita um input que contenha o valor
  for (var i = 0; i < indiceItemsASerOcultados.length; i++) {
    //selecionando o input
    var indiceNoObjeto = indiceItemsASerOcultados[i];
    var valorNoObjeto = Object.keys(atributos)[indiceNoObjeto];
    //selecionando apenas os inputs que contênham o value=atributo
    var inputsEncontrados = document.querySelectorAll(`input[value=${valorNoObjeto}]`);
    //aplicando para cada existência de input encontrado
    for (var j = 0; j < inputsEncontrados.length; j++) {
      inputsEncontrados[j].disabled=true;
      inputsEncontrados[j].parentElement.classList.add("anulado");
    }
  }
  altAtrVis("oculte");
}

//aterna a visibilidade de 2 <div>
function alternaCenario() {
  var situacaoCenario1 = getComputedStyle(divCenario1).display;
  if (situacaoCenario1 == "block") {
    divCenario1.style.display = "none";
    divCenario2.style.display = "block";
  } else if (situacaoCenario1 == "none") {
    divCenario2.style.display = "none";
    divCenario1.style.display = "block";    
  }
}

//Executado no botão que pode assumir tanto 
//a função de verificar e de jogar de novo
function verificar() {
  //rodada finalizada
  if (fimDaRodada == true) {
    //Se acabou a rodada e alguém também fez pontuaçao máxima
    if (pPts == 10 || mPts == 10)
      telaInicial();
    else
      proximaRodada();
    
  //Rodada Não finalizada
  //Checa como foi essa rodada
  } else {
    checaVitoria();
    //Mostra os valores na tela
    altAtrVis("mostre");
    //Com isso, no próximo clique a rodada estára finalizada
    fimDaRodada = true; 
  }
}
  
//Checa se alguém ganhou, exibe mensagem e altera o texto dos botões
function checaVitoria() {
  var atributoDaVez = obtemAtributo();
  var atributoMaquina = cartaMaquina.atributos[atributoDaVez];
  var atributoJogador = cartaJogador.atributos[atributoDaVez];
  if (atributoJogador > atributoMaquina) {
    statusDisputa.innerHTML = "<span class='vitoria'> Você Ganhou!</span>";
    pPts++;
  } else if (atributoJogador < atributoMaquina) {
    statusDisputa.innerHTML = "<span class='derrota'> Perdeu </span>";
    mPts++;
  } else {
    statusDisputa.innerHTML = "<span> Empatou </span>";
  }

  if (pPts == 10 || mPts == 10) {
    fimDoJogo();
  } else {
    btnEscolher.innerHTML = "Próxima Rodada";
  }
}


//alterna visibilidade dos valores dos atributos 
//ao adicionar e remover uma classe do elemento pai que contem o <span>
function altAtrVis(q) {
  var divContendoSpan = document.getElementById("cartas");
  if ( q == "mostre") {
  divContendoSpan.classList.remove("oculta-span-values");
  document.querySelector("#carta-maquina .carta-status").style.visibility="initial";
  } else if (q == "oculte") {
    divContendoSpan.classList.add("oculta-span-values");
    document.querySelector("#carta-maquina .carta-status").style.visibility="hidden";
  } 
}

//checa todas as opcoes dentro do input e retorna a que estiver marcada
function obtemAtributo() {
  var opcoes = document.getElementsByName("radio-atributos");
  for (var i = 0; i < opcoes.length; i++) {
    if (opcoes[i].checked == true)
      return opcoes[i].value;
  }
}

//prepara tudo para uma próxima rodada
function proximaRodada() {
  fimDaRodada = false;
  btnEscolher.innerHTML = "Verificar";
  statusDisputa.innerHTML = `Você (${pPts})   Máquina(${mPts})`; 
  sortearCarta();
}

//Exibe mensagens do fim do jogo
function fimDoJogo() {
  alert("Fim Do Jogo");
  statusDisputa.innerHTML = `Você(${pPts})    Máquina(${mPts})`;
  btnEscolher.innerHTML = "Reiniciar Jogo";
}

//Tela inicial
function telaInicial() {
  var divGradeDeCartas = document.getElementById("grade-de-cartas")
  //Se veio de um game over, alterna. Se não só gera
  if( pPts != 0 || mPts != 0) {
    alternaCenario();
  }
  divGradeDeCartas.innerHTML = "";
  for (var i = 0; i < listaDeCartas.length; i++) {
    divGradeDeCartas.innerHTML += `<div class='carta-design-mini'> ${gerarCarta(listaDeCartas[i])}</div>`;
  }
  //Zera pontos anteriores
  pPts = 0;
  mPts = 0;
}

//Inicio de tudo
telaInicial();

/* A Fazer */
//Adicionar um som ou frase personalizado para a carta vencedora