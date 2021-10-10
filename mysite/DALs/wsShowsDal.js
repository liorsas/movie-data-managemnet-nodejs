const axios = require('axios');

function getShowsData() {

    return axios.get('https://api.tvmaze.com/shows')
}
module.exports = getShowsData