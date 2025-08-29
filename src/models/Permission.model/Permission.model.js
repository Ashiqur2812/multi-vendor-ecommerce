const { Schema, model } = require("mongoose");

const permissionSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name must be required'],
      index: true
    },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Permission = model("Permission", permissionSchema);
module.exports = Permission;
