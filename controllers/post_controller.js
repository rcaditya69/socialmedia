const Post=require('../models/post')
const Comment=require('../models/comment')
module.exports.create= async function(req,res){
try{
 let post=await Post.create({
    content:req.body.content,
    user:req.user._id
});


if(req.xhr)
{
   
    return res.status(200).json({
    data:{
        post:post
    },Message: "post created !"
           });
     }
  req.flash('success','post created')
return res.redirect('back')
}
catch(error){
    // console.log('error')
    req.flash('error',error)
    return res.redirect('back')
    
}
}
module.exports.destroy=async function(req,res)
{
    try {
        let post=await Post.findById(req.params.id)
   if(post.user==req.user.id){
    post.remove()
     await Comment.deleteMany({post:req.params.id})
     if(req.xhr)
     {
         return res.status(200).json({
             data:{
                 post_id:req.params.id
             },Message:"post deleted succesfully"
         })
     }
     req.flash('success','post or comment successfully destroyed')
     return res.redirect('back')
}
else{
    res.flash('error','you cannot delete this post')
    return res.redirect('back')
}
 } catch (error) {
    req.flash('error',error)
    return res.redirect('back')   
    } 
}
