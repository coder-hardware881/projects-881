class cm{
    static dot(v1,v2){
        return v1[0]*v2[0]+v1[1]*v2[1];
    }
    static sin(a){
        return Math.sin(a*Math.PI/180).toFixed('2')*1;
    }
    static cos(a){
        return Math.cos(a*Math.PI/180).toFixed('2')*1;
    }
}
class gm{
    static lerp(p1,p2,t){
        return [p1[0]*(1-t)+p2[0]*t,p1[1]*(1-t)+p2[1]*t];
    }
    static toRad(a){
        return a*Math.PI/180
    }
    static toDeg(r){
        return r*180/Math.PI
    }
    static slerp(p1,p2,t){
        first=[Math.sin(Math.PI/180*((1-t)*a))/Math.sin(a*Math.PI/180),Math.cos(Math.PI/180*((1-t)*a))/Math.cos(a*Math.PI/180)];
        second=[Math.sin(t*a*Math.PI/180)/Math.sin(a*Math.PI/180)],[Math.cos(t*a*Math.PI/180)/Math.cos(a*Math.PI/180)];
        return[first[0]*p1[0]+second[0]*p2[0],first[1]*p1[1]+second[1]*p2[1]];
    }
    static intersect(p1,p2,p3,p4){
        var top=(p4[0]-p3[0])*(p1[1]-p3[1])-(p4[1]-p3[1])*(p1[0]-p3[0]);
        var bottom=(p4[1]-p3[1])*(p2[0]-p1[0])-(p4[0]-p3[0])*(p2[1]-p1[1]);
        return top/bottom;
    }
}