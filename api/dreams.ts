import * as express from 'express';
import Dream from '../models/dream';

let router = express.Router();

router.get('/publicDreams', (req, res) => {
  console.log("hello");
  Dream.find({pvt:false}).then((dreams) => {
  //  console.log(dreams);
    res.json(dreams);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});


router.get('/', (req, res) => {
  let username = req.query.username;
  Dream.find({username:username}).then((dreams) => {
    res.json(dreams);
  }).catch((err) => {
    console.log(err);
    res.status(500);
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Dream.findById(id).then((dream) => {
    res.json(dream);
  }).catch((err) => {
    res.status(400);
  });
});

router.post('/', (req, res) => {
  let obj = req.body;
  Dream.create(obj).then((newDream) => {
    res.json({message:'Dream saved.'});
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

router.post('/:id',(req, res) => {
  let id= req.params.id;
  Dream.findById(id).then((dream) => {
    dream.dreamDate = req.body.dreamDate;
    dream.content = req.body.content;
    dream.title = req.body.title;
    dream.nightmare = req.body.nightmare;
    dream.lucid = req.body.lucid;
    dream.recurring = req.body.recurring;
    dream.emotions = req.body.emotions;
    dream.pvt = req.body.pvt;
    dream.role = req.body.role;
    dream.comments = req.body.comments;
    dream.save().then((updatedDream) => {
      res.json(updatedDream);
    }).catch((err) => {
      res.status(500);
      console.log(err);
    });
  });
});


export default router;
