//Criador de objeto para os items
//imagem, texto, wikipedia, youtube
function AnimeItem(i, t, w, v) {
  this.imagem = i;
  this.texto = t;
  this.info = w;
  this.video = v;
}

//Cria os objetos e adiciona nesse array
var animes = [];
function criaItemAnime(i, t, w, v) {
  var tmpObj = new AnimeItem(i, t, w, v);
  animes.push(tmpObj);
}

//adicionando os items
criaItemAnime("https://cdn.myanimelist.net/images/anime/5/73199.jpg", "Steins Gate", "https://pt.wikipedia.org/wiki/Steins;Gate", "https://www.youtube.com/embed/27OZc-ku6is");
criaItemAnime("https://cdn.myanimelist.net/images/anime/5/87048.jpg", "Kimi no Nawa", "https://pt.wikipedia.org/wiki/Kimi_no_Na_wa.", "https://www.youtube.com/embed/3KR8_igDs1Y");
criaItemAnime("https://cdn.myanimelist.net/images/anime/10/77957.jpg", "Boku Dake ga Inai Machi","https://pt.wikipedia.org/wiki/Boku_Dake_ga_Inai_Machi", "https://www.youtube.com/embed/DwmxEAWjTQQ");
criaItemAnime("https://cdn.myanimelist.net/images/anime/10/47347.jpg", "Shingeki no Kyojin","https://pt.wikipedia.org/wiki/Shingeki_no_Kyojin", "https://www.youtube.com/embed/LHtdKWJdif4");
criaItemAnime("https://cdn.myanimelist.net/images/manga/2/54453.jpg", "Death Note","https://pt.wikipedia.org/wiki/Death_Note", "https://www.youtube.com/embed/Vt_3c8BgxV4");
criaItemAnime("https://cdn.myanimelist.net/images/anime/12/74683.jpg", "Charlotte",'https://pt.wikipedia.org/wiki/Charlotte_(anime)', "https://www.youtube.com/embed/6AgEzww-a0w");
criaItemAnime("https://cdn.myanimelist.net/images/anime/10/13776.jpg", "Tokyo Magnitude 8.0",'https://pt.wikipedia.org/wiki/Tokyo_Magnitude_8.0', "https://www.youtube.com/embed/IqhrKb11rEU");
criaItemAnime("https://cdn.myanimelist.net/images/anime/5/79697.jpg", "Ano Hana", 'https://pt.wikipedia.org/wiki/Ano_Hi_Mita_Hana_no_Namae_o_Bokutachi_wa_Mada_Shiranai', "https://www.youtube.com/embed/x8fvwC5xVGg");
criaItemAnime("https://cdn.myanimelist.net/images/anime/13/77976.jpg", "Hai to Gensou no Grimgar", 'https://pt.wikipedia.org/wiki/Hai_to_Gensou_no_Grimgar', "https://www.youtube.com/embed/nFhwqXYchiY");
criaItemAnime("https://cdn.myanimelist.net/images/anime/1122/96435.jpg", "Koe no Katachi", 'https://pt.wikipedia.org/wiki/Koe_no_Katachi_(filme)', "https://www.youtube.com/embed/XBNWo25izJ8");
criaItemAnime("https://cdn.myanimelist.net/images/anime/6/86733.jpg", "Made in Abys", 'https://pt.wikipedia.org/wiki/Made_in_Abyss', "https://www.youtube.com/embed/AQbaZeby2zA");
criaItemAnime("https://cdn.myanimelist.net/images/anime/7/75919.jpg", "Mononoke Hime", 'https://pt.wikipedia.org/wiki/Mononoke_Hime', "https://www.youtube.com/embed/4OiMOHRDs14");
criaItemAnime("https://cdn.myanimelist.net/images/anime/1/2432.jpg", "Toki wo Kakeru Shoujo", 'https://pt.wikipedia.org/wiki/Toki_o_Kakeru_Sh%C5%8Djo', "https://www.youtube.com/embed/eWnTeKEsDlU");
criaItemAnime("https://cdn.myanimelist.net/images/anime/6/79597.jpg", "A Viagem de Chihiro", 'https://pt.wikipedia.org/wiki/A_Viagem_de_Chihiro', "https://www.youtube.com/embed/ByXuk9QqQkk");
criaItemAnime("https://cdn.myanimelist.net/images/anime/7/75808.jpg", "Hotaru no Haka", 'https://pt.wikipedia.org/wiki/Hotaru_no_Haka', "https://www.youtube.com/embed/4vPeTSRd580");
criaItemAnime("https://cdn.myanimelist.net/images/anime/1613/102576.jpg", "Dr. Stone", 'https://pt.wikipedia.org/wiki/Dr._Stone', "https://www.youtube.com/embed/2ei4KpfCOAI");
criaItemAnime("https://cdn.myanimelist.net/images/anime/4/75509.jpg", "Another", 'https://pt.wikipedia.org/wiki/Another', "https://www.youtube.com/embed/UGoAl3L13bc");

