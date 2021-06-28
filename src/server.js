// importing an express module
const mongoose=require("mongoose")

const express=require("express");
const { number } = require("prop-types");

// importing express-session
var session=require("express-session");
var cookieParser=require("cookie-parser");

// storing session into db
var MongoSession = require("connect-mongodb-session")(session);




// importing bcrypt for hashing the password
const bcrypt=require("bcrypt");

// initiating an express object

const app =express();
const port=process.env.PORT || 8000;
// useremail=[{user: "vika@jsj",pass:"jdsnj"}]

// importing mongoose
// const mongoose=require("mongoose");

//connecting to the database
var db=mongoose.connect('mongodb+srv://VIKAS:vikas@cluster0.37n8w.mongodb.net/real?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true},()=>{
    console.log("connected to database")
})

const store= new MongoSession({
    uri:"mongodb+srv://VIKAS:vikas@cluster0.37n8w.mongodb.net/real?retryWrites=true&w=majority",
    collection:"Session"
})
//creating registered Schema

// var schema =mongoose.Schema({
    
//     username:String,
//     useremail:String,
//     password:String
    
// })
var schema =mongoose.Schema({
    
    firstname:String,
    lastName:String,
    gender:String,
    country:String,
    mobile:String,
    useremail:String,
    password:String
    
})



// converting a schema into a model
var register=mongoose.model("Register",schema);


var schema1 =mongoose.Schema({
    title:String,
    author:String,
    isbn:Number,
    link:String

})

var books=mongoose.model("books",schema1);

// admin page schema
var adminschema=mongoose.Schema({
    useremail:String,
    password:String
})

var adminmod=mongoose.model("Admin",adminschema)
// var admin1=new adminmod({useremail:"vikas@123",password:"1234"})
// admin1.save()

//fetching or excessing form 
app.use(express.urlencoded({extended:false})) 

// routing 

// set template engine "ejs"
app.set("view engine","ejs");

//adding style to ejs file by first creating a public folder and then making it static

app.use(express.static("public"))

// app.get("./views/libraryuser.ejs",(req,res)=>{
//     res.render("./views/libraryuser.ejs")
// })

// app.use(cookieParser())
app.use(session({
    key:"user_email",
    secret:"secerts",
    resave:false,
    saveUninitialized:false,
    store: store,
    cookie:{
        maxAge:60000
    }
}))

app.get("/login.ejs",(req,res)=>{
    res.render('login.ejs')
})  
var isAuthAdmin=(req,res,next)=>{
    if(req.session.isAuth==true){
        next()
    } else{
        res.redirect("admin.ejs")
    }
}

var isAuthUser=(req,res,next)=>{
    if(req.session.isAuthUser==true){
        next()
    } else{
        res.redirect("login.ejs")
    }
}



app.get("/",(req,res)=>{
    
   
    res.render('index.ejs')
    
})
app.get("/aboutus.ejs",(req,res)=>{
    res.render('aboutus.ejs')
})


app.get("/libraryuser.ejs",isAuthAdmin,(req,res)=>{
     books.find({},(err,data)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log(data)
            res.render("libraryuser.ejs",{datas:data})
        }   
    })


    // res.render("libraryuser.ejs")
    // res.render("libraryuser.ejs",{datas:data})
})

//admin page
app.get("/admin.ejs",(req,res)=>{
    
    res.render('admin.ejs')
})


app.get("/register.ejs",(req,res)=>{
    res.render('register.ejs')
})

// userlibrary page
app.get("/userlibrary.ejs",isAuthUser,(req,res)=>{
    books.find({},(err,data)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log(data)
            res.render("userlibrary.ejs",{datas:data})
        }   
    })

})



msg=""
var loginFlag=0;
var usercorrect=0


app.post("/login.ejs", async (req,res)=>{
    console.log(req.body.useremail,req.body.pass)
    

    try{
       const email=await register.findOne({useremail:req.body.useremail}).catch(()=>{
       });
       console.log(email)
       console.log("entered email",req.body.useremail,"entered")
       let checkpass= await bcrypt.compare(req.body.pass,email.password)
      
       if (checkpass){
            console.log('u haved logged in')
            loginFlag=1
            req.session.isAuthUser=true;
            req.session.isAuth=false
           
            // res.render('libraryuser.ejs')
            // res.render("login.ejs")
            books.find({},(err,data)=>{
                if (err){
                    console.log(err)
                }
                else{
                    console.log(data)
                    req.session.isAuthuser=true;
                    console.log(req.session)
                    res.render("userlibrary.ejs",{datas:data})
                }   
            })

       }
       else if (req.body.useremail==email.useremail){
        usercorrect=1
       }


        }
        catch(e){
        
            res.render('login',{msg:"You have not registered"})

        }


    if (usercorrect==1){
        usercorrect=0;
        res.render('login',{msg:"password incorrect"})

    }
   
})

