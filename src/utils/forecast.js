const request = require('request')
const express = require('express')

const forecast = (a, b, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=87f8195a13763190223bd92ce705f21d&query=' + a + ',' + b
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            console.log('unable to connect')
        } else if (response.body.error) {
            console.log(url)
            console.log('unable to find location')
        } else {
            callback(undefined, {
                weather_descriptions: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                precip: response.body.current.precip
            })
        }
    })
}    
module.exports = forecast