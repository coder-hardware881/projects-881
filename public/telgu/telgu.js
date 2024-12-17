{
    c = new Canvas("#canvas");
    ctx = c.ctx;
    ctx.strokeStyle = "#ff0";
    iterations = 450;
    lasttime = 0;
    points=[
        [c.w / 4, (c.w * 3) / 4],
        [c.w / 4, c.w / 4],
        [(c.w * 3) / 4, c.w / 4],
        [c.w, c.w / 4],
        [c.w - 1, (c.w * 7) / 8 - 1],
        [(c.w * 7) / 8, (c.w * 7) / 8],
    ];
    oldn =points[3];
    r = [(points[0][1] - points[1][1]) / 2, (points[0][1] - points[1][1]) / 4];
    delay = 50;
    shape = document.querySelector("h4");
    shape.textContent = "First Circle";
    requestAnimationFrame(first);
}
function first(time) {
    if (iterations <= 180) {
        requestAnimationFrame(second);
        iterations = 360;
        shape.textContent = "Second Circle";
        return;
    }
    if (time < lasttime + delay) {
        requestAnimationFrame(first);
        return;
    }
    lasttime = time;
    ctx.moveTo(
        points[0][0] + cm.sin(iterations - 10) * r[0],
        points[0][1] + cm.cos(iterations - 10) * r[0]
    );
    ctx.lineTo(points[0][0] + cm.sin(iterations) * r[0], points[0][1] + cm.cos(iterations) * r[0]);
    ctx.stroke();
    iterations -= 10;
    requestAnimationFrame(first);
}
function second(time) {
    if (iterations <= 90) {
        requestAnimationFrame(third);
        iterations = 270;
        shape.textContent = "Third Circle";
        return;
    }
    //if(iterations<=180){ requestAnimationFrame(second);iterations=360; return}
    if (time < lasttime + delay) {
        requestAnimationFrame(second);
        return;
    }
    lasttime = time;
    ctx.moveTo(
        points[1][0] + cm.sin(iterations - 10) * r[0],
        points[1][1] + cm.cos(iterations - 10) * r[0]
    );
    ctx.lineTo(points[1][0] + cm.sin(iterations) * r[0], points[1][1] + cm.cos(iterations) * r[0]);
    ctx.stroke();
    iterations -= 10;
    requestAnimationFrame(second);
}
function third(time) {
    if (iterations <= 90) {
        requestAnimationFrame(fourth);
        iterations = 0;
        shape.textContent = "Line";
        return;
    }
    //if(iterations<=180){ requestAnimationFrame(second);iterations=360; return}
    if (time < lasttime + delay) {
        requestAnimationFrame(third);
        return;
    }
    lasttime = time;
    ctx.moveTo(
        points[2][0] + cm.sin(iterations - 10) * r[0],
        points[2][1] + cm.cos(iterations - 10) * r[0]
    );
    ctx.lineTo(points[2][0] + cm.sin(iterations) * r[0], points[2][1] + cm.cos(iterations) * r[0]);
    ctx.stroke();
    iterations -= 10;
    requestAnimationFrame(third);
}
function fourth(time) {
    if (iterations > 15) {
        requestAnimationFrame(fifth);
        iterations = 90;
        shape.textContent = "Fourth Circle";
        return;
    }
    //if(iterations<=180){ requestAnimationFrame(second);iterations=360; return}
    if (time < lasttime + delay) {
        requestAnimationFrame(fourth);
        return;
    }
    lasttime = time;
    iterations /= 15;
    n = gm.lerp(points[3],points[4], iterations);
    ctx.moveTo(...oldn);
    ctx.lineTo(...n);
    ctx.stroke();
    oldn = n;
    iterations *= 15;
    iterations++;
    requestAnimationFrame(fourth);
}
function fifth(time) {
    if (iterations < -270) {
        shape.textContent = " telgu letter";
        return;
    }
    if (time < lasttime + delay) {
        requestAnimationFrame(fifth);
        return;
    }
    lasttime = time;
    ctx.moveTo(
        points[5][0] + cm.sin(iterations - 10) * r[1],
        points[5][1] + cm.cos(iterations - 10) * r[1]
    );
    ctx.lineTo(points[5][0] + cm.sin(iterations) * r[1], points[5][1] + cm.cos(iterations) * r[1]);
    ctx.stroke();
    iterations -= 10;
    requestAnimationFrame(fifth);
}