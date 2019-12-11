const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicPathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup static directory to serve
app.use(express.static(publicPathDirectory));

//Setup handlebars and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Abraham Mtz'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Abraham Mtz'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Abraham Mtz',
        helpText: 'Help message'
    });
});

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{        
        if (error){
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                });
            }   
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });   
          })
    });
});

app.get('/products', (req, res)=>{
    if(!req.query.serach){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Abraham Mtz',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Abraham Mtz',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, ()=> {
    console.log('Server is up on 3000.');
});