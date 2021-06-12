const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const pathname = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

console.log(viewsPath);
app.use(express.static(pathname))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=> {
    res.render('index', {
        title: "Homepage",
        name: "Arowo Enioluwa"
    })
})
app.get('/about', (req, res)=> {
    res.render('about', {
        title: "About me",
        name: "Arowo Enioluwa"
    })
})
app.get('/help', (req, res)=> {
    res.render('help', {
        title: "Help Page",
        name: "Arowo Enioluwa"
    })
})
app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const location = req.query.address
    geocode(location, (error, {longitude, latitude, location}={})=> {
        if (error) {
            return res.send({
                error
            });
        }
        forecast (longitude, latitude, (error, forecastData)=> {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location: location
            })
        })
        
    })
        
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMessage: 'This page does not exist'
    })
})
app.listen('3000', () => {  
    console.log('Listening on port 3000');
})
console.log(__dirname);
console.log(path.join(__dirname,'../', '/public/index.html' ));