//Embaralha os items só para não parecer tendênciosso ou algo assim
var tmpArray = [];
while (animes.length > 0) {
  var nAleatorio = parseInt( Math.random() * animes.length);
  tmpArray.push(animes[nAleatorio]);
  animes.splice(nAleatorio,1);
}
animes = tmpArray;

//Coloca os items no documento
for (var i = 0; i < animes.length; i++) {
  //criando div, imagem, texto e botões
  var imgItemDiv = document.createElement("div");
  var imgMoldura = document.createElement("div");
  var molduraCover = document.createElement("div");
  var traiBtn = document.createElement("button");
  var infoBtn = document.createElement("button");
  var txtBaixo = document.createElement("p");
  
  //adicionando alguns identificadores para usar no CSS
  imgItemDiv.classList.add("anime-item");
  imgMoldura.classList.add("img-moldura");
  molduraCover.classList.add("moldura-cover");
  infoBtn.id = "info-btn";
  traiBtn.id = "trai-btn";
  
  //adicionando imagem, texto e função para os botões
  imgMoldura.style.backgroundImage = `url(${animes[i].imagem})`;
  imgMoldura.style.backgroundSize = "cover";
  txtBaixo.innerHTML = animes[i].texto;
  infoBtn.setAttribute("onclick", `exibeInfo('${animes[i].info}')`);
  infoBtn.innerHTML="Informações ℹ️";
  traiBtn.setAttribute("onclick", `exibeInfo('${animes[i].video}')`);
  traiBtn.innerHTML="Trailer 🎦";
  
  //anexando tudo e escrevendo na página
  molduraCover.append(infoBtn, traiBtn)
  imgMoldura.append(molduraCover)
  imgItemDiv.append(imgMoldura, txtBaixo);
  document.getElementById("items").appendChild(imgItemDiv);
}

//Exibe um iframe com informações ou trailer
function exibeInfo(url) {
  var divIframe = document.getElementById("iframe-info");
  var novoIframe = document.createElement("iframe");
  novoIframe.setAttribute("src", url);
  novoIframe.id = "info";
  divIframe.appendChild(novoIframe);
  
  var divPopUp = document.getElementById("info-container");
  divPopUp.className = "info-exibe";
}

//Oculta o PopUP, usado no botão fechar do Iframe
function fechaInfo() {
  var divPopUp = document.getElementById("info-container");
  divPopUp.className="info-oculta";
  
  var velhoIframe = document.getElementById("info");
  velhoIframe.remove();
}

//SBA (Stupid background animation)
var degrees = 127;
const target = document.querySelector("body");
function animaFundo() {
  if ((degrees += 3) > 360)
  degrees = 0;
  target.style.backgroundImage = `linear-gradient(${degrees}deg, blue, violet)`;
}
setInterval(animaFundo, 300);
