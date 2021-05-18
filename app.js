git//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require("lodash");

const homeStartingcontent ="So I was messing around in photoshop, and I went to make a text box and some weird text auto-populated in the box. I thought it was just gibberish at first but I wanted to check so I threw it into google translate(super accurate I know). ";
const aboutcontent ="So I was messing around in photoshop, and I went to make a text box and some weird text auto-populated in the box. I thought it was just gibberish at first but I wanted to check so I threw it into google translate(super accurate I know). ";
const contactcontent ="So I was messing around in photoshop, and I went to make a text box and some weird text auto-populated in the box. I thought it was just gibberish at first but I wanted to check so I threw it into google translate(super accurate I know). ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
    res.render("home", {
        startingContent: homeStartingcontent,
        posts: posts
    });
});

app.get("/about", function(req, res){
    res.render("about", { aboutContent: aboutcontent});
});

app.get("/contact", function(req, res){
    res.render("contact", { contactContent: aboutcontent});
});

app.get("/composs", function(req, res){
    res.render("composs");
});

app.post("/composs", function(req, res){
    const post = {
        title: req.body.newtitle,
        content: req.body.passage
    };

    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postname", function (req, res) {
    const requestedTitle = _.lowerCase(req.params.postname) ;
    
    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title ,
                content: post.content
            });
        }
    });
})

app.listen(4000, function(){
    console.log("server started on port 4000");
});