const {User,MessageBoard,Post,PersonalPost} = require('../models');

const index = async(req,res)=>{
    try{
        const allPersonalPost = await PersonalPost.find({});
        return res.status(200).json({
            status:200,
            message:'success',
            personalPosts:allPersonalPosts,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:500,
            message:'internal server error'
        })
    }
}

const create = async(req,res)=>{
    try{
        const newPersonalPost = await PersonalPost.create({
            title:req.body.title,
            content:req.body.content,
            user: req.userId,
        })

        if(!newPersonalPost){
            return res.status(500).json({
                status:500,
                message:'unable to create user',
            })
        }

        return res.status(200).json({
            status:200,
            message:'success',
            personalPost:newPersonalPost,
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            status:500,
            message:'internal server error'
        })
    }
}

const show = async(req,res)=>{
    try{
        const foundPersonalPost = await PersonalPost.findById(req.params.id).populate('user').exec((err, user) => {
            console.log("Populated PersonalPost " + user);
          })
        if(foundPersonalPost){
            return res.status(200).json({
                status:200,
                message:'success',
                personalPost:foundPersonalPost,
            })
        }else{
            return res.status(400).json({
                status:400,
                message:'No Post with that id was found',
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:500,
            message:'internal server error'
        })
    }
}

const update = async(req,res)=>{
    try{
        const updatedPersonalPost = await PersonalPost.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('user').exec((err, user) => {
            console.log("Populated PersonalPost " + user);
          })
        if(!updatedPersonalPost){
            return res.status(400).json({
                status:400,
                message:'could not find personal post with that id',
            })
        }
        return res.status(200).json({
            status:200,
            message:'success',
            personalPost:updatedPersonalPost,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:500,
            message:'internal server error'
        })
    }
}

const destroy = async(req,res)=>{
    try{
        const deletedPersonalPost = await PersonalPost.findByIdAndDelete(req.params.id)
        if(!deletedPersonalPost){
            return res.status(400).json({
                status:400,
                message:'could not find user with that id',
            })
        }
        return res.status(200).json({
            status:200,
            message:'success',
            personalPost:deletedPersonalPost,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:500,
            message:'internal server error'
        })
    }
}

module.exports ={
    create,
    index,
    show,
    update,
    destroy,
}