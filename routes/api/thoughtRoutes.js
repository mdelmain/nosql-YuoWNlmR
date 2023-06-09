const { Thought, User } = require("../../models");

const router = require("express").Router();

// GET all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought
router.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.id });

    if (!thought) {
      res.status(404).json({ message: "No thought found with that id!" });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json({ message: "No user found with that username!" });
      return;
    }

    const thought = await Thought.create(req.body);

    await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: "No thought with this id" });
      return;
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.id });

    if (!thought) {
      res.status(404).json({ message: "No thought with this id" });
      return;
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body }},
      { new: true },
    );

    if (!thought) {
      res.status(404).json({ message: "No thought with this id!" });
      return;
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true },
      );
      
      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
        return;
      }
  
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
