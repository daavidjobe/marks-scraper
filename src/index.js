import express from 'express';
import Scraper from './scraping/scraper';

let app = express();

const PORT = process.env.PORT || 8181

app.get('/scraper', (req, res) => {
  let url = 'https://aftonbladet.se/';
  let scraper = new Scraper(url);
  let responseData = {}; 
  scraper.fetchText()
  .then(data => scraper.createTags(data))
  .then(tags => {
    responseData.tags = tags;
    scraper.makeThumbnail();
    res.send('marks scraper');
  })
  .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});