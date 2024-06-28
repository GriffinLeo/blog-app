import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",(req,res) => {
    res.render("index.ejs",{posts});  //post is variable
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});


app.post("/create",(req,res)=>{
    const post = { 
        id:Date.now(),
        title:req.body.title,
        content:req.body.content
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/edit/:id",(req,res) =>{
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render("edit.ejs",{ post });
});


app.post("/edit/:id",(req,res) =>{
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
    res.redirect("/");
});

app.post("/delete/:id",(req,res) =>{
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

