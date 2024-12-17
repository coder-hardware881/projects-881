{
    window.canvas_h=450;
    window.canvas_w=800;
    var canvas=document.querySelector("#myCanvas");
    canvas.width=canvas_w;
    canvas.height=canvas_h;
    window.ctx = canvas.getContext("2d");
    window.state=false;
    //window.vec=[];
    window.player=new Paddle(canvas_w-35,canvas_h/2-60/2,18,90,0);
    window.computer=new Paddle(10,canvas_h/2-60/2,18,90,0);
    window.pong={c:[canvas_w/2,canvas_h/2],v:[2,0]};
    //reset()
    window.refresh;
    draw();
}
function render(time){
    if(time<20) return;
    ctx.clearRect(0,0,canvas_w,canvas_h);
    collision();
    if(pong.c[0]<80){
        moveai();
    }
    pong.c[0]+=pong.v[0];
    pong.c[1]+=pong.v[1];
    draw();
    if(state==true){
        window.requestAnimationFrame(render);
    }    
}
function move(event){
    if(event.key=="ArrowUp"){
        player.y-=10;
    }else if(event.key=="ArrowDown"){
        player.y+=10;
    }
    if(computer.y>canvas_h-computer.h-1){
        computer.y=canvas_h-computer.h;
    }else if(computer.y<1){
        computer.y=0;
    }
    /*if(event.key=="ArrowLeft"){
        computer.y-=10;
    }else if(event.key=="ArrowRight"){
        computer.y+=10;
    }*/
    if(player.y>canvas_h-player.h-1){
        player.y=canvas_h-player.h;
    }else if(player.y<1){
        player.y=0;
    }
}
function Paddle(x,y,w,h,score){
    this.x=x
    this.y=y
    this.w=w
    this.h=h
    this.score=score;
}
document.querySelector('#myCanvas').addEventListener("click",function(){
    if(state==false){
        window.requestAnimationFrame(render);
    }
    state= !state;
});
function draw(){
    ctx.fillStyle="#f00"
    ctx.beginPath();
    ctx.arc(pong.c[0],pong.c[1],10,0,2*Math.PI);
    //ctx.arc(canvas_w/2,canvas_h/2,3,0,2*Math.PI);
    ctx.fill();
    ctx.strokeStyle="#fff"
    //ctx.beginPath()
    //ctx.moveTo(canvas_w/2,canvas_h/2);
    //ctx.lineTo(vec[0]*20+(canvas_w/2),vec[1]*20+(canvas_h/2));
    //ctx.stroke()
    ctx.fillStyle="#00f"
    ctx.fillRect(player.x,player.y,player.w,player.h);
    ctx.fillRect(computer.x,computer.y,computer.w,computer.h);
    ctx.fillStyle="whitesmoke"
    ctx.font="40px VT323";
    ctx.fillText("Computer: "+player.score,canvas_w/6*0.6,30);
    ctx.fillText("Player: "+computer.score,canvas_w/6*4.09,30);
}
function collision(){
    fpong=[pong.c[0]+pong.v[0],pong.c[1]+pong.v[1]];
    if (fpong[0]>canvas_w){
        player.score+=1;
        reset();
    }else if(fpong[0]<0){
        computer.score+=1;
        reset();
    }else if(fpong[1]+5>canvas_h||fpong[1]-5<0){
        pong.v[1]=-pong.v[1];
    }else if((fpong[1]+5>computer.y&&fpong[1]-5<computer.y+computer.h)&&(fpong[0]-5<computer.x+computer.w)){
        pong.v=reflect([1,((fpong[1]-(computer.y+computer.h/2))/30).toFixed(2)],pong.v);
    }else if((fpong[1]+5>player.y&&fpong[1]-5<player.y+player.h)&&(fpong[0]+5>player.x)){
        pong.v=reflect([-1,((fpong[1]-(player.y+player.h/2))/30).toFixed(2)],pong.v);
    }
}
function moveai(){
    if(pong.c[1]-computer.h-10>computer.y){
        computer.y+=10;
    }else if(pong.c[1]-10<computer.y){
        computer.y-=10;
    }
}
function reset(){
    pong.c[1]=canvas.height/2;
    pong.c[0]=canvas.width/2;
    //do {
        pong.v[1]=1//Math.round(Math.random()*2-1)*Math.round(Math.random()*5)+5;
        pong.v[0]=1//Math.round(Math.random()*2-1)*Math.round(Math.random()*5)+5;
    //console.log("y"+pong.v[1]);
    //console.log("x"+pong.v[0]);
    //} while (Math.abs(pong.xv)<4||Math.abs(pong.yv)<4);
    //console.log(pong.xv);Math.round(Math.random()*2-1)
}
function reflect(n,v){
    var vp= [2*n[0]*dot(v,n),2*n[1]*dot(v,n)];
    return [v[0]-vp[0],v[1]-vp[1]]
}
function dot(x,y){
    return x[0]*y[0]+x[1]*y[1];
}