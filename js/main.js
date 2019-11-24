function paint(e) {
    let canvas = document.getElementById('canvas');
    //get x and y of canvas box
    let rect = canvas.getBoundingClientRect();
    let rectLeft = rect.left;
    let rectRight = rect.right;
    let rectTop = rect.top;
    let rectBottom = rect.bottom;

    //mouse position
    let ele = e.target;
    let xPos = e.clientX;
    let yPos = e.clientY;
    let size = null;
    console.log("xPos" + xPos);
    console.log("rectLeft" + rectLeft);
    console.log("rectright" + rectRight);

    if (color == 'lightblue') {

        size = 100;
        //console.log(size);
    } else {
        size = document.getElementById('in').value;
        //console.log('lets go');
       
    }

    //check if click is in div 
    if (yPos > rectBottom - size - 1 || xPos > rectRight - size - 1) {
        console.log("not work")
    } else {


        //console.log('lets go');
        //console.log(xPos);
        //console.log(yPos);
        let stroke = document.createElement('div');
        stroke.className = "stroke";
        stroke.style.position = 'absolute';
        stroke.style.backgroundColor = color;
        stroke.style.width = size + 'px';
        stroke.style.height = size + 'px';
        stroke.style.borderRadius = shape + "%";
        // stroke.addEventListener('mousemove', (e) => { e.stopPropagation() });
        // stroke.style.transform = `translate(${xPos-200}px, ${yPos}px)`
        stroke.style.top = `${yPos}px`
        stroke.style.left = `${xPos}px`
        
        canvas.appendChild(stroke);
        

    }
}

function changeColor(e) {
    let ele = e.target;
    let btn = $(this);
    let bar = $('#leftBar');
    bar.find('button').removeClass('activate');
    btn.addClass('activate');
    let newColor = ele.style.backgroundColor;
    color = newColor;
    $('<style>.activateShape { background-color: '+color+'; }</style>').appendTo('body');
}

function setHeight() {
    clearOutliers();
    let canvas = document.getElementById('canvas');
    let heightNew = document.getElementById('inH');
    canvas.style.height = heightNew.value + 'px';

    clearOutliers();

}

function setWidth() {
    clearOutliers();
    let canvas = document.getElementById('canvas');
    let widthNew = document.getElementById('inW');
    canvas.style.width = widthNew.value + 'px';
    clearOutliers();
}

function clearCanvas() {
    let newCanvas = document.createElement('div');
    let canvas = document.getElementById('canvas');
    newCanvas.id = 'canvas';
    newCanvas.style.width = '500px';
    newCanvas.style.height = '500px';
    var move = false;
    newCanvas.addEventListener('mousedown', function (e) {
        move = true;
    });

    newCanvas.addEventListener('mouseup', function () {
        move = false;
    });
    newCanvas.addEventListener('mousemove', (e) => {
        if (move) {
            paint(e);
        }
    });
    canvas.parentNode.replaceChild(newCanvas, canvas);
}

function flipCanvas() {
    //degree += 90;
    //let canvas = document.getElementById('canvas');
    //canvas.style.transform = `rotate(${degree}deg)`;
}

function changeShape(e) {
    let btn = $(this);
    let bar = $('#rowEight');
    bar.find('div').removeClass('activateShape');
    btn.addClass('activateShape');
    $('<style>.activateShape { background-color: '+color+'; }</style>').appendTo('body');
    if (e.target.id == 'circle') {
        shape = 50;
    } else {
        shape = 0;
    }
}

function clearOutliers(){
    let canvas = document.getElementById('canvas');
    //get x and y of canvas box
    let rect = canvas.getBoundingClientRect();
    let rectLeft = rect.left;
    let rectRight = rect.right;
    let rectTop = rect.top;
    let rectBottom = rect.bottom;
    
    let strokes = $('.stroke');
    
    for(var i=0;i<strokes.length;i++){
        let strokeRect = strokes[i].getBoundingClientRect();
        let strokesLeft = strokeRect.left;
        let strokesRight = strokeRect.right;
        let strokesTop = strokeRect.top;
        let strokesBottom = strokeRect.bottom;
        if(strokesTop >= rectBottom || strokesLeft >= rectRight || strokesRight < rectLeft || strokesBottom <= rectTop) {
            strokes[i].remove();
        }
    }    

}

