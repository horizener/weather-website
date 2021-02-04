const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')

const hbs = require('hbs')


const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)


app.set('view engine', 'hbs')
app.set('views', viewsPath)


app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'andrew mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    geocode(req.query.address, (error, geoData) => {
        if(error) {
            return res.send({
                error
            })
    
        }
        
        forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                
                // temperature: forecastData.current.temperature
                location: geoData.location,
                data: forecastData
            })
    
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {

        title: 'help',
        name: 'Andrew Mead'
    })
})

app.get('/help/*', (req, res) => {
    res.render('page-error', {
        title: 'page-error',
        message: 'page not found'
    })

    // res.send('help article not found')
})

app.get('*', (req, res)=> {
    res.render('error')
    // res.send('my 404 page')
})


app.listen(3000, ()=> {
    console.log('server is up on port 3000')
})