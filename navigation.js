export class WalkGrid {
 constructor(meta,buffer){this.meta=meta;this.h=new Int16Array(buffer);this.step=meta.step;this.height=1.65;}
 cell(x,z){const m=this.meta;return [Math.round((x-m.origin[0])/m.step),Math.round((-z-m.origin[1])/m.step)];}
 at(x,z){const [ix,iy]=this.cell(x,z),m=this.meta;if(ix<0||iy<0||ix>=m.width||iy>=m.height)return null;const h=this.h[iy*m.width+ix];return h===m.invalid?null:h/1000;}
 point(key){const p=this.meta.points[key].blender;return {x:p[0],y:p[2]+this.height+.025,z:-p[1]};}
 canMove(a,x,z){const old=this.at(a.x,a.z),h=this.at(x,z);return h!==null&&old!==null&&Math.abs(h-old)<=.34;}
 move(p,dx,dz){let moved=0;const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.055));for(let i=0;i<n;i++){const x=p.x+dx/n,z=p.z+dz/n,ox=p.x,oz=p.z;if(this.canMove(p,x,z)){p.x=x;p.z=z;}else{if(this.canMove(p,x,p.z))p.x=x;if(this.canMove(p,p.x,z))p.z=z;}const h=this.at(p.x,p.z);if(h!==null)p.y=h+this.height+.025;moved+=Math.hypot(p.x-ox,p.z-oz);}return moved;}
}
