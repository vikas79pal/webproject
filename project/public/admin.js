

const msg=document.getElementById("msg").innerText;
console.log(msg.length)
const submit=document.getElementById('login');
submit.addEventListener("submit",(e)=>{
    
    console.log("clicke")
    if (msg.length>0){
        
        msg.innerText=`${msg}`
    setTimeout(()=>{
        document.getElementById("msg").innerText="";
        console.log("inside timeout")
        
    },2000)
    
    }
    else{

    }
    
    
})
console.log(msg)

const signUp=document.getElementById('reg')
signUp.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="register.ejs"
})

const home=document.getElementById('home')
home.addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="/"
})

