const canvas=document.getElementById("jsCanvas")
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");

const INTIAL_COLOR="#2c2c2c";
const CANVAS_SIZE=700;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.strokeStyle=INTIAL_COLOR;
ctx.fillStyle=INTIAL_COLOR;
ctx.lineWidth=2.5;


let painting=false;
let filling=false;

function stopPaninting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handColorClick(event){    
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling==true)
    {
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="Paint";
        ctx.fillStyle=ctx.strokeStyle;
    }
}

function handleCanvasClick(){
    if(filling)
    {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }   
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPaninting);
    canvas.addEventListener("mouseleave",stopPaninting);
    canvas.addEventListener("click",handleCanvasClick);
}

Array.from(colors).forEach(color=>
    color.addEventListener("click",handColorClick)
    );

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}
