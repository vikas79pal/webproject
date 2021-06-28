const home=document.getElementById('home')
home.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="/"
})
const signIn=document.getElementById('signin')
signIn.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="login.ejs"
})
const aboutus=document.getElementById('AboutUs')
aboutus.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="aboutus.ejs"
})