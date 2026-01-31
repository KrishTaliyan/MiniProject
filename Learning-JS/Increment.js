let countIncrement = document.getElementById("count-el");
let count = 0;
function Increment(){
    count = count+1;
    countIncrement.innerText = count;
    console.log(count);
}

function Save(){
    console.log("Saved Count: " + count);
}
Save();

let Message = "YOu have 3 new notifications";