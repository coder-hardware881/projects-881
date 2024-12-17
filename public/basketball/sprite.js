{
    canvas=document.querySelector('#canvas');
    perm=canvas.getContext('2d');
    canvas2=document.querySelector('#trcanvas');
    trace=canvas2.getContext('2d');
    window.c_w=canvas.width=canvas2.width=1000;
    window.c_h=canvas.height=canvas2.height=400;
    perm.scale(10/15,10/15)
    trace.scale(10/15,10/15)
    var a=[560,340]
    var b=[870,-20]
    var c=[1040,150]
    ballx=a[0],bally=a[1]
    var lasttime=0,maxFPS=10,iterations=0;
    var img=document.querySelector('#spritesheet') 
    var ballimg=document.querySelector('#ball') 

    var player=new Player(140,260,img,c_w,c_h);
    var key=9,mousex,mousey,t=0;
    trace.drawImage(img,1070,0,380,540,1000,0,380,540)
    img.onload=()=>{
        console.log("k")
        trace.drawImage(img,1070,0,380,540,1000,0,380,540)
    }
}
function render(time){
    if (time<lasttime+(1000/maxFPS)){
        if(t<50){requestAnimationFrame(render)}else{document.querySelector('#cont > p').style="display:block"};
        return;
    }
    lasttime = time;
    if(iterations<27){
        iterations++;
        trace.clearRect(player.x,player.y,140,260)
        player.x+=20;
        player.draw(iterations%7,Math.floor(iterations/21))
    }else{
        t++;
        if(t<=20){
        t/=20;
        l1=lerp(a,b,t)
        l2=lerp(b,c,t)
        f=lerp(l1,l2,t)
        perm.clearRect(ballx,bally,28,28)
        ball(f[0],f[1])
        t*=20;
        }else{
            perm.clearRect(ballx,bally,28,28)
            ball(ballx,bally+((t<33?1:t<39?-0.5:0.25)*30))
        }
    }
    requestAnimationFrame(render)
}
function ball(x,y){
    ballx=x,bally=y
    perm.drawImage(ballimg,0,0,28,28,x,y,28,28)
}
function lerp(a,b,t){
    return [a[0]*(1-t)+b[0]*t,a[1]*(1-t)+b[1]*t]
}