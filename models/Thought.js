const { Schema, Types, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate,
  },
});
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 16,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function (){
    return this.reactions.length;
  });

function formatDate(date) {
  if (date) return date.toISOString().split("T")[0];
}

const Reaction = model("reaction", reactionSchema);
const Thought = model("thought", thoughtSchema);

module.exports = { Reaction, Thought };