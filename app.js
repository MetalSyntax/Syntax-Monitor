$.getJSON("https://s3.amazonaws.com/dolartoday/data.json", function (data) {
     //Fecha
     $('#Fecha').html('DolarToday al: ' + data._timestamp.fecha);
    //Tasas
    $('#transferencia').html('Transferencia: ' + data.USD.transferencia +'<br>');
    $('#efectivo_real').html('Efectivo: ' + data.USD.efectivo_real + '<br>');
    $('#promedio_real').html('Promedio: ' + data.USD.promedio_real + '<br>');
    $('#bitcoin_ref').html('Bitcoin: ' + data.USD.bitcoin_ref + '<br>');
    $('#sicad1').html('Sicad: ' + data.USD.sicad1 + '<br>');
    $('#dolartoday').html('Dolartoday: ' + data.USD.dolartoday + '<br>');
});