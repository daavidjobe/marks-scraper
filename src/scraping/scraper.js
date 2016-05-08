import Xray from 'x-ray';
import webshot from 'webshot';
import fs from 'fs';
import gm from'gm';

let xray = new Xray();

const tags = ['news', 'sport', 'blog', 'tech',
'politics', 'comic', 'entertainment', 'art']


export default class Scraper {
   
    
    constructor(url) {
        this.url = url;
        this.imageId = this._makeId();
    }
    
    _makeId() {
        var text = "";
        var possible = "abcdef0123456789";
        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
 
    fetchText() {
        return new Promise((resolve, reject) => {
           xray(this.url, 'body@text')((err, data) => {
             if(err) reject(err);
             resolve(data);
           });    
        });
    }
    
    createTags(text) {
        let data = text.replace(/\s/gi, "");
        let result = [];
        tags.forEach(tag => {
            if(data.indexOf(tag) != -1) {
                result.push(tag);
            }
        })
        return result;
    }
    
    makeThumbnail() {
        let image = `images/${this.imageId}.png`;
        let tn = `images/${this.imageId}-tn.png`;
        return new Promise((resolve, reject) => {
            webshot(this.url, image, function(err) {
                gm(image)
                    .resize(200, 200)
                    .noProfile()
                    .write(tn, function (err) {
                        if (err) console.log(err);
              
                    });
            });
        });
    }
}