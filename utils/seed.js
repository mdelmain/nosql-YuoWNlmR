const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  const reactions = [];

  reactions.push({
    reactionBody: "this is a reaction",
    username: "bob",
  });

  const thoughts = [];

  thoughts.push(
    {
      thoughtText: "this is a test thought",
      username: "bob",
      reactions: reactions,
    },
    {
      thoughtText: "this is another test thought",
      username: "antonio",
      reactions: reactions,
    }
  );

  // Add thoughts to the collection and await the results
  const bobThoughtResult = await Thought.collection.insertOne(thoughts[0]);
  const antonioThoughtResult = await Thought.collection.insertOne(thoughts[1]);

  // Add users to the collection and await the results
  const antonioUserResult = await User.collection.insertOne({
    username: "antonio",
    email: "antonio@mail.com",
    thoughts: [antonioThoughtResult.insertedId],
    friends: [],
  });

  await User.collection.insertOne({
    username: "bob",
    email: "bob@mail.com",
    thoughts: [bobThoughtResult.insertedId],
    friends: [antonioUserResult.insertedId],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);ß
});
