const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought'
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const User = model('user', userSchema);

module.exports = User;