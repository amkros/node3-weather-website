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
            callback(undefined, `${body.daily.data[0].summary} Actualmente estamos a ${body.currently.temperature} grados centigrados. Con una probabilidad de ${body.currently.precipProbability} % de lluvia`);            
        }
    });
}

module.exports = forecast;

