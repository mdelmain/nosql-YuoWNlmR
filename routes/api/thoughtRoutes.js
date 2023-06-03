const { Thought } = require('../../models');


const router = require('express').Router();

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // GET a single thought
router.get('/:id', async (req, res) => {
    try {
  
        const thought = await Thought.findOne({ _id: req.params.id });
     
      if (!thought) {
        res.status(404).json({ message: 'No thought found with that id!' });
        return;
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;