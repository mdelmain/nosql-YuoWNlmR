const router = require('express').Router();

// GET all thoughts
router.get('/', async (req, res) => {
    try {
      const thoughts = [];
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // GET a single thought
router.get('/:id', async (req, res) => {
    try {
  
      const thought = {};
     
      if (!thought) {
        res.status(404).json({ message: 'No thought found with that id!' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;