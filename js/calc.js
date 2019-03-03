//Calculadora
fetch("https://s3.amazonaws.com/dolartoday/data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
         var USD = data.USD.promedio_real;
         var EUR = data.EUR.promedio_real;
         var VES = 1 / data.USD.promedio_real;
         var BIT = data.USD.bitcoin_ref;

        var ValueUSD = document.getElementById("input-usd").value = 0;
        var ValueEUR = document.getElementById("input-eur").value = 0;
        var ValueVES = document.getElementById("input-ves").value = 0;
        var ValueBIT = document.getElementById("input-btc").value = 0;

        var ResultUSD = document.getElementById("input-usd").innerHTML;
        var ResultEUR = document.getElementById("input-eur").innerHTML;
        var ResultVES = document.getElementById("input-ves").innerHTML;
        var ResultBIT = document.getElementById("input-btc").innerHTML;
    })
    .catch(function (err) {
        console.log("Hubo un Error: " + err);
    });