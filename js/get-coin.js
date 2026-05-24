function getCoin(amount = 0, source = "Unknown") {

// get existing coins
        let coins = parseInt(
            localStorage.getItem("coins")
        ) || 0;

        // add 50 coins
        coins += 50;

        // save coins
        localStorage.setItem(
            "coins",
            coins
        );

        // save history
        let history = JSON.parse(
            localStorage.getItem("coinHistory")
        ) || [];

        history.push({
            quiz: "Reward Bonus",
            reward: 50,
            date: new Date().toLocaleString()
        });

        localStorage.setItem(
            "coinHistory",
            JSON.stringify(history)
        );

        console.log("50 bonus coins added");


  // 👉 only notify Android
  if (window.Android && typeof Android.onCoinAdded === "function") {
    Android.onCoinAdded(1);  // only msg
   // Android.onCoinAdded(amount); // msg + coin
  }
}
