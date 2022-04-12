const router = require('express').Router();
const NewsAPI = require('newsapi');

router.get('/', async (req, res) => {
    const newsapi = new NewsAPI(process.env.API_KEY);
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1
const day = dateObj.getUTCDate() - 7
const year = dateObj.getUTCFullYear()
let date = `${year}-${month}-${day}`
console.log(date)
newsapi.v2.everything({
  q: 'finance, personal',
  from: date,
  language: 'en',
  sortBy: 'relevancy'
}).then(response => {
  res.json(response);
}).catch(err => {console.log(err)})
})

module.exports = router;