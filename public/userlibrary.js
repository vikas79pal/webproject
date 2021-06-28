// importing a mongoose
// const mongoose =require("mongoose");

// const { number } = require("prop-types");
// var db=mongoose.connect('mongodb+srv://VIKAS:vikas@cluster0.37n8w.mongodb.net/demo?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true},()=>{
//     console.log("connected to database")
// })

// var schema1 =mongoose.Schema({
//     title:String,
//     author:String,
//     isbn:Int16Array

// })

// var books=mongoose.model("books",schema1);

var tb = document.getElementById('tb');
const form = document.getElementById('books');




// searching for books by name of author,book.

const searchf = document.getElementById('search-f').getElementsByTagName('input')[0];

searchf.addEventListener('keyup', (e) => {
// console.log(document.getElementById('tb').children[0].children.length)
console.log((document.getElementById('tb').children[0].children[ 1+ 1].children[0].textContent).indexOf(searchf.value) > -1)

    // filter books according to the search box input("value")   
    for (let i = 1; i < document.getElementById('tb').children[0].children.length; i++) {
        if ((document.getElementById('tb').children[0].children[i].children[0].textContent.toLowerCase()).indexOf(searchf.value.toLowerCase()) > -1) {
            document.getElementById('tb').children[0].children[i].style.display = "";

        }
        else {
            document.getElementById('tb').children[0].children[i].style.display = 'none';

        }

    }
});

// let title = document.getElementById('title').value;
// let author = document.getElementById('Author').value;
// let isbn = document.getElementById('ISBN#').value;

// console.log(title,author,isbn,"hh")
// const home=document.getElementById('home')
// home.addEventListener("click",()=>{
//     console.log("clicked")
//     window.location.href="login.ejs"
// })

const logout=document.getElementById('logout')
logout.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="login.ejs"
})

const home=document.getElementById('home')
home.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="/"
})
