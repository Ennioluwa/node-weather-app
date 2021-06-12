const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZW5pb2x1d2EiLCJhIjoiY2tvbGp1aHNxMDQzbDJubDZmYjYxdTlkNiJ9.e2wpUtozbk-yroWGTFxOHA'
    request( {url, json: true}, (error, response) => {
        const {features} = response.body
        if (error) {
            return callback('Not connected to the internet', undefined);
        }
        else if (response.body.features.length === 0) {
            return callback('Invalid location. Please input a valid location', undefined);
        }
        else {
            callback(undefined, 
                {
                    longitude: features[0].center[0],
                    latitude: features[0].center[1],
                    location: features[0].place_name
            });
        }
    })

}

module.exports = geocode