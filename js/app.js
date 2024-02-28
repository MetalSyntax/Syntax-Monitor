var apiRequest = fetch('https://venecodollar.vercel.app/api/v2/dollar').then(function (response) {
  return response.json();
});
Promise.all([apiRequest]).then(function (values) {
  //Fecha
  var Fecha = values[0].Data.date;
  const fechaFormateada = new Date(Fecha).toLocaleDateString('es-VE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  document.getElementById("Fecha").innerHTML = fechaFormateada;

  //Tasas en USD DolarToday
  document.getElementById("transferenciaUSD").innerHTML = values[0].Data.entities[0].info.dollar;
  document.getElementById("efectivo_realUSD").innerHTML = values[0].Data.entities[2].info.dollar;
  document.getElementById("bitcoin_refUSD").innerHTML = values[0].Data.entities[9].info.dollar;
  document.getElementById("dolartodayUSD").innerHTML = values[0].Data.entities[1].info.dollar;
  document.getElementById("paypalUSD").innerHTML = values[0].Data.entities[4].info.dollar;
  document.getElementById("yadioUSD").innerHTML = values[0].Data.entities[7].info.dollar;

  //WhatsApp
  var mensaje = "Dólar Monitor: " + values[0].Data.entities[0].info.dollar + " Dólar BCV: " + values[0].Data.entities[2].info.dollar;
  var url = "https://metalsyntax.github.io/Syntax-Monitor/";
  var whats = "https://api.whatsapp.com/send?text=" + mensaje + " Visite para consultar a profundidad " + url + " " + fechaFormateada;
  //Boton de WhatsApp
  var whatsppButton = document.getElementById("whatsapp");
  whatsppButton.setAttribute("title", "Compartir por WhatsApp");
  whatsppButton.setAttribute("href", whats);

  //Twitter
  var hashtags = "bitcoin,venezuela,monitor";
  var tweet = "https://twitter.com/intent/tweet?url=" + url + "&text=" + mensaje + " " + fechaFormateada + "&hashtags=" + hashtags;
  //Boton de Twitter
  var twitterButton = document.getElementById("twitter");
  twitterButton.setAttribute("title", "Compartir por Twitter");
  twitterButton.setAttribute("href", tweet);
  
  //Telegram
  var tele = "https://t.me/share/url?url=" + url + "&text=" + mensaje + " " + fechaFormateada;
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