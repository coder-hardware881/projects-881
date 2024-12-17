let kelem = document.querySelector("input.k");
let lelem = document.querySelector("input.len");
let aelem = document.querySelector("input.ang");
let selem = document.querySelector("input.speed");
let colour = document.querySelector("input.colour");
let pelem = document.querySelector("input.anim");
let exec = document.querySelector("button.start");
kelem.addEventListener("input", kupdate);
lelem.addEventListener("input", lupdate);
aelem.addEventListener("input", aupdate);
selem.addEventListener("input", speedupdate);
pelem.addEventListener("input", () => {
    show();
});
let kp = document.querySelector("p.k");
let lp = document.querySelector("p.len");
let sp = document.querySelector("p.speed");
let ap = document.querySelector("p.ang");
let cntrl = {};
let bool = false;
exec.addEventListener("click", () => {
    if (bool) {
        theta = -reps;
    } else {
        start();
    }
});
function kupdate() {
    cntrl.k = kelem.value * 1;
    kp.textContent = cntrl.k;
    show();
}
function lupdate() {
    cntrl.l = lelem.value * 1;
    lp.textContent = cntrl.l + "%";
    show();
}
function aupdate() {
    reps = aelem.value * 360;
    ap.textContent = reps / 360 + " rotations";
}
function speedupdate() {
    sp.textContent = selem.value + " fps";
    cntrl.s = ~~(1000 / selem.value);
}
function able() {
    bool = !bool;
    lelem.disabled = bool;
    kelem.disabled = bool;
    selem.disabled = bool;
    aelem.disabled = bool;
    pelem.disabled = bool;
    exec.textContent = bool ? "Stop" : "Start";
}
function start() {
    able();
    theta = -delta_theta;
    a = delta_a;
    delay = cntrl.s;
    prm.strokeStyle = colour.value;
    document.documentElement.style.setProperty("--clr5", colour.value);
    temp.clearRect(-c_s / 2, -c_s / 2, c_s, c_s);
    prm.clearRect(-c_s / 2, -c_s / 2, c_s, c_s);
    prm.beginPath();
    if (pelem.checked) {
        prm.arc(0, 0, r1, 0, 2 * Math.PI);
        prm.stroke();
        prm.moveTo(...old);
        console.time("pattern");
        requestAnimationFrame(render);
    } else {
        prm.moveTo(...old);
        console.time("pattern");
        requestAnimationFrame(fastrender);
    }
}
