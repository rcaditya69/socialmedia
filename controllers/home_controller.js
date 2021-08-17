const Post=require('../models/post')
const User = require('../models/user')
const user=require('../models/user')
module.exports.home =async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    // Post.find({},function(error,posts){
    // return res.render('home', {
    //     title: "CODEIAL /Home",
    //      posts:posts
    // })
    // })
    try {
        let posts=await Post.find({}).
    populate('user')
    .sort('-createdAt')
    .populate({
        path:'comment',
        populate:{
            path:'user'
        }
    })
    
    
       let users=await User.find({})
        
       return res.render('home', {
        title: "CODEIAL /Home",
         posts:posts,
         all_users:users
    })
        
    } catch (error) {
        console.log('error')
        return;
    }
}
