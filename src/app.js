const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

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
        title: 'EL CLIMA',
        name: 'Abraham Mtz'
    });
});

app.get('/testLock', (req, res) => { 
 
    let date = Date.now();
    let end = Date.now() + 10000;  
    /* Long Job Operation Simulation */  
    while (date < end) {  date = Date.now()  }  
    res.send('I am done!');
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Acerca de mi',
        name: 'Abraham Mtz'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Ayuda',
        name: 'Abraham Mtz',
        helpText: 'Aqui te ayudamos'
    });
});



app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Debes proporcionar una ubicacion'
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

app.listen(port, ()=> {
    console.log('Server is up on ' + port);
});