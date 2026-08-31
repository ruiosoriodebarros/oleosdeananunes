/* =========================================================================
   Ondas — fundo animado do site

   Porto em JavaScript simples do componente "Waves" do React Bits.
   O site não usa React nem build, por isso o efeito foi reescrito para
   canvas puro, com os mesmos parâmetros do original:

     lineColor #b19d93 · waveSpeedX 0.02 · waveSpeedY 0.01
     waveAmpX 40 · waveAmpY 20 · friction 0.9 · tension 0.01
     maxCursorMove 30 · xGap 12 · yGap 36

   Para afinar sem mexer no código, define no CSS:
     :root{ --ondas-opacidade: .7 }

   Respeita prefers-reduced-motion (desenha um só fotograma parado),
   pára quando o separador não está visível e quando a lightbox está aberta.
   ========================================================================= */
(function(){
'use strict';

var OPCOES = {
  lineColor:'#b19d93',
  waveSpeedX:0.02, waveSpeedY:0.01,
  waveAmpX:40,     waveAmpY:20,
  friction:0.9,    tension:0.01,
  maxCursorMove:30,
  xGap:12,         yGap:36
};

/* ---------------- ruído de Perlin 2D ---------------- */
function Ruido(semente){
  var p=new Uint8Array(512), perm=new Uint8Array(256), i, j, t;
  for(i=0;i<256;i++) perm[i]=i;
  var s=semente||1;
  function rnd(){ s=(s*16807)%2147483647; return (s-1)/2147483646; }
  for(i=255;i>0;i--){ j=Math.floor(rnd()*(i+1)); t=perm[i]; perm[i]=perm[j]; perm[j]=t; }
  for(i=0;i<512;i++) p[i]=perm[i&255];

  function suavizar(t){ return t*t*t*(t*(t*6-15)+10); }
  function lerp(a,b,t){ return a+t*(b-a); }
  function grad(h,x,y){
    switch(h&3){
      case 0: return  x+y;
      case 1: return -x+y;
      case 2: return  x-y;
      default:return -x-y;
    }
  }
  this.perlin2=function(x,y){
    var X=Math.floor(x)&255, Y=Math.floor(y)&255;
    x-=Math.floor(x); y-=Math.floor(y);
    var u=suavizar(x), v=suavizar(y);
    var a=p[X]+Y, b=p[X+1]+Y;
    return lerp(
      lerp(grad(p[a],x,y),   grad(p[b],x-1,y),   u),
      lerp(grad(p[a+1],x,y-1), grad(p[b+1],x-1,y-1), u),
      v);
  };
}

/* ---------------- ondas ---------------- */
function Ondas(canvas){
  var ctx=canvas.getContext('2d');
  var ruido=new Ruido(7);
  var linhas=[], largura=0, altura=0, dpr=1;
  var rato={ x:-10, y:0, lx:0, ly:0, sx:0, sy:0, v:0, vs:0, a:0, dentro:false };
  var tempo=0, af=null, ultimo=0;
  var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function medir(){
    var r=canvas.getBoundingClientRect();
    largura=r.width; altura=r.height;
    dpr=Math.min(window.devicePixelRatio||1, 2);
    canvas.width=Math.round(largura*dpr);
    canvas.height=Math.round(altura*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function construirLinhas(){
    linhas=[];
    var oLargura=largura+200, oAltura=altura+30;
    var totalLinhas=Math.ceil(oLargura/OPCOES.xGap);
    var totalPontos=Math.ceil(oAltura/OPCOES.yGap);
    var xIni=(largura-OPCOES.xGap*totalLinhas)/2;
    var yIni=(altura-OPCOES.yGap*totalPontos)/2;
    for(var i=0;i<=totalLinhas;i++){
      var pts=[];
      for(var j=0;j<=totalPontos;j++){
        pts.push({
          x:xIni+OPCOES.xGap*i, y:yIni+OPCOES.yGap*j,
          onda:{x:0,y:0}, cursor:{x:0,y:0,vx:0,vy:0}
        });
      }
      linhas.push(pts);
    }
  }

  function moverPontos(t){
    var lim=OPCOES.maxCursorMove;
    for(var i=0;i<linhas.length;i++){
      var pts=linhas[i];
      for(var j=0;j<pts.length;j++){
        var p=pts[j];
        var m=ruido.perlin2(
          (p.x+t*OPCOES.waveSpeedX)*0.002,
          (p.y+t*OPCOES.waveSpeedY)*0.0015
        )*12;
        p.onda.x=Math.cos(m)*OPCOES.waveAmpX;
        p.onda.y=Math.sin(m)*OPCOES.waveAmpY;

        if(rato.dentro){
          var dx=p.x-rato.sx, dy=p.y-rato.sy;
          var d=Math.sqrt(dx*dx+dy*dy);
          var l=Math.max(175, rato.vs);
          if(d<l){
            var s=1-d/l;
            var f=Math.cos(d*0.001)*s;
            p.cursor.vx+=Math.cos(rato.a)*f*l*rato.vs*0.00065;
            p.cursor.vy+=Math.sin(rato.a)*f*l*rato.vs*0.00065;
          }
        }
        p.cursor.vx+=(0-p.cursor.x)*OPCOES.tension;
        p.cursor.vy+=(0-p.cursor.y)*OPCOES.tension;
        p.cursor.vx*=OPCOES.friction;
        p.cursor.vy*=OPCOES.friction;
        p.cursor.x+=p.cursor.vx*2;
        p.cursor.y+=p.cursor.vy*2;
        if(p.cursor.x> lim) p.cursor.x= lim; else if(p.cursor.x<-lim) p.cursor.x=-lim;
        if(p.cursor.y> lim) p.cursor.y= lim; else if(p.cursor.y<-lim) p.cursor.y=-lim;
      }
    }
  }

  function pos(p,comCursor){
    return {
      x: p.x+p.onda.x+(comCursor?p.cursor.x:0),
      y: p.y+p.onda.y+(comCursor?p.cursor.y:0)
    };
  }

  function desenhar(){
    ctx.clearRect(0,0,largura,altura);
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle=OPCOES.lineColor;
    for(var i=0;i<linhas.length;i++){
      var pts=linhas[i];
      var p1=pos(pts[0],false);
      ctx.moveTo(p1.x,p1.y);
      for(var j=0;j<pts.length;j++){
        var ultimoPt = j===pts.length-1;
        p1=pos(pts[j],!ultimoPt);
        var p2=pos(pts[j+1]||pts[pts.length-1],!ultimoPt);
        ctx.lineTo(p1.x,p1.y);
        if(!ultimoPt) ctx.quadraticCurveTo(p1.x,p1.y,(p1.x+p2.x)/2,(p1.y+p2.y)/2);
      }
    }
    ctx.stroke();
  }

  function suavizarRato(){
    rato.sx+=(rato.x-rato.sx)*0.1;
    rato.sy+=(rato.y-rato.sy)*0.1;
    var dx=rato.x-rato.lx, dy=rato.y-rato.ly;
    var d=Math.sqrt(dx*dx+dy*dy);
    rato.v=d; rato.vs+=(d-rato.vs)*0.1;
    if(rato.vs>100) rato.vs=100;
    rato.lx=rato.x; rato.ly=rato.y;
    rato.a=Math.atan2(dy,dx);
  }

  function ciclo(ts){
    af=requestAnimationFrame(ciclo);
    if(ts-ultimo<1000/45) return;       /* travar a ~45fps, chega e poupa bateria */
    ultimo=ts;
    if(document.hidden || document.body.classList.contains('lb-open')) return;
    tempo+=16;
    suavizarRato();
    moverPontos(tempo);
    desenhar();
  }

  function aoMover(e){
    var t=e.touches&&e.touches[0];
    rato.x=(t?t.clientX:e.clientX);
    rato.y=(t?t.clientY:e.clientY);
    rato.dentro=true;
  }

  this.iniciar=function(){
    medir(); construirLinhas();
    moverPontos(0); desenhar();
    if(parado) return;                  /* movimento reduzido: fica um fotograma parado */
    window.addEventListener('mousemove',aoMover,{passive:true});
    window.addEventListener('touchmove',aoMover,{passive:true});
    window.addEventListener('mouseleave',function(){ rato.dentro=false; });
    af=requestAnimationFrame(ciclo);

    var rt;
    window.addEventListener('resize',function(){
      clearTimeout(rt);
      rt=setTimeout(function(){ medir(); construirLinhas(); },200);
    });
  };
}

function arrancar(){
  var c=document.getElementById('ondas');
  if(!c || !c.getContext) return;
  new Ondas(c).iniciar();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',arrancar);
else arrancar();

})();
