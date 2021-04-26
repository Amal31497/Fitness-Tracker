const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", async(req,res)=>{
    
    try {
        const workout = await db.Workout.find({}).sort({_id:-1}).limit(1);
        res.json(workout)
    } catch (err) {
        res.status(500).json(err)
    }

})

router.put("/api/workouts/:id", async (req,res)=>{
    try {
        const workout = await db.Workout.findByIdAndUpdate( req.params.id , { $push: { exercises: req.body } }, { new: true })

        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json(err)
        console.error("No workout like that exists!")
    }
})

router.post("/api/workouts",async ({body},res)=>{
    try {
        const workout = await db.Workout.create({body})

        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json(err)
    }
})

// router.get("/api/workout/range", async(req,res)=>{

// })

module.exports = router;
