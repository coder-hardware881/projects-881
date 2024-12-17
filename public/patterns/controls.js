let pattern = document.querySelector("select.name");
let speed = document.querySelector("div.speed");
let speedin = document.querySelector("input.speed");
let sidein = document.querySelector("input.side");
let pside = document.querySelector("p.side");
let sside = document.querySelector("p.speed");
let exec=document.querySelector("button.start");
let bool=false;
fetch("./settings.json")
    .then((response) => response.json())
    .then((data) => (window.settings = data))
    .then(pattern.addEventListener("input", set))
    .then(sideupdate).then(speedupdate)
    .then(set);
exec.addEventListener("click", ()=>{
    if(bool){
        iterations=reps-1;
    }else{
        start();
    }
});
sidein.addEventListener("input", sideupdate);
speed.addEventListener("input", speedupdate);
function sideupdate() {
    side = ~~(sidein.value / 10);
    pside.textContent = side + (pattern.value == 0 ? " [" + settings[4][side - 3] + "]" : "");
}
function speedupdate() {
    sside.textContent = speedin.value + " fps";
}
function set() {
    let index = settings[pattern.value];
    sidein.step=(pattern.value==3)?index.instep:10;
    sidein.max = index.sides * 10;
    if (pattern.value == 1 || pattern.value == 2) {
        speed.style = "display:block;";
    } else {
        speed.style = "display:none;";
    }
    pside.textContent =
        pattern.value == 0
            ? side + (pattern.value == 0 ? " [" + settings[4][side - 3] + "]" : "")
            : (pside.textContent = side);
}
function able(){
    bool=!bool;
    sidein.disabled=bool;
    pattern.disabled =bool;
    speedin.disabled=bool;
    exec.textContent = bool?"Stop":"Start";
}