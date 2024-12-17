{
    //sizes
    window.tile=15;
    window.c=new canvas("#myCanvas");
    window.ctx = c.ctx;
    //snake
    window.x=9;
    window.y=10;
    window.state=0;
    window.dir="ArrowDown";
    window.snake=[[9,8],[9,9],[9,10]];
    window.snake_len=3;
    window.food_x=0;
    window.food_y=0;
    window.snakepart;
    window.h=c.h;
    window.w=c.w;
    //points
    window.points=document.querySelector("#p");
    //interval
    window.refresh;
    c.canvas.addEventListener("click",tog_state);
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.addEventListener("touchstart",start,false)
            document.addEventListener("touchend",end,false)
            window.old=[];
    }else{
        document.addEventListener("keydown",move);
    }
    draw(snake,"s");
    gen_food();
    draw([food_x,food_y],"f");
    points.innerHTML="Score : 0";
}
function render(){
    ctx.clearRect(0,0,w,h);
    switch(dir){
        case "ArrowUp":
            y-=1;
            break;
        case "ArrowDown":
            y+=1;
            break;
        case "ArrowRight":
            x+=1;
            break;
        case "ArrowLeft":
            x-=1;
            break;
    }
    if(y>=h+1){
        y=0;
    }else if(y<=-1){
        y=h;
    }
    if(x>=w+1){
        x=0;
    }else if(x<=-1){
        x=w;
    }
    if(check([x,y])){
        tog_state();
        ctx.clearRect(0,0,w,h);
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font="100px VT323"
        ctx.fillText("GAME OVER", w/2, h/2);
        ctx.font="20px VT323";
        ctx.fillText("Click to restart", w/2, h/2+50);
        x=9;
        y=10;
        dir="ArrowDown";
        snake=[[9,8],[9,9],[9,10]];
        snake_len=3;
        gen_food();
        points.innerHTML="Score : 0";
        return;
    }else{
        snake.unshift([x,y]);
        
    }
    if(x==food_x&&y==food_y){
        snake_len++;
        draw([x,y],"sc");
        gen_food();
        document.querySelector("#p").innerHTML="Score : "+(snake_len-3);
    }else{
        snake.pop();
    }
    draw(snake,"s");
    draw([food_x,food_y],"food");
}
function move(event){
    if((event.key=="ArrowUp"||event.key=="ArrowDown"||event.key=="ArrowRight"||event.key=="ArrowLeft")&&(dir!=event.key)){
        var tcoord=snake.shift();
        var turn=turncalc(dir,event.key);
        dir=event.key;
        snake.unshift([tcoord[0],tcoord[1],turn]);
    }
}
function draw(coord,type){
    switch (type){
        case "sc":
            ctx.fillStyle="#0f0";
            ctx.fillRect(coord[0]*tile,coord[1]*tile,tile,tile);
            break;
        case "f":
            ctx.fillStyle="#f00";
            ctx.beginPath();
            ctx.arc(coord[0]*tile+tile/2,coord[1]*tile+tile/2,tile/2,0,2*Math.PI);
            ctx.fill();
            break;
        case "s":
            ctx.fillStyle="#0f0";
            for(snakepart of coord){
                if (snakepart.length==3&&snakepart!==coord.at(-1)){
                    ctx.beginPath();
                    ctx.arc(ans(snakepart[2][0])(),ans(snakepart[2][1])(),tile,ans(snakepart[2][2])(),ans(snakepart[2][3])());
                    ctx.lineTo(ans(snakepart[2][0])(),ans(snakepart[2][1])());
                    ctx.fill();
                }else{
                    ctx.fillRect(snakepart[0]*tile,snakepart[1]*tile,tile,tile);
                    ctx.closePath();
                }
            }
            break;
        }
}
function check(new_cords) {
    for (i of snake){
        if (i[0] == new_cords[0] && i[1] == new_cords[1]) {
            return true;
        }
    }
    return false;
}
function gen_food(){
    do {
    food_x=Math.floor((Math.random() * w));
    food_y=Math.floor((Math.random() * h));
    }while(foodcheck());
}
function foodcheck(){
    for(var i =0;i<snake_len-1;i++){
        if(snake[i][0]==food_x&snake[i][1]==food_y){
            return 1;
            break;
        }
    }
    return 0;
}
function tog_state(){
    if(state==1){
        window.clearInterval(refresh);
        state=0;
    }else{
        refresh=window.setInterval(render,200);
        state=1;
    }
}
function ans(fn) {
    return new Function('return ' + fn);
}
function turncalc(prev,cur){
    console.log(prev,cur)
    if(prev=="ArrowRight"&&cur=="ArrowDown"){
        return ["(snakepart[0])*tile","(snakepart[1]+1)*tile","1.5*Math.PI","0*Math.PI",];
    }else if(prev=="ArrowRight"&&cur=="ArrowUp"){
        return ["snakepart[0]*tile","snakepart[1]*tile","0*Math.PI","0.5*Math.PI"];
    }else if(prev=="ArrowLeft"&&cur=="ArrowUp"){
        return ["(snakepart[0]+1)*tile","(snakepart[1])*tile","0.5*Math.PI","1*Math.PI"];
    }else if(prev=="ArrowLeft"&&cur=="ArrowDown"){
        return ["(snakepart[0]+1)*tile","(snakepart[1]+1)*tile","1*Math.PI","1.5*Math.PI"];
    }else if(prev=="ArrowDown"&&cur=="ArrowLeft"){
        return ["(snakepart[0])*tile","(snakepart[1])*tile","0*Math.PI","0.5*Math.PI"];
    }else if(prev=="ArrowDown"&&cur=="ArrowRight"){
        return ["(snakepart[0]+1)*tile","(snakepart[1])*tile","0.5*Math.PI","1*Math.PI"];
    }else if(prev=="ArrowUp"&&cur=="ArrowLeft"){
        return ["(snakepart[0])*tile","(snakepart[1]+1)*tile","1.5*Math.PI","0*Math.PI"];
    }else if(prev=="ArrowUp"&&cur=="ArrowRight"){
        return ["(snakepart[0]+1)*tile","(snakepart[1]+1)*tile","1*Math.PI","1.5*Math.PI"];
    }
}
function start(event){
    old=[Math.floor(event.touches[0].clientX),Math.floor(event.touches[0].clientY)]
}
function end(event){
    var diff=[Math.floor(event.changedTouches[0].pageX)-old[0],Math.floor(event.changedTouches[0].pageY)-old[1]]
    var newdir;
    if(diff[0]>10){
        newdir="ArrowRight";
    }else if(diff[0]<-10){
        newdir="ArrowLeft";
    }else if(diff[1]>10){
        newdir="ArrowDown";
    }else if(diff[1]>-10){
        newdir="ArrowUp";
    }
    console.log(newdir)
    var tcoord=snake.shift();
    var turn=turncalc(dir,newdir);
    console.log(turn)
    console.log(dir+"dir")
    dir=event.key;
    snake.unshift([tcoord[0],tcoord[1],turn]);
}