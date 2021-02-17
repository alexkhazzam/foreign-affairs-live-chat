const express = require('express');
const router = express.Router();
const Post = require('../../schemas/PostSchema');
const User = require('../../schemas/UserSchema');

router.get('/', (req, res, next) => {});

router.post('/', (req, res, next) => {
  if (!req.body.content) {
    console.log('Content param not sent with request');
    return res.sendStatus(400);
  }

  const postData = {
    content: req.body.content,
    postedBy: req.session.user._id,
  };

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: 'postedBy' }).catch(
        (err) => {
          console.log(err);
          throw err;
        }
      );

      res.status(201).send(newPost);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

module.exports = router;
