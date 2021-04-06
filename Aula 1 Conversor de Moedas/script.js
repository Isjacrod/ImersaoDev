vLibras = prompt("Qual o valor em Libras?")
vDolar = parseFloat(vLibras) 
vDolar = vDolar * 1.39
vDolar = vDolar.toFixed(2)
alert("Isso equivale a $" + vDolar + " dólares")