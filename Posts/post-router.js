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

router.put('/:id', async (req, res) => {
    try {
        const post = req.body;
        const { id } = req.params;

        if (!post.title || !post.contents) {
            return res.status(400).json({
                message: 'Error, please provide title and content for post update'
            });
        } else if (!id) {
            return res.status(404).json({
                message: 'Error, the post with the specified id could not be found'
            });
        }

        const updatePost = await Posts.update(req.params.id, req.body);
        return res.status(201).json(updatePost)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error updating the post'
        });
    }
});

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then( comments => {
            res.status(200).json(comments);
        })
        .catch( error => {
            res.status(500).json(error)
        });
});

router.post('/:id/comments', async (req, res) => {
   try { 
    const post_id = req.params.id;
    const { text } = await req.body;

    if(!text) {
        return res.status(400).json({ 
            message: 'please provide text'
        })
    } else if( !post_id) {
        return res.status(400).json({
            message: 'the specified id does not exist'
        })
    }
    const newComment = await Posts.insertComment({ text, post_id});
    return res.status(201).json(newComment)

   } catch (error) {
       res.status(500).json(error)
   };
});



module.exports = router;
