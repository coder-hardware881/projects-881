class Canvas{
    constructor(selector,f) {
        /** @type {HTMLCanvasElement} */
        this.canvas=document.querySelector(selector);
        this.ctx=this.canvas.getContext('2d');
        f=f||1;
        this.dpr=window.devicePixelRatio*f;
        let w=~~(this.canvas.getBoundingClientRect().width);
        let h=~~(this.canvas.getBoundingClientRect().height);
        this.w=this.canvas.width=w*this.dpr;
        this.h=this.canvas.height=h*this.dpr;
        this.point_size=3;
    }
    point(){
        for(let p of arguments){
            this.ctx.fillRect(p[0]-this.point_size/2,p[1]-this.point_size/2,this.point_size,this.point_size);
        }
    }
    line(p1,p2){
        this.ctx.moveTo(...p1);
        this.ctx.lineTo(...p2);
    }
    clear(){
        this.ctx.clearRect(0,0,this.w,this.h);
    }
}