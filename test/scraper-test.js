import chai, {expect} from 'chai';
import Scraper from '../src/scraping/Scraper';

describe('Scraper', () => {

  let scraper = new Scraper('http://mashable.com');
  let fetchedText = '';

  it('should make image identifier', () => {
    expect(scraper.imageIdentifier).to.be.a('string')
  });

  it('should fetch text from site', (done) => {
    scraper.fetchText()
      .then(text => {
        expect(text).to.have.string('Mashable');
        fetchedText = text;
        done();
      })
  });

  it('should create tags', () => {
    let tags = scraper.createTags(fetchedText);
    expect(tags).to.be.a('array');
    expect(tags).to.have.length.above(3);
  });
  
  it('should extract meta tags', (done) => {
    scraper.fetchKeywords()
      .then(metas => {
        expect(metas).to.be.a('string');
        done();
        console.log(metas);
      })
  })

})