const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const plantSchema = new Schema({

    name: {
        type: String,
        required: true, 
        trim: true
    }, 
    
    species: {
        type: String,
        required: true,
        trim: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    waterFrequency: {
        type: String,
        required: true
    },

    sunlightNeeds: {
        type: String,
        required: true
    },
    
    image: {
        type: String,
        required: true
    },

    /*
    _id: Schema.Types.ObjectId,
    plantId: { type: String, required: true },
    userId: { type: String, required: true },
    nickname: { type: String },
    description: { type: String },
    name: { type: String, required: true },
    image: { type: String, required: true },
    waterReminder: { type: String, required: true },
    sunlightNeeds: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' } */
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;