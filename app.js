const canvas=document.getElementById("jsCanvas")
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const currentColor=document.getElementById("curcol");

const range=document.getElementById("jsRange");
const genColor=document.getElementById("generate");

const fill=document.getElementById("jsFill");
const load=document.getElementById("jsLoad");
const thick=document.getElementById("thickrange");
const saveBtn=document.getElementById("jsSave");

const INTIAL_COLOR="#2c2c2c";
const INITIAL_BACKCOLOR="#ffffff";
const CANVAS_SIZE=700;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE); 
ctx.strokeStyle=INTIAL_COLOR;
ctx.fillStyle=INTIAL_COLOR;
ctx.lineWidth=2.5;

let painting=false;
let filling=false;
let draw=true;let uploaded_image="";


if( document.getElementsByName("endline")[0].checked == true ){
    console.log("square");}
else{
    console.log("round");
}

function stopPaninting(){
    painting=false;
}

function startPainting(event){
    if( document.getElementsByName("endline")[1].checked == true ){
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, ctx.lineWidth/2, 0, 2 * Math.PI);
        ctx.fill();}
    painting=true;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        if( document.getElementsByName("endline")[1].checked == true )
        {
            ctx.beginPath();
            ctx.arc(event.offsetX, event.offsetY, ctx.lineWidth/2, 0, 2 * Math.PI);
            ctx.fill();}
            else
            {
                ctx.lineTo(x,y);
                ctx.stroke();
            }
        }
}

function handColorClick(event){    
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
    currentColor.style.background=color;
}

function handleRangeChange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
    thick.innerText=size;
}

function FillCanvas(){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE); 
}

function myColor()
{
    var red=document.getElementById('red').value;
    var green=document.getElementById('green').value;
    var blue=document.getElementById('blue').value;
    var color='rgb('+red+','+green+','+blue+')';
    genColor.style.background=color;
    document.getElementById('generate').innerText='Set ' +color+' as current color';   
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJS[EXPORT]";
    link.click();
}

document.getElementById('red').addEventListener('input',myColor);
document.getElementById('green').addEventListener('input',myColor);
document.getElementById('blue').addEventListener('input',myColor);


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPaninting);
    canvas.addEventListener("mouseleave",stopPaninting);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color=>
    color.addEventListener("click",handColorClick)
    );



if(range){
    range.addEventListener("input",handleRangeChange);
}

if(fill){
    fill.addEventListener("click",FillCanvas);
}

if(genColor){
    genColor.addEventListener("click",handColorClick)
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}


load.addEventListener("change",function(){
  let uploaded_image;
  const reader=new FileReader();
  var image = new Image();

    reader.addEventListener("load",()=>{
        uploaded_image=reader.result;
        //document.getElementById("jsCanvas").style.backgroundImage=`url(${uploaded_image})`;
        
        image.src=uploaded_image;
      //  console.log("image.src: " + image.src);
     //   ctx.clearRect(0,0,CANVAS_SIZE,CANVAS_SIZE); 
        ctx.drawImage(image, 0, 0);
    });
    reader.readAsDataURL(this.files[0]);

})


