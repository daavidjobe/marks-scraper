import express from 'express';
import Scraper from './scraping/scraper';

let app = express();

app.get('/', (req, res) => {
  Scraper.fetchHtml('https://facebook.com', (data) => {
      console.log(data);
      res.send(data);
  })
});

app.listen(8181, () => {
  console.log('listening on port 8181');
});