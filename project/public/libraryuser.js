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


// event
form.addEventListener('submit', addbook);

// addbook functn
function addbook(e) {
    // e.preventDefault()

    //fetching value inside of a input tag

    var title = document.getElementById('title').value;
    var author = document.getElementById('Author').value;
    var isbn = document.getElementById('ISBN#').value;
    var link= document.getElementById("link").value;
    var c=0;

    // validation the input and preventing the same(duplication) entries of the book


    if (title.trim().length!=0 && author.trim().length!=0 && isbn.trim().length!=0 && link.trim().length!=0) {
        
        for (let i = 0; i < document.getElementById('tb').children[0].childElementCount; i++) {
            if (document.getElementById('tb').children[0].children[i].children[2].textContent==isbn) {
                c+=1;
                break;
            }
            
        }
        // if same ISBN#  number not found in the entries
        if (c==0){


            //storing that value into an array "a"
            
            var a=[];
            a.push(title, author, isbn,link)
            
            // creating an element "tbody"  
            var tbody = document.getElementsByTagName('tbody')
            
            //creating a tr element
            var tr = document.createElement('tr');
            
            // adding a class to an element '<tr>'
            tr.className = 'tr';
            
            // adding a single a row to the table
            
            // cell1
            // creating a td element
            let td1 = document.createElement('td');
            td1.className = 'td';
            td1.appendChild(document.createTextNode(a[0]))
            tr.appendChild(td1)
            
            // cell2
            // creating a td element
            let td2 = document.createElement('td');
            td2.className = 'td';
            td2.appendChild(document.createTextNode(a[1]))
            tr.appendChild(td2)
            
            // cell3
            // creating a td element
            let td3 = document.createElement('td');
            td3.className = 'td';
            td3.appendChild(document.createTextNode(a[2]))
            tr.appendChild(td3)
            
            // cell4
            // creating a td element
            let td4 = document.createElement('td');
            td4.className = 'td';
            let anchor=document.createElement("a");
            anchor.href.value=a[3];
            anchor.appendChild(document.createTextNode("download"))
            td4.appendChild(anchor)
            tr.appendChild(td4)

            // cell5
            // creating a td element
            let td5 = document.createElement('td');
            td5.className = 'td';
            td5.innerHTML = '<button class="remove">X</button>';
            tr.appendChild(td5)
            
            tbody[0].appendChild(tr);
            tb.appendChild(tbody[0]);
            // document.getElementById('title').value = '';
            // document.getElementById('Author').value = '';
            // document.getElementById('ISBN#').value = '';

            // displaying confirmation msg on the screen for successfull entry

            let msg = document.getElementById('msg');
            msg.style.backgroundColor = 'rgb(241, 195, 107)';
            msg.innerText = "Book Added succesfully";
            // setTimeout(successfullmsg, 1500);
            // function successfullmsg() {
            //     let msg = document.getElementById('msg');
            //     msg.innerText = "";
            //     document.getElementById('title').value = '';
            //     document.getElementById('Author').value = '';
            //     document.getElementById('ISBN#').value = '';
            // }

        }
        // if same ISBN#  number found in the entries of the book
        else{
            c=0;
            let msg = document.getElementById('msg');
            msg.style.backgroundColor = 'rgb(241, 195, 107)';
            msg.innerText = "book already exist";
            // setTimeout(removemsg, 1500);
            // function removemsg() {
            //     let msg = document.getElementById('msg');
            //     msg.innerText = "";
            //     document.getElementById('title').value = '';
            //     document.getElementById('Author').value = '';
            //     document.getElementById('ISBN#').value = '';
            // }
        }
    }
    else {
        let msg = document.getElementById('msg');
        msg.style.backgroundColor = 'rgb(241, 195, 107)';
        msg.innerText = "Plz Enter value in each field";

        // setTimeout(removemsg, 1500);
        // function removemsg() {
        //     let msg = document.getElementById('msg');
        //     msg.innerText = "";
        //     document.getElementById('title').value = '';
        //     document.getElementById('Author').value = '';
        //     document.getElementById('ISBN#').value = '';
        // }

    }

}

// delete specific element by clicking on "x" button
tb.addEventListener('click', (e) => {
    var check = e.target.className;
    if (check == 'remove') {
        e.target.parentNode.parentElement.remove();
    }

})


// searching for books by name of author,book.

const searchf = document.getElementById('search-f').getElementsByTagName('input')[0];

searchf.addEventListener('keyup', (e) => {

    // filter books according to the search box input("value")   
    for (let i = 0; i < document.getElementById('tb').children[0].childElementCount; i++) {
        if ((document.getElementById('tb').children[0].children[i + 1].children[0].textContent.toLocaleLowerCase()).indexOf(searchf.value.toLocaleLowerCase()) > -1) {
            document.getElementById('tb').children[0].children[i + 1].style.display = "";

        }
        else {
            document.getElementById('tb').children[0].children[i + 1].style.display = 'none';

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
