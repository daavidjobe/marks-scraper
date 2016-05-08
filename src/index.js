import express from 'express';
import Scraper from './scraping/scraper';

let app = express();

app.get('/', (req, res) => {
  let url = 'https://aftonbladet.se/';
  let scraper = new Scraper(url);
  let responseData = {}; 
  scraper.fetchText()
  .then(data => scraper.createTags(data))
  .then(tags => {
    responseData.tags = tags;
    scraper.makeThumbnail();
    res.send(responseData);
  })
  .catch(err => console.log(err));
});

app.listen(8181, () => {
  console.log('listening on port 8181');
});