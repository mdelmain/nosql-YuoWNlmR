const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 16
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: formatDate
    },
    username: {
        type: String,
        required: true,
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

function formatDate(date){
    if (date) return date.toISOString().split("T") [0];
}
const Thought = model('thought', thoughtSchema);

module.exports = Thought;