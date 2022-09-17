//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")

const homeStartingContent = "This blog contains tech related posts. This will mainly focus on topics such as full stack development , python development and devops";
const aboutContent = "Hi , My name is Mrigesh Patni. I am a full stack WEB developer and a DevOps enthusiast. I love Exploring different technologies. Currently I am learning AWS and studiying for cloud practitioner exam. This is a blog website where i will be writing blogs about whatever i will be learning. This can act as a notes app for me and to gain quick knowledge about any topic for some others in the internet.";
const contactContent = "You can reach to me at mrigeshpatni9@gmail.com or see the code at my github profile: https://github.com/Mrigesh901";

const app = express();
mongoose.connect("mongodb+srv://mrigesh:Q123w456e789@cluster0.ehrrtxz.mongodb.net/blogdb", {useNewUrlParser:true});


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema)




app.get("/", function(req, res){
  Post.find({}, function(err, posts){

    res.render("home", {
  
      startingContent: homeStartingContent,
  
      posts: posts
  
      });
  
  })
});


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

  // posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postId", function(req, res){
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;
  Post.findOne({_id:requestedPostId},function(err,post){
    res.render("post", {
      title: post.title,
      content: post.content
    })
  })

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);