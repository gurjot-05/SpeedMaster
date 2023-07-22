const axios = require('axios');

const uri = "http://api.quotable.io/random";

module.exports = getdata = () => {
    return axios.get(uri).then(response => response.data)
}