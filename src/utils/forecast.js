const request = require('request');

const forecast = (latitud, longitud, callback) => {
    const url = `https://api.darksky.net/forecast/d99108d7e7a92546be7d112ff2d5d89f/${latitud},${longitud}`;
    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to the weather service', undefined);
        } else if(body.error){
            callback('unable to find location', undefined);
        }
        else{
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} % chance of rain`);            
        }
    });
}

module.exports = forecast;

