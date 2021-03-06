const router = require("express").Router();
const Workout = require('../models/workout');

router.get('/api/workouts', async (req, res) => {
    try {
        const workout = await Workout.aggregate([
            {$addFields: { totalDuration: {$sum: '$exercises.duration'}}},
        ])
        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json(err)
    }
    

});

router.put("/api/workouts/:id", async (req,res)=>{
    try {
        const workout = await Workout.findByIdAndUpdate( req.params.id , { $push: { exercises: req.body } }, { new: true })

        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json(err)
        console.error("No workout like that exists!")
    }
})

router.post("/api/workouts",async ({body},res)=>{
    try {
        const workout = await Workout.create({body})

        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/api/workouts/range', async (req, res) => {
    try {
        const workout = await Workout.aggregate([
            {$addFields: {totalDuration: {$sum: '$exercises.duration',},},},
        ]).sort({ 'day': -1 }).limit(7)

        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json(err)
    }
    
});

router.delete('/api/workouts/:id', async ({ body }, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(body._id);

        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;
