import mongoose from 'mongoose';

const LottoPickSchema = new mongoose.Schema({
    numbers: {
        type: [Number],
        default: [],
        required: true,
        unique: false,
    },
    drawingDate: {
        type: String,
        required: true,
        default: '',
        unique: false,

    }
}, { timestamps: true });

export default mongoose.models.LottoPick || mongoose.model('LottoPick', LottoPickSchema);

