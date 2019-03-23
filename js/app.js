//DolarToday
var apiRequest1 = fetch('https://s3.amazonaws.com/dolartoday/data.json').then(function (response) {
  return response.json();
});
//Yadio.io
var apiRequest2 = fetch('https://cors-anywhere.herokuapp.com/https://api.yadio.io/json').then(function (response) {
  return response.json();
});
//Dolar Satoshi
var apiRequest3 = fetch('https://cors-anywhere.herokuapp.com/https://localbitcoins.com/sell-bitcoins-online/vef/.json').then(function (response) {
  return response.json();
});
var apiRequest4 = fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD').then(function (response) {
  return response.json();
});

Promise.all([apiRequest1, apiRequest2]).then(function (values) {
  //Fecha
  var Fecha = values[0]._timestamp.fecha;
  document.getElementById("Fecha").innerHTML = Fecha;
  //Tasas en USD DolarToday
  document.getElementById("transferenciaUSD").innerHTML = values[0].USD.transferencia;
  document.getElementById("efectivo_realUSD").innerHTML = values[0].USD.efectivo_real;
  document.getElementById("bitcoin_refUSD").innerHTML = values[0].USD.bitcoin_ref;
  document.getElementById("dolartodayUSD").innerHTML = values[0].USD.dolartoday;
  //Tasas en USD Yadio.io
  document.getElementById("yadioUSD").innerHTML = values[1].USD.avg24h.toFixed(2);

  //Tasas en EUR DolarToday
  document.getElementById("transferenciaEUR").innerHTML = values[0].EUR.transferencia;
  document.getElementById("efectivo_realEUR").innerHTML = values[0].EUR.efectivo_real;
  document.getElementById("dolartodayEUR").innerHTML = values[0].EUR.dolartoday;
  //Tasas en EUR Yadio.io
  document.getElementById("yadioEUR").innerHTML = values[1].rates.EUR.toFixed(2);

  //Promedio del Dolar
  var TodayUSD = values[0].USD.dolartoday;
  var YadioUSD = parseInt(values[1].USD.avg24h);
  var PromUSD = ((TodayUSD + YadioUSD) / 2).toFixed(2);
  document.getElementById("promedio_realUSD").innerHTML = PromUSD;
  document.getElementById("promedioUSD").innerHTML = PromUSD;

  //Promedio del Euro
  var TodayEUR = values[0].EUR.dolartoday;
  var YadioEUR = parseInt(values[1].rates.EUR);
  var PromEUR = ((TodayEUR + YadioEUR) / 2).toFixed(2);
  document.getElementById("promedio_realEUR").innerHTML = PromEUR;
  document.getElementById("promedioEUR").innerHTML = PromEUR;

  //WhatsApp
  var mensaje = "Promedio de Dolar: " + PromUSD +  " Promedio de Euro: " + PromEUR;
  var url = "https://metalsyntax.github.io/Syntax-Monitor/";
  var whats = "https://api.whatsapp.com/send?text=" + mensaje + " Visite para consultar a profundidad " + url + " " + Fecha;
  //Boton de WhatsApp
  var whatsppButton = document.getElementById("whatsapp");
  whatsppButton.setAttribute("title", "Compartir por WhatsApp");
  whatsppButton.setAttribute("href", whats);

  //Twitter
  var hashtags = "bitcoin,venezuela,monitor";
  var tweet = "https://twitter.com/intent/tweet?url=" + url + "&text=" + mensaje + " " + Fecha + "&hashtags=" + hashtags;
  //Boton de Twitter
  var twitterButton = document.getElementById("twitter");
  twitterButton.setAttribute("title", "Compartir por Twitter");
  twitterButton.setAttribute("href", tweet);
  //Telegram
  var tele = "https://t.me/share/url?url=" + url + "&text=" + mensaje + " " + Fecha;
  //Boton de Telegram
  var teleButton = document.getElementById("telegram");
  teleButton.setAttribute("title", "Compartir por Telegram");
  teleButton.setAttribute("href", tele);

}).catch(function (err) {
  console.log("Hubo un Error: " + err);
});

//Animacion
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

//Refrescar Pagina
function actualizar() {
  location.reload(true);
}
setTimeout(function() {
  actualizar();
}, 300000);

//Tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});