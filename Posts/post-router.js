const Posts = require('../Posts/db.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error retrieving the posts'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
          res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    }
});

router.post('/', async (req, res) => {
    try {
      const post = await Posts.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0 ) {
            res.status(200).json({ message : 'The post have been nuked'});
        } else {
            res.status(404).json({ message : 'The post could not be found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error removing the hub'
        });
    }
});



module.exports = router;
