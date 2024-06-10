import mongoose from 'mongoose'

const ResetTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
  });
  
  const ResetToken = mongoose.model('ResetToken', ResetTokenSchema);
  export default ResetToken;