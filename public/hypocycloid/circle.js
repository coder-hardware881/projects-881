let c = new Canvas("#canvas", 2);
let tc = new Canvas("#tracecanvas", 2);
let temp = c.ctx;
let prm = tc.ctx;
let c_s = c.w;
prm.translate(c_s / 2, c_s / 2);
temp.translate(c_s / 2, c_s / 2);
temp.fillStyle = "#fff";
temp.strokeStyle = "#fff";
prm.fillStyle = "#fff";
prm.strokeStyle = "#fff";
let lasttime = 0;
let r1 = c_s / 2 - 30,
    r2,
    r3;
let old,
    theta,
    delta_theta = 5,
    a,
    delta_a,
    reps;
const sin = cm.sin,
    cos = cm.cos;
abs = Math.abs;
kupdate(), lupdate(), aupdate(), speedupdate();
show();
prm.beginPath();
prm.arc(0, 0, r1, 0, 2 * Math.PI);
prm.stroke();

function render(time) {
    if (time < lasttime + delay) {
        requestAnimationFrame(render);
        return;
    }
    if (theta <= -reps) {
        console.timeEnd("pattern");
        temp.clearRect(-c_s / 2, -c_s / 2, c_s, c_s);
        able();
        return;
    }
    lasttime = time;

    temp.clearRect(-c_s / 2, -c_s / 2, c_s, c_s);

    let c2 = [cos(theta) * r3, sin(theta) * r3];
    let fpoint = [cos(a + theta) * r4 + c2[0], sin(a + theta) * r4 + c2[1]];

    temp.beginPath();
    temp.arc(c2[0], c2[1], r2, 0, 2 * Math.PI);
    temp.stroke();
    c.line(fpoint, c2);
    temp.stroke();

    prm.lineTo(...fpoint);
    prm.stroke();
    a += delta_a;
    theta -= delta_theta;
    if (abs(fpoint[0] - old[0]) <= 1 && abs(fpoint[1] - old[1]) <= 1) theta = -reps;

    requestAnimationFrame(render);
}
function show() {
    prm.clearRect(-c_s / 2, -c_s / 2, c_s, c_s);
    temp.clearRect(-c_s / 2, -c_s / 2, c_s, c_s);
    temp.beginPath();
    prm.beginPath();
    prm.strokeStyle = colour.value;
    prm.arc(0, 0, r1, 0, 2 * Math.PI);
    prm.stroke();
    k = cntrl.k;
    delta_a = delta_theta * k;
    r2 = ~~((r1 * 100) / k) / 100;
    r3 = r1 - r2;
    r4 = (r2 * cntrl.l) / 100;
    old = [r3 + r4, 0];
    c.line([r3, 0], [r3 + r4, 0]);
    temp.stroke();
    temp.beginPath();
    temp.arc(r3, 0, r2, 0, 2 * Math.PI);
    temp.stroke();
    c.point([r3, 0], old);
}
function fastrender() {
    if (theta <= -reps) {
        console.timeEnd("pattern");
        temp.clearRect(-c_s / 2, -c_s / 2, c_s, c_s);
        able();
        return;
    }
    for (i = 0; i <= 30; i++) {
        const j = (r3 / r2) * theta;
        let x = r3 * cos(theta) + r4 * cos(j);
        let y = r3 * sin(theta) - r4 * sin(j);
        prm.lineTo(x, y);
        prm.stroke();
        theta -= delta_theta;
        if (abs(x - old[0]) <= 2 && abs(y - old[1]) <= 2) {
            theta = -reps;
            break;
        }
    }
    requestAnimationFrame(fastrender);
}
