const home=document.getElementById('home')
home.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="login.ejs"
})


const signUp=document.getElementById('reg')
signUp.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="register.ejs"
})

