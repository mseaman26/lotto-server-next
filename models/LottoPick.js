import mongoose from 'mongoose';
import User from './User';

const LottoPickSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
        unique: false,
    },
    numbers: {
        type: [Number],
        default: [],
        required: true,
        unique: false,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false,
    },
    drawDate: {
        type: Date,
        required: true,
        unique: false,
    },
}, { timestamps: true });

export default mongoose.models.LottoPick || mongoose.model('LottoPick', LottoPickSchema);

