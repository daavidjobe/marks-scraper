import express from 'express';
import Scraper from './scraping/scraper';

let app = express();

const PORT = process.env.PORT || 8181

app.get('/scraper', (req, res) => {
  let url = req.query.url;
  let scraper = new Scraper(url);
  let responseData = {}; 
  scraper.fetchText()
  .then(data => {
    responseData.tags = scraper.createTags(data);
    scraper.makeThumbnail().then(base64 => {
      responseData.thumbnail = base64;
      res.json(responseData);
    }).catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});