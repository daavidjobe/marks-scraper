import Xray from 'x-ray';
import webshot from 'webshot';
import fs from 'fs';
import gm from'gm';
import 'gm-base64';

let xray = new Xray();

const tags = ['news', 'sport', 'blog', 'tech',
  'politics', 'comic', 'entertainment']
  
const thumbnailDimensions = {
  width: 170,
  height: 100
}

export default class Scraper {

  constructor(url) {
    this.url = url;
    this.imageIdentifier = this._createImageIdentifier();
  }

  _createImageIdentifier() {
    var id = "";
    var possible = "abcdef0123456789";
    for (var i = 0; i < 5; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    return id;
  }

  fetchText() {
    return new Promise((resolve, reject) => {
      xray(this.url, 'body@text')((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
  
  fetchKeywords() {
      return new Promise((resolve, reject) => {
        xray(this.url, {
        metatags: xray('meta', [{
          name: '@name',
          description: '@content'
        }]),
        meta: 'meta'
        })((err, data) => {
          if (err) reject(err);
          let keywords = data.metatags.filter(d => d.name === 'keywords');
          console.log(keywords[0].description);
          resolve(keywords[0].description.split(','));
        })
      })
  }

  createTags(text) {
    let data = text.replace(/\s/gi, "");
    let result = [];
    tags.forEach(tag => {
      if (data.indexOf(tag) != -1) {
        result.push(tag);
      }
    })
    return result;
  }
  
  _makeScreenshot() {
    return new Promise((resolve, reject) => {
      webshot(this.url, `images/${this.imageIdentifier}.png`, (err) => {
        if (err) reject(err);
        resolve();
      })
    })
  }

  makeThumbnail() {
    let image = `images/${this.imageIdentifier}.png`;
    let tn = `images/${this.imageIdentifier}-tn.png`;
    return new Promise((resolve, reject) => {
      this._makeScreenshot().then(() => {
        gm(image).resize(thumbnailDimensions.width, thumbnailDimensions.height).noProfile()
          .toBase64('bmp', function(err, base64){
            if (err) reject(err);
            resolve(base64);
          })
      }).catch(err => console.log(err));
    });
  }
  
  _cleanup(image, thumbnail) {
    fs.unlink(image);
    fs.unlink(thumbnail);
  }
  
  
}