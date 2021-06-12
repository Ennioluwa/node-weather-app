const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=0518c5dde82942d342a13d07a845e94f&query='+ longitude +',' + latitude
    request( {url, json: true}, (error, {body}) => {
        const {current, errorM} = body
        if (error) {
            callback('Not connected to the internet', undefined);
        }
        else if (errorM) {
            callback('Invalid coordinates. Please input a valid coordinate', undefined)
        }
        else {
            callback(undefined, current.weather_descriptions[0] + ". It is currently "+ current.temperature+ " degrees out" + ", but it feels like "+ current.feelslike+ " degrees out.");
        }
    })

}

module.exports = forecast