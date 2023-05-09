var ing = document.getElementById("ing")
var rec = document.getElementById("rec")
var ima = document.getElementById("img")

const setCon = {
    a: ()=> {
        ing.style.display = ""
        rec.style.display = "none"
        ima.style.display = "none"
    },
    b: ()=> {
        ing.style.display = "none"
        rec.style.display = ""
        ima.style.display = "none"
    },
    c: ()=> {
        ing.style.display = "none"
        rec.style.display = "none"
        ima.style.display = ""
    },
}

