import * as express from 'express';
import * as request from 'request';
import * as cheerio from 'cheerio';

let router = express.Router();

router.get('/Interpret', (req, res) => {
  let symbol = req.query.symbol;
  let url = "http://cafeausoul.com/dreams/dreamdictionary/" + symbol;
  request(url, (error, response, html) => {
    if(!error){
      let $ = cheerio.load(html);
      let label, description;
      let labelTxt = $('.dictionary_results').children('h4').text();
      let desc = $('.dictionary_results_content').children('p').text();
      console.log(labelTxt  + "  " + desc);
      if(labelTxt !== "" && desc !== ""){
        let json = {
          label: labelTxt,
          content: desc
        };
        res.json(json);
      }else{
        console.log("sorry");
        res.status(404).json({message: "Sorry, no results found."});
      }
    }else{
      console.log(error);
      res.status(500);
    }
  });
});

export default router;
