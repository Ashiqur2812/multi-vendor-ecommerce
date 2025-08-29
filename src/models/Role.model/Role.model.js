const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name must be required'],
    },
    description: {
      type: String,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Role = model("Role", roleSchema);

module.exports = Role;
