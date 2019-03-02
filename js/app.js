//Dolar Today
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
  //Fecha
  $("#Fecha").html("Fecha: " + data._timestamp.fecha);
  //Tasas en USD
  $("#transferenciaUSD").html("Transferencia: " + data.USD.transferencia + " VES <br>");
  $("#efectivo_realUSD").html("Efectivo: " + data.USD.efectivo_real + " VES <br>");
  $("#promedio_realUSD").html("Promedio: " + data.USD.promedio_real + " VES <br>");
  $("#bitcoin_refUSD").html("Bitcoin: " + data.USD.bitcoin_ref + " VES <br>");
  $("#sicad1USD").html("Sicad: " + data.USD.sicad1 + " VES <br>");
  $("#dolartodayUSD").html("Dolartoday: " + data.USD.dolartoday + " VES <br>");
  //Tasas en EUR
  $("#transferenciaEUR").html("Transferencia: " + data.EUR.transferencia + " VES <br>");
  $("#efectivo_realEUR").html("Efectivo: " + data.EUR.efectivo_real + " VES <br>");
  $("#promedio_realEUR").html("Promedio: " + data.EUR.promedio_real + " VES <br>");
  $("#sicad1EUR").html("Sicad: " + data.EUR.sicad1 + " VES <br>");
  $("#dolartodayEUR").html("Dolartoday: " + data.EUR.dolartoday + " VES <br>");
  //
  $("#promedioUSD").html("Promedio: " + data.USD.promedio_real + " VES <br>");
  $("#promedioEUR").html("Promedio: " + data.EUR.promedio_real + " VES <br>");
});

//WhatsApp
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
  var mensaje = "Promedio de Dolar: " + data.USD.promedio_real + " Promedio de Euro: " + data.EUR.promedio_real;
  var url = "https://metalsyntax.github.io/Monitor-Dolar/";
  var whats = "https://api.whatsapp.com/send?text=" + mensaje + " Visite para consultar a profundidad " + url;
  $("#whatsapp").attr({
    'title': 'Compartir por WhatsApp',
    'href': whats,
  });
});

//Twitter
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
  var mensaje = "Promedio de Dolar: " + data.USD.promedio_real + " Promedio de Euro: " + data.EUR.promedio_real;
  var url = "https://metalsyntax.github.io/Monitor-Dolar/";
  var hashtags = "bitcoin,venezuela,monitor";
  var tweet = "https://twitter.com/intent/tweet?url=" + url + "&text=" + mensaje + "&hashtags=" + hashtags;
  $("#twitter").attr({
    'title': 'Compartir por Twitter',
    'href': tweet,
  });
});

//Telegram
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
  var mensaje = "Promedio de Dolar: " + data.USD.promedio_real + " Promedio de Euro: " + data.EUR.promedio_real;
  var url = "https://metalsyntax.github.io/Monitor-Dolar/";
  var tele = "https://t.me/share/url?url=" + url + "&text=" + mensaje;
  $("#telegram").attr({
    'title': 'Compartir por Telegram',
    'href': tele,
  });
});

//Animacion
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
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

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

//Yadio
  /*$.getJSON("http://cors.io/?https://api.yadio.io/json", function (dataYadio) {
$("#YadioUSD").html("Dolares" + dataYadio.USD.rate + "<br>");
  console.log(dataYadio);
});*/
