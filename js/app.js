//Dolar Today
fetch('https://s3.amazonaws.com/dolartoday/data.json').then(function (response) {
  return response.json();
}).then(function (data) {
  
  //Fecha
  document.getElementById("Fecha").innerHTML = data._timestamp.fecha;
  //Tasas en USD
  document.getElementById("transferenciaUSD").innerHTML = data.USD.transferencia;
  document.getElementById("efectivo_realUSD").innerHTML = data.USD.efectivo_real;
  document.getElementById("bitcoin_refUSD").innerHTML = data.USD.bitcoin_ref;
  document.getElementById("dolartodayUSD").innerHTML = data.USD.dolartoday;
  //Promedio Listado
  document.getElementById("promedio_realUSD").innerHTML = data.USD.promedio_real;

  //Tasas en EUR
  document.getElementById("transferenciaEUR").innerHTML = data.EUR.transferencia;
  document.getElementById("efectivo_realEUR").innerHTML = data.EUR.efectivo_real;
  document.getElementById("dolartodayEUR").innerHTML = data.EUR.dolartoday;
  //Promedio Listado
  document.getElementById("promedio_realEUR").innerHTML = data.EUR.promedio_real;

  //Promedio Cuadro
  document.getElementById("promedioUSD").innerHTML = data.USD.promedio_real;
  document.getElementById("promedioEUR").innerHTML = data.EUR.promedio_real;
}).catch(function (err) {
  console.log("Hubo un Error: " + err);
});

//Yadio.io
fetch('https://cors-anywhere.herokuapp.com/https://api.yadio.io/json').then(function (response) {
  return response.json();
}).then(function (data) {
  document.getElementById("yadioUSD").innerHTML = data.USD.avg24h.toFixed(2);
  document.getElementById("yadioEUR").innerHTML = data.rates.EUR.toFixed(2);
}).catch(function (err) {
  console.log("Hubo un Error: " + err);
});

//Dolar Satoshi
var localbitcoin = 'https://cors-anywhere.herokuapp.com/https://localbitcoins.com/sell-bitcoins-online/vef/.json';
var coinmarketcap ='https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD';

//WhatsApp
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
  var mensaje =
    "Promedio de Dolar: " +
    data.USD.promedio_real +
    " Promedio de Euro: " +
    data.EUR.promedio_real;
  var hora = data._timestamp.fecha;
  var url = "https://metalsyntax.github.io/Syntax-Monitor/";
  var whats =
    "https://api.whatsapp.com/send?text=" +
    mensaje +
    " Visite para consultar a profundidad " +
    url + " " + hora;
  $("#whatsapp").attr({
    title: "Compartir por WhatsApp",
    href: whats
  });
});

//Twitter
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
  var mensaje =
    "Promedio de Dolar: " +
    data.USD.promedio_real +
    " Promedio de Euro: " +
    data.EUR.promedio_real;
  var url = "https://metalsyntax.github.io/Syntax-Monitor/";
  var hora = data._timestamp.fecha;
  var hashtags = "bitcoin,venezuela,monitor";
  var tweet =
    "https://twitter.com/intent/tweet?url=" +
    url +
    "&text=" +
    mensaje + " " + hora +
    "&hashtags=" +
    hashtags;
  $("#twitter").attr({
    title: "Compartir por Twitter",
    href: tweet
  });
});

//Telegram
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
  var mensaje =
    "Promedio de Dolar: " +
    data.USD.promedio_real +
    " Promedio de Euro: " +
    data.EUR.promedio_real;
  var hora = data._timestamp.fecha;
  var url = "https://metalsyntax.github.io/Syntax-Monitor/";
  var tele = "https://t.me/share/url?url=" + url + "&text=" + mensaje + " " + hora;
  $("#telegram").attr({
    title: "Compartir por Telegram",
    href: tele
  });
});

//Animacion
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
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

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
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
setTimeout(function () {
  actualizar();
}, 900000);