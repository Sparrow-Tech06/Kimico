let coins = localStorage.getItem("coins") || 0;

function earnCoins(){
  coins = parseInt(coins) + 50;
  localStorage.setItem("coins", coins);

  document.getElementById("msg").innerText = "You earned 50 coins 💰";
}
