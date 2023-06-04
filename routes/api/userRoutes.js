const { User } = require("../../models");

const router = require("express").Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate("thoughts")
      .populate({
        path: "friends",
        populate: {
          path: "thoughts",
          model: "thought",
        },
      });

    if (!user) {
      res.status(404).json({ message: "No user found with that id!" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!userData) {
      res.status(404).json({ message: "No user with this id" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }

    res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
