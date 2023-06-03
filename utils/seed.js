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

  thoughts.push({
    thoughtText: "this is a test thought",
    username: "bob",
    reactions: reactions,
  });

  // Add thoughts to the collection and await the results
  const thoughtsResult = await Thought.collection.insertMany(thoughts);

  const thoughtIds = [];
  for (const index in thoughtsResult.insertedIds) {
    thoughtIds.push(thoughtsResult.insertedIds[index]);
  }

  // Create empty array to hold the users
  const users = [];

  users.push({
    username: "bob",
    email: "bob@mail.com",
    thoughts: thoughtIds,
  });

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
  
});
