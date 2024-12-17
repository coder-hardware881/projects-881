c = new Canvas("#mycanvas");
temp = new Canvas("#tracecanvas");
width = c.w;
temp.point_size = 6;
c.point_size = temp.point_size;
p = [];
oldP = [];
np = 4;
ctx = c.ctx;
ctx2 = temp.ctx;
steps = 70;
c.canvas.addEventListener("click", addpoint);
animatebtn = document.querySelector("#animatebtn");
// ctx.fillStyle="#fff";
// ctx2.fillStyle="#fff"
//animate=document.getElementsByClassName("animate");
animatebtn.addEventListener("click", function () {
    window.t = -1;
    //np=parseInt(document.getElementsByClassName('no.of_point')[1].value);
    ctx.strokeStyle = "#f00";
    ctx2.fillStyle = "#00f";
    ctx2.strokeStyle = "#444";
    ctx.beginPath();
    requestAnimationFrame(draw);
});
/*animate[1].addEventListener("click",function(){
        if(this.checked==true){
            this.value="block";
        }else{
            this.value="none";
        }
        document.getElementsByClassName('no.of_point')[0].style.display=this.value;
        document.getElementById('animatebtn').style.display=this.value;
    });*/
document.querySelector("#reset").addEventListener("click", function () {
    p = [];
    ctx.clearRect(0, 0, width, width);
    ctx2.clearRect(0, 0, width, width);
    animatebtn.style.display = "none";
    this.style.display = "none";
    c.canvas.addEventListener("click", addpoint);
});
function addpoint(evt) {
    p.push([evt.layerX * c.dpr, evt.layerY * c.dpr]);
    switch (p.length) {
        case 1:
            ctx.fillStyle = "#f00";
            c.point(p[0]);
            ctx.fillStyle = "#0fc";
            break;
        case np:
            ctx.strokeStyle = "#888";
            ctx.beginPath();
            for (i = 0; i < np; i++) {
                ctx.lineTo(...p[i]);
            }
            ctx.stroke();
            // if (np == 4) {
            ctx2.strokeStyle = "#f00";
            ctx2.beginPath();
            ctx2.moveTo(...p[0]);
            ctx2.bezierCurveTo(...p[1], ...p[2], ...p[3]);
            ctx2.stroke();
            // }
            document.querySelector("#animatebtn").style.display = "block";
            document.querySelector("#reset").style.display = "block";
            //document.getElementsByClassName('no.of_point')[0].style.display="none"
            //document.getElementsByClassName('animate')[0].style.display="none"
            ctx.fillStyle = "#0f0";
            c.canvas.removeEventListener("click", addpoint);
        default:
            c.point(p.at(-1));
    }
}

function lerp(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function draw() {
    t++;
    t /= steps;
    ctx2.clearRect(0, 0, width, width);
    //ctx.fillStyle="#999"
    lerp_point = [];

    lerp_point[0] = lerp(p[0], p[1], t);
    lerp_point[1] = lerp(p[1], p[2], t);
    lerp_point[2] = lerp(p[2], p[3], t);
    lerp_point[3] = lerp(lerp_point[0], lerp_point[1], t);
    lerp_point[4] = lerp(lerp_point[1], lerp_point[2], t);
    lerp_point[5] = lerp(lerp_point[3], lerp_point[4], t);

    ctx2.beginPath();
    ctx2.moveTo(...lerp_point[0]);
    ctx2.lineTo(...lerp_point[1]);
    ctx2.lineTo(...lerp_point[2]);
    ctx2.moveTo(...lerp_point[3]);
    ctx2.lineTo(...lerp_point[4]);
    ctx2.stroke();

    temp.point(...lerp_point);
    ctx.lineTo(...lerp_point[5]);
    ctx.stroke();
    t *= steps;
    if (t <= steps - 1) {
        requestAnimationFrame(draw);
    }
}
