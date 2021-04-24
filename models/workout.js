const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type:String,
        trim:true,
        required:"Exercise type is required"
    },
    name: {
        type:String,
        trim:true,
        required:"Exercise name is required"
    },
    duration: {
        type:Number,
        required:"Exercise duration is required"
    },
    weight: {
        type:Number
    },
    sets: {
        type:Number
    },
    reps: {
        type:Number
    },
    distance: {
        type:Number
    }
})

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [exerciseSchema]
})
const Exercise = mongoose.model("Exercise", exerciseSchema)
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = {Workout, Exercise};