function saveStorage(){
    let name=prompt("What is the name of the file to save? ");
    let canvas=document.getElementById('canvas');
    /*    console.log(JSON.stringify(canvas.innerHTML));
    console.log(JSON.stringify(canvas[0]));
    /* console.log($('#canvas')[0]); */
    /* let obj={'0':`${$('#canvas')}`}; 
    
    canvas=JSON.stringify(obj);
    console.log(canvas); */ 
    localStorage.setItem(name,`${canvas.innerHTML}`);
}

function loadStorage(){
    let canvas=document.getElementById('canvas');
    let name=prompt("What is the name of the file to load? ");
    //getItem

    console.log(localStorage.getItem(name));
    canvas.innerHTML=localStorage.getItem(name);
}


//changeable variables
var color = "blue";
var degree = 0;
var shape = 0;
$('<style>.activateShape { background-color: '+color+'; }</style>').appendTo('body');



//var size = 10;
var wrapper = document.createElement('div');
wrapper.id = 'wrap';
document.body.append(wrapper);

//create leftbar
var leftBar = document.createElement('div');
leftBar.id = 'leftBar';
wrapper.appendChild(leftBar);

//row - change color
var row = document.createElement('div');
row.id = 'rowOne';
row.className = 'row';
leftBar.appendChild(row);
var rowOne = document.getElementById('rowOne');
var boxRed = document.createElement('button');
var boxGreen = document.createElement('button');
boxRed.className = "box";
boxRed.style.backgroundColor = 'red';
boxGreen.className = "box";
boxGreen.style.backgroundColor = 'green';
rowOne.appendChild(boxRed);
rowOne.appendChild(boxGreen);

//row - change color
var row = document.createElement('div');
row.id = 'rowTwo';
row.className = 'row';
leftBar.appendChild(row);
var rowTwo = document.getElementById('rowTwo');
var boxBlue = document.createElement('button');
var boxYellow = document.createElement('button');
boxBlue.className = "box activate";
boxBlue.style.backgroundColor = 'blue';
boxYellow.className = "box";
boxYellow.style.backgroundColor = 'yellow';
rowTwo.appendChild(boxBlue);
rowTwo.appendChild(boxYellow);

//row - change size
var row = document.createElement('div');
row.id = 'rowThree';
row.className = 'row';
row.style.display = "flex";
leftBar.appendChild(row);
var rowThree = document.getElementById('rowThree');
var input = document.createElement('input');
var label = document.createElement('label');
label.innerHTML = "Cursor Size ";
label.style.marginRight = '4px';
input.type = 'number';
input.id = 'in';
input.min = 5;
input.max = 50;
input.value = 10;
input.style.height = 20;
rowThree.appendChild(label);
rowThree.appendChild(input);

//row - eraser
var row = document.createElement('div');
row.id = 'rowFour';
row.className = 'row';
row.style.display = "flex";
leftBar.appendChild(row);
var rowFour = document.getElementById('rowFour');
var image = document.createElement('button');
image.style.width = '100%';
image.style.height = '100%';
image.style.backgroundColor = "lightblue";
image.style.backgroundImage = "url(img/eraser.jpg)";
image.style.backgroundPosition = 'center';
rowFour.appendChild(image);

//row - input canvas size
var row = document.createElement('div');
row.id = 'rowFive';
row.className = 'row';
row.style.display = "flex";
row.style.flexDirection="column";
leftBar.appendChild(row);
var rowFive = document.getElementById('rowFive');
var inputW = document.createElement('input');
var labelW = document.createElement('label');
var inputH = document.createElement('input');
var labelH = document.createElement('label');
inputW.type = 'range';
inputW.id = 'inW';
inputW.max = 1000;
inputW.min = 100;
inputW.value = 500;
inputW.style.width = '90%';
labelW.innerHTML = "Enter Width";
inputH.type = 'range';
inputH.id = 'inH';
inputH.max = 1000;
inputH.min = 100;
inputH.value = 500;
inputH.style.width = '90%';
labelH.innerHTML = "Enter Height";
rowFive.appendChild(labelW);
rowFive.appendChild(inputW);
rowFive.appendChild(labelH);
rowFive.appendChild(inputH);

