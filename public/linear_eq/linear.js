document.querySelector("#button").addEventListener("click",calc);
document.querySelector("#eq").addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){calc()};
});
function calc(){
    whleq=document.querySelector('input#eq').value;
    if(!whleq.includes("=")&&whleq[0]=="#"){
        document.cookie = "name="+whleq.slice(1)+"; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
        log.textContent="https://abhineetprojects.000webhostapp.com/chat"; return;
    }
    eq=whleq.split("=");
    window.lhs=eq[0];
    window.rhs=eq[1];
    bound=5
    x=bound
    p=ans(lhs,rhs)(x);
    p=[new Fraction(p[0]),new Fraction(p[1])];
    x=-bound;
    n=ans(lhs,rhs)(x);
    n=[new Fraction(n[0]),new Fraction(n[1])];
    x=0;
    c=ans(lhs,rhs)(x);
    c=[new Fraction(c[0]),new Fraction(c[1])];
    bound=new Fraction(bound);
    t=intersect(p,n);
    result=lerp(bound.neg(),bound,t);
    document.querySelector("#p").textContent=(check(p,c,n)? "$$x = "+result.toLatex()+"$$":"Not a linear equation");
    MathJax.typeset();
}
function ans(eq1,eq2){
    return new Function('return ['+eq1+","+eq2+"];");
}
function intersect(p,n){
    return n[0].sub(n[1]).div(p[1].sub(n[1]).sub(p[0]).add(n[0]));
}
function lerp(a,b,t){
    return b.mul(t).add(a.mul(Fraction(1).sub(t)));
}
function check(){
    c1=bound.mul(c[0].sub(n[0])).add(bound.mul(c[0]-p[0])).equals(0);
    c2=bound.mul(c[1].sub(n[1])).add(bound.mul(c[1]-p[1])).equals(0);
    return c1&&c2;
}
/*
p1  [x=-100,ans of lhs lower]
p2  [x=100,ans of lhs]
p3  [x=-100,ans of rhs lower]
p4  [x=100,ans of rhs]
*/