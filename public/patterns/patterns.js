c = new Canvas("#myCanvas");
ctx = c.ctx;
c_side = c.w;
t = new turtle([c_side / 2, c_side / 2], [1, 0], c_side, ctx);
ptrns = [p1, p2, p3, p4];
ctx.lineWidth = 1;
ctx.strokeStyle = "#ff0";
let side,
    angle,
    iterations,
    reps,
    step,
    index,
    maxFPS,
    lasttime = 0;
function start() {
    able();
    t.c = [c_side / 2, c_side / 2];
    iterations = 0;
    maxFPS = document.querySelector("input.speed").value;
    t.clear();
    let no = document.querySelector("select.name").value;
    ctx.strokeStyle = document.querySelector("input.colour").value;
    index = settings[no];
    angle = Function("return " + index.angle)().toFixed(3) * 1;
    step = ~~Function("return " + index.step)();
    Function(index.init)();
    requestAnimationFrame(ptrns[no]);
}
function p1() {
    Function(center)();
    polygon(side, angle, step);
    ctx.stroke();
    able();
}
function p2(time) {
    if (iterations > reps) {
        able();
        return;
    }
    if (time < lasttime + 1000 / maxFPS) {
        requestAnimationFrame(p2);
        return;
    }
    lasttime = time;
    polygon(side, angle, step);
    ctx.stroke();
    t.c = [c_side / 2, c_side / 2];
    t.turn(8);
    iterations++;
    requestAnimationFrame(p2);
}
function p3(time) {
    if (iterations > reps) {
        able();
        return;
    }
    if (time < lasttime + 1000 / maxFPS) {
        requestAnimationFrame(p3);
        return;
    }
    lasttime = time;
    step = ~~(step / 1.09);
    t.c = [c_side / 2, c_side / 2];
    Function(center)();
    polygon(side, angle, step);
    t.turn(10);
    ctx.stroke();
    iterations++;
    requestAnimationFrame(p3);
}
function p4() {
    // Function(center)();
    polygon(side, angle, step);
    ctx.stroke();
    able();
}
function polygon(side, angle, s) {
    for (let i = 0; i < side; i++) {
        t.move(s);
        t.turn(angle);
    }
}
function toRad(angle) {
    return angle * (Math.PI / 180);
}
