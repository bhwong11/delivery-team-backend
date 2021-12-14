const {User,MessageBoard,Post} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req,res)=>{
    try{
        const foundUsername = await User.findOne({username:req.body.username})
        if(foundUsername){
            return res.status(400).json({
                status:400,
                message:'A user with that username already exist'
            })
        }

        const foundUserEmail = await User.findOne({email:req.body.email})
        if(foundUserEmail){
            return res.status(400).json({
                status:400,
                message:'A user with that email already exist'
            })
        }


        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt)
        const createdUser = await User.create({
            ...req.body,
            password:hash,
        })
        const token = jwt.sign({_id:createdUser._id},process.env.SECRET,{
            expiresIn:'1d',
        })

        //CREATE WAY FOR USER TO AUTO BE ADDED TO COMPANY AND CITY MESSAGE BOARD
        //if the message board for city doesn't exist make one
        //auto post message

        //join company message board for when user joins in, create one if it doesn't exist
        let companyMessageBoard = await MessageBoard.findOne({company:req.body.company})
        if(!companyMessageBoard){
            companyMessageBoard = await MessageBoard.create({
                name:req.body.company,
                category:'company',
                users:[createdUser._id]
            })
        }else{
            await MessageBoard.updateOne({_id:companyMessageBoard._id},{$push: {users: createdUser._id}},done)
        }
        await User.updateOne({_id:createdUser._id},{$push: {messageBoards: companyMessageBoard._id}},done)

        //join city message board for when user joins in, create one if it doesn't exist
        let cityMessageBoard = await MessageBoard.findOne({city:req.body.city})
        if(!cityMessageBoard){
            cityMessageBoard = await MessageBoard.create({
                name:req.body.city,
                category:'city',
                users:[createdUser._id]
            })
        }else{
            await MessageBoard.updateOne({_id:cityMessageBoard._id},{$push: {users: createdUser._id}},done)
        }
        await User.updateOne({_id:createdUser._id},{$push: {messageBoards: cityMessageBoard._id}},done)
        

        return res.status(200).json({
            status:200,
            message:'success',
            user:createdUser,
            token,
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:500,
            message:err,
        })
    }
}

const login = async (req,res)=>{
    try{
        const foundUser = await User.findOne({username:req.body.username}).select('+password')
        if(!foundUser){
            return res.status(400).json({
                status:400,
                message:'Password or Username is incorrect',
            })
        }
        const isMatch = await bcrypt.compare(foundUser.password,req.body.password)
        if(isMatch){
            const token = jwt.sign({_id:foundUser._id},process.env.SECRET,{
                expiresIn:'1d',
            })
            return res.status(200).json({
                status:200,
                message:'success',
                user:foundUser,
                token,
            })
        }else{
            return res.status(400).json({
                status:400,
                message:'Password or Username is incorrect',
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:500,
            message:err,
        })
    }
}

module.exports = {
    register,
    login,
}