// post request for admin

app.post("/admin.ejs", async (req,res)=>{
    console.log(req.body.useremail,req.body.pass)
    

    try{
        adminmod.find({},(err,data)=>{
            console.log(data,"h")
        })
       const email=await adminmod.findOne({useremail:req.body.useremail}).catch(()=>{
       });
       console.log(email.password,"hii")
       console.log("entered email",req.body.useremail,"entered")
       let checkpass= email.password==req.body.pass;
       console
       if (checkpass){
            console.log('u haved logged in')
            loginFlag=1
            req.session.isAuth=true 
            req.session.isAuthUser=false;
            
           
            // res.render('libraryuser.ejs')
            // res.render("login.ejs")
            // books.find({},(err,data)=>{
            //     if (err){
            //         console.log(err)
            //     }
            //     else{
            //         console.log(data)
            //         res.render("libraryuser.ejs",{datas:data})
            //     }   
            // })
            res.redirect("libraryuser.ejs")

       }
       else if (req.body.useremail==email.useremail){
        usercorrect=1
       }


        }
        catch(e){
        
            res.render('admin',{msg:"You are not a Admin"})

        }


    if (usercorrect==1){
        usercorrect=0;
        res.render('admin',{msg:"password incorrect"})

    }
   
})


// console.log(regester.length);
app.post("/register.ejs",async (req,res)=>{
    console.log("reg")

    //checking is the email address already exists in data base
    const newUser= await register.findOne({useremail:req.body.useremail}).catch((err)=>{
        
    }) 
    console.log(newUser,"jjs")
    if (newUser==undefined){
        
        
    let match=req.body.pass==req.body.pass1;
    console.log("   ",req.body.pass1,' hi  ',req.body.pass)
    
    console.log(match,"ashag")
    if (match){
        try{

            let password1=await bcrypt.hash(req.body.pass1,10)
            // useremail.push({ username:req.body.username, user:req.body.useremail ,pass:password})
            // console.log(useremail)
            let user1=new register({
                firstname:req.body.fname,
    lastName:req.body.lname,
    gender:req.body.gender,
    country:req.body.country,
    mobile:req.body.mobile,
    useremail:req.body.useremail ,
    password:password1
    
    
            });
            console.log()
            user1.save().then(()=>{console.log("saved")}).catch(()=>{});
            
            res.redirect('login.ejs');
        }
        catch{
            res.redirect('register.ejs');
        }
    }
    else{
        res.render('register.ejs',{msg:"password do not matched"});
    }


    }
    else{
        res.render('register.ejs',{msg:"email already exists"});
    }
   


    
})

app.post("/libraryuser.ejs",async (req,res)=>{
    console.log("post")
    
    let book=new books({title:req.body.title,author:req.body.author,isbn:req.body.isbn,link:req.body.link})
    let t1=book.title;
    let a1=book.author;
    let i=String(book.isbn);
    let linkk=book.link
    
    
    
    if (t1.trim().length==0 ||a1.trim().length==0 || i.trim().length==0 ||linkk.trim().length==0){
       return res.redirect("libraryuser.ejs")
    }
    else{
        var found= await books.findOne({isbn:req.body.isbn}).catch((err)=>{})
    }

    
    if (found==null){
        

            book.save().then(()=>{
                console.log("added")
            }).catch(()=>{
                console.log("not")
            })
            req.body.title="";
            req.body.author="";
            req.body.isbn="";
            req.body.link="";
        
    }
    res.redirect("libraryuser.ejs")
})
// deleteing particular record from the book
app.get("/delete/:id", (req,res)=>{
    let id=req.params.id;
    // let deleteData= books.findOne({_id:id}).catch(()=>{})
    try{

        books.deleteOne({_id:id}).then(()=>{
            res.redirect("/libraryuser.ejs")
        })
        

        console.log(deleted)
            
        
    }
    catch{
        //jgxhsg
    }
    
})

app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if (err) throw err;
        res.redirect("/")
    })
})


app.listen(port);