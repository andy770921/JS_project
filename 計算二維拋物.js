// 已知起點 ( Xo, Yo) 及終點坐標 ( Xp, Yp) 、鉛直初速度 Vy、鉛直加速度 g ，求水平初速度 Vx 應設定為多少
let Xo=6;
let Yo=17.2;
let Xp=12;
let Yp=18.6;
let Vy=-1;
let g=0.08;
let Vx = (Vy*g*Math.pow(Xp-Xo,1)+Math.sqrt( Math.pow(g*Vy*(Xp-Xo),2)+ ( Vy*Vy-g*Yp+g*Yo)*(2*g*g*Math.pow(Xp-Xo,2))))/2/(Vy*Vy-g*Yp+g*Yo);
let Vx2 = (Vy*g*Math.pow(Xp-Xo,1)+Math.sqrt( Math.pow(g*Vy*(Xp-Xo),2)- ( Vy*Vy-g*Yp+g*Yo)*(2*g*g*Math.pow(Xp-Xo,2))))/2/(Vy*Vy-g*Yp+g*Yo);
console.log(Vx, Vx2);
let check1 = Vy*Vy/g-Yp+Yo;
let check2 = Vy*Math.pow((Xp-Xo)/Vx,1)+0.5*g*Math.pow((Xp-Xo)/Vx,2);
console.log(check1, check2);
let t = (Xp-Xo)/Vx;
let H = Vy*Vy/2/g;
console.log(t, H+Yo);
