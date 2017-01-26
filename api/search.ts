import * as express from 'express';
import Dream from '../models/dream';

let router = express.Router();

router.get('/', (req, res) => {
  let searchTxt = req.query.searchTxt;
  let username = req.query.username;
  Dream.find({username: username,"$text":{"$search":searchTxt}}).then((dreams) => {
    res.json(dreams);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.get('/userDreams', (req, res) => {
  let username = req.query.username;
  Dream.find({username:username}).then((dreams) => {
    res.json(dreams);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
})

export default router;
