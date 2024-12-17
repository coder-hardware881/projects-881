class Player{
    constructor(width,height,img,c_w,c_h){
        this.width=width;
        this.height=height;
        this.img=img;
        this.x=0;
        this.y=290;
    }
    draw(frame,type){
        trace.drawImage(img,this.width*frame,this.height*type,this.width,this.height,this.x,this.y,this.width,this.height);
    }
}