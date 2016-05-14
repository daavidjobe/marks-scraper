import express from 'express';
import Scraper from './scraping/scraper';

let app = express();

const PORT = process.env.PORT || 8181


app.get('/scraper/thumbnail', (req, res) => {
  let url = req.query.url;
  let scraper = new Scraper(url);
  let responseData = {};
  scraper.makeThumbnail().then(base64 => {
    responseData.thumbnail = base64;
    res.json(responseData);
  }).catch(err => res.json(err));
});

app.get('/scraper/data', (req, res) => {
  let url = req.query.url;
  let scraper = new Scraper(url);
  let responseData = {};
  scraper.fetchKeywords().then(keywords => {
    responseData.data = keywords;
    res.json(responseData);
  }).catch(err => res.json(err));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});