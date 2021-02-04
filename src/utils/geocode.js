const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRhbWtka2siLCJhIjoiY2trbzZ0MzF6M3BibjMwb2NwZzR0M3U1bCJ9.98mrC3mA3aly_L_pYSz_Cg' 
    request({url : url, json:true}, (error, response) => {
        if(error) {
            callback('unable to connect')
        } else {
         callback(undefined, {
             latitude: response.body.features[0].center[1],
             longitude: response.body.features[0].center[0],
             location: response.body.features[0].place_name
             
         })
        }
    })
 }

module.exports = geocode