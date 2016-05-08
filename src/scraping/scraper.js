import Xray from 'x-ray';

let xray = new Xray();

export default {
    
    fetchHtml(url, cb) {
        xray(url, 'body@html')((err, data) => {
            if(err) throw Exception('could not fetch html ', err);
            cb(data);
        })
    }
}