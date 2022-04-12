const router = require('express').Router();
const NewsAPI = require('newsapi');

router.get('/', async (req, res) => {
    const newsapi = new NewsAPI(process.env.API_KEY);
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  q: 'bitcoin',
  category: 'business',
  language: 'en',
  country: 'us'
}).then(response => {
  res.json(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
}).catch(err => {console.log(err)})
})

module.exports = router;