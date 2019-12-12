const request = require('request');

const forecast = (latitud, longitud, callback) => {
    const url = `https://api.darksky.net/forecast/d99108d7e7a92546be7d112ff2d5d89f/${latitud},${longitud}?units=si&lang=es`;
    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('No se puede conectar al servicio del clima', undefined);
        } else if(body.error){
            callback('No se pudo encontrar el clima para esta ubicacion', undefined);
        }
        else{
            console.log(body.daily.data[0]);
            callback(undefined, `
            El clima para el dia de hoy es:  
            ${body.daily.data[0].summary} Con una temperatura de ${body.currently.temperature} °C. 
            Una maxima de ${body.daily.data[0].temperatureHigh} °C con una minima de ${body.daily.data[0].temperatureLow} °C.             
            La probabilidad de lluvia es de ${body.currently.precipProbability} %`);            
        }
    });
}

module.exports = forecast;

