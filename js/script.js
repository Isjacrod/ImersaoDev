function weNeedLove() {
  document.querySelector("h1").insertAdjacentText("beforeend", '❤');
  me.removeEventListener("click", weNeedLove);
}

const me = document.getElementById("me");
me.addEventListener("click", weNeedLove);
