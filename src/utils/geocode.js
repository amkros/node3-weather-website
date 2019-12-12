const request = require('request');

const geocode = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW1rcm9zIiwiYSI6ImNrM3VoanJlajBkdmIzZW5rbDBhMHE1dXQifQ.tqLpV77yh6QOtLP_MEjp0w&limit=1`;

    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('No se puede conectar al servicio de localizacion', undefined);
        }
        else if(body.features.length === 0){
            callback('No se pudo encontrar esta ubicacion, Intenta otra busqueda', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }

    });
}

module.exports = geocode;