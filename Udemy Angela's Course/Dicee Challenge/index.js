var randon_number1 = Math.ceil(Math.random() * 6);

document.querySelectorAll("img")[0].setAttribute("src", "images/dice" + randon_number1 + ".png");

var randon_number2 = Math.ceil(Math.random() * 6);

document.querySelectorAll("img")[1].setAttribute("src", "images/dice" + randon_number2 + ".png");


if (randon_number1 > randon_number2)
{
    document.querySelector("h1").innerHTML = "🚩 Player 1 wins!"
}
else if (randon_number1 < randon_number2)
{
    document.querySelector("h1").innerHTML = "Player 2 wins! 🚩"
}
else
{
    document.querySelector("h1").innerHTML = "Draw!"
}    
