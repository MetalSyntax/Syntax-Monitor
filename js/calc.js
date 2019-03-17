//Calculadora
    function formatCurrency(num) {
      num = num.toString().replace(/\$|\,/g, "");
      if (isNaN(num)) num = "0";
      sign = num == (num = Math.abs(num));
      num = Math.floor(num * 100 + 0.50000000001);
      cents = num % 100;
      num = Math.floor(num / 100).toString();
      if (cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num =
          num.substring(0, num.length - (4 * i + 3)) +
          "." +
          num.substring(num.length - (4 * i + 3));
      return (sign ? "" : "-") + num + "," + cents;
    }

    function calculate() {
      var orig_amount = null;
      orig_amount = document.getElementById("input-amount").value;
      orig_amount = orig_amount.replace(/\./g, "");
      orig_amount = orig_amount.replace(/\,/g, ".");
      orig_amount = orig_amount.replace(/[a-zA-Z\$]+/g, "");
      var amount = parseFloat(orig_amount);

      var select = document.getElementById("Select");
      var inputUSD = document.getElementById("input-usd");
      var inputEUR = document.getElementById("input-eur");
      var inputBTC = document.getElementById("input-btc");

      // Bolivares
      valresultdolarefec = formatCurrency(amount / dolartoday.USD.promedio);
      valresulteuroefec = formatCurrency(amount / dolartoday.EUR.promedio);
      valresultbitcoin = formatCurrency(amount / dolartoday.USD.bitcoin_ref);

      // Dolares
      ValDolarBs = formatCurrency(amount * dolartoday.USD.promedio);
      ValBitcoinDolarBs = formatCurrency(amount * dolartoday.USD.bitcoin_ref);
      ValEuroDolarBs = formatCurrency(amount * (dolartoday.USD.promedio / dolartoday.EUR.promedio));

      //Euros
      ValEuroBs = formatCurrency(amount * dolartoday.EUR.promedio);
      ValEuroDolar = formatCurrency(amount * (dolartoday.EUR.promedio / dolartoday.USD.promedio));
      ValEuroBitcoin = formatCurrency(amount * (dolartoday.EUR.promedio / dolartoday.USD.bitcoin_ref));

      //Condicionales
      if (select.value === "1") {
        inputUSD.value = "Bs. " + ValDolarBs;
        inputEUR.value = "$. " + ValEuroDolarBs;
        inputBTC.value = "Bs. " + ValBitcoinDolarBs;
      }
      if (select.value === "2") {
        inputUSD.value = "€. " + ValEuroDolar;
        inputEUR.value = "Bs. " + ValEuroBs;
        inputBTC.value = "€. " + ValEuroBitcoin;
      }
      if (select.value === "3") {
        inputUSD.value = "$. " + valresultdolarefec;
        inputEUR.value = "€. " + valresulteuroefec;
        inputBTC.value = "₿. " + valresultbitcoin;
      }
    }
    calculate();
