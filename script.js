// Partículas Poké estilo brillante
const canvas=document.getElementById('particle-canvas');
const ctx=canvas.getContext('2d');

let particles=[];
const num=120;

function init(){
  canvas.width=innerWidth;
  canvas.height=innerHeight;
  particles=[];
  for(let i=0;i<num;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      size:Math.random()*3+1,
      speedY:Math.random()*0.8+0.2,
      opacity:Math.random()*0.7+0.3
    });
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.fillStyle=`rgba(255, 203, 5, ${p.opacity})`;
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    p.y-=p.speedY;
    if(p.y<0){p.y=canvas.height; p.x=Math.random()*canvas.width;}
  });
  requestAnimationFrame(draw);
}

init();
draw();
onresize=init;

// Ataque pokémon sparkles
document.getElementById('spell-button').onclick=()=>{
  for(let i=0;i<25;i++) spark(innerWidth/2, innerHeight/2);
};

function spark(x,y){
  particles.push({
    x:x+(Math.random()-.5)*200,
    y:y+(Math.random()-.5)*200,
    size:Math.random()*5+2,
    speedX:(Math.random()-.5)*5,
    speedY:(Math.random()-.5)*5,
    opacity:1,
    decay:0.03
  });
}

// Música Pokémon
onload=()=>{
  const a=document.getElementById("background-audio");
  a.volume=0.25;
  a.play().catch(()=>{});
};

// Cambiar tema según tipo Pokémon
document.getElementById('type').onchange=e=>{
  let type=e.target.value;
  let box=document.querySelector('.container');

  const themes={
    fire:["#ff6f3c","#ffcb05","#ff4e00"],
    water:["#2a75bb","#80d0ff","#2a75bb"],
    grass:["#3fa34d","#b4ff9f","#1c8f3c"],
    electric:["#ffcb05","#ffe66d","#ffdd00"]
  };

  if(themes[type]){
    box.style.borderColor=themes[type][1];
    box.style.boxShadow=`0 0 20px ${themes[type][2]}`;
  } else {
    box.style.borderColor="#ffcb05";
    box.style.boxShadow="0 0 20px #2a75bb";
  }
};
