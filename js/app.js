//Dolar Today
$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
  //Fecha
  $("#Fecha").html("Fecha: " + data._timestamp.fecha);
  //Tasas en USD
  $("#transferenciaUSD").html("Transferencia: " + data.USD.transferencia + "<br>");
  $("#efectivo_realUSD").html("Efectivo: " + data.USD.efectivo_real + "<br>");
  $("#promedio_realUSD").html("Promedio: " + data.USD.promedio_real + "<br>");
  $("#bitcoin_refUSD").html("Bitcoin: " + data.USD.bitcoin_ref + "<br>");
  $("#sicad1USD").html("Sicad: " + data.USD.sicad1 + "<br>");
  $("#dolartodayUSD").html("Dolartoday: " + data.USD.dolartoday + "<br>");
 //Tasas en EUR
 $("#transferenciaEUR").html("Transferencia: " + data.EUR.transferencia + "<br>");
 $("#efectivo_realEUR").html("Efectivo: " + data.EUR.efectivo_real + "<br>");
 $("#promedio_realEUR").html("Promedio: " + data.EUR.promedio_real + "<br>");
 $("#sicad1EUR").html("Sicad: " + data.EUR.sicad1 + "<br>");
 $("#dolartodayEUR").html("Dolartoday: " + data.EUR.dolartoday + "<br>");
 //
  $("#promedioUSD").html("Promedio: " + data.USD.promedio_real + "<br>");
  $("#promedioEUR").html("Promedio: " + data.EUR.promedio_real + "<br>");
});