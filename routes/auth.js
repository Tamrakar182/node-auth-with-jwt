const router = require('express').Router();
const { required } = require('@hapi/joi');
const User = require('../model/User');
const { registerValidation } = required('../validation');



router.post('/register', async (req, res) => {

    //validating data before making user
    const { error } = registerValidaton(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    //checking if user already exists
    const emailExist = await User.findOne({email: req.body.email});
    if( emailExist ) return res.status(400).send('Email already exists');

    //creates a new user
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser); 
    } catch(err){
        res.status(400).send(err);
    }
});



module.exports = router;