//row - change shape
var row = document.createElement('div');
row.id = 'rowEight';
row.style.display = "flex";
row.className = "row";
row.style.padding = '3px';
row.style.border = "none";
row.style.marginTop= '4%';
leftBar.appendChild(row);
var rowEight = document.getElementById('rowEight');
var sqr = document.createElement('div');
var circle = document.createElement('div');
sqr.className = "box activateShape ";
circle.className = "box";
sqr.style.border = "1px solid black";
sqr.style.borderRadius = "0";
circle.style.border = "1px solid black";
circle.style.borderRadius = "50%";
circle.style.marginLeft = '1px';
circle.id = "circle";
sqr.id = 'square';
rowEight.appendChild(sqr);

rowEight.appendChild(circle);

//row - clear and flip
var row = document.createElement('div');
row.id = 'rowSix';
row.className = 'row';
row.style.display = "flex";
row.style.height = 'auto';
row.style.marginBottom='3%';
leftBar.appendChild(row);
var rowSix = document.getElementById('rowSix');
var clear = document.createElement('button');
//var flip = document.createElement('button');
clear.innerHTML = "Clear Page";
clear.style.width = '50%';
//flip.innerHTML = "Flip";
//flip.style.width = '50%';
rowSix.appendChild(clear);
//rowSix.appendChild(flip);

//row - Save and load
var row = document.createElement('div');
row.id = 'rowSave';
row.className = 'row';
row.style.display = "flex";
row.style.height = 'auto';
row.style.marginBottom='3%';
leftBar.appendChild(row);
var rowSave = document.getElementById('rowSave');
var save = document.createElement('button');
var load = document.createElement('button');
save.style.width = '50%';
save.innerHTML='Save';
save.id='save';
load.style.width = '50%';
load.innerHTML='Load';
load.id='load';
rowSave.appendChild(save);
rowSave.appendChild(load);



//row - toggleOffOn Btn
var row = document.createElement('div');
row.id = 'rowSeven';
row.style.display = "flex";
row.style.height = 'auto';
row.style.justifyContent = 'center';
leftBar.appendChild(row);
var rowSeven = document.getElementById('rowSeven');
var btn = document.createElement('button');
btn.innerHTML = "Toggle Toolbar";
btn.id = 'toggle'
btn.style.backgroundColor = 'white';;
rowSeven.appendChild(btn);

let $onOff = $('#toggle');
$onOff.on('click', function () {
    let $leftBar = $('.row');
    $leftBar.slideToggle();
    $('#leftBar').toggleClass('bg-none');
})






//create canvas div
var createCanvas = document.createElement('div');
createCanvas.id = 'canvas';
createCanvas.style.width = '500px';
createCanvas.style.height = '500px';
//createCanvas.style.display='inline-block';
wrapper.append(createCanvas);

//painting
var canvas = document.getElementById('canvas');
var move = false;

canvas.addEventListener('click',paint);
canvas.addEventListener('mousedown', function (e) {
    move = true;
});

canvas.addEventListener('mouseup', function () {
    move = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (move) {
        paint(e);
    }
});

boxRed.addEventListener('click', changeColor);
boxGreen.addEventListener('click', changeColor);
boxBlue.addEventListener('click', changeColor);
boxYellow.addEventListener('click', changeColor);
image.addEventListener('click', changeColor);
inputW.addEventListener("change", setWidth);
inputH.addEventListener("change", setHeight);
clear.addEventListener('click', clearCanvas);
//flip.addEventListener('click', flipCanvas);
sqr.addEventListener('click', changeShape);
circle.addEventListener('click', changeShape);
save.addEventListener('click',saveStorage);
load.addEventListener('click',loadStorage);