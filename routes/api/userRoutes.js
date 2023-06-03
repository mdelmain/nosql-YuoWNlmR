const { User } = require('../../models');

const router = require('express').Router();

// GET all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET a single user
router.get('/:id', async (req, res) => {
    try {
  
      const user = await User.findOne({ _id: req.params.id });
     
      if (!user) {
        res.status(404).json({ message: 'No user found with that id!' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;