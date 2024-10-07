// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
    }
    next();
});

UserSchema.methods.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
