const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
 fullName: {
   type: String,
   required: true
 },
 yearGroup: {
   type: String,
   required: true
 },
 PhoneNumber: {
   type: String,
   required: true
 },
 CurrentAddress: {
   type: String,
   required: true
 },
 EmailAddress: {
   type: String,
   required: true
 },
 Password: {
   type: String,
   required: true
 },
 password_confirmation: {
   type: String,
   required: true
 },
 isAdmin: {
   type: Boolean,
   default: false
 }
});

module.exports = mongoose.model("User", userSchema);
