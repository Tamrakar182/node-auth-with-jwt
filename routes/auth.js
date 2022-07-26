const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validation');
const bcrypt = require('bcryptjs');

//register
router.post('/register', async (req, res) => {

    //validating data before making user
    const { error } = registerValidation(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    //checking if user already exists
    const emailExist = await User.findOne({email: req.body.email});
    if( emailExist ) return res.status(400).send('Email already exists');

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //creates a new user
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id}); 
    } catch(err){
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req,res) => {
    //validating data before logging in user
    const { error } = loginValidation(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    //checking if email exists
    const user = await User.findOne({email: req.body.email});
    if( !user ) return res.status(400).send('Email doesnt exist');

    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    res.send('Logged in Sucessfully');

});

module.exports = router;