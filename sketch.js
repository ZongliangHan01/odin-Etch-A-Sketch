const container = document.querySelector(".Container");
const clear = document.querySelector(".clear");
const colorPicker = document.querySelector(".colorPicker");
const erase = document.querySelector(".erase");
const sizeSlider = document.querySelector(".sizeSlider");
const sizeValue = document.querySelector(".sizeValue");
const selects = document.querySelectorAll(".select");
const modes = document.querySelectorAll(".mode");

const event = document.createEvent("Event");
const backgroundColor = '#f0eee6'

let markMode = "mark";
let mouseDown = false;

//detect if mouse is down or up
document.body.onmousedown = () =>{mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

//clear the canvas after click clear button
clear.addEventListener("click", setGrid);

//erase the drawing after choose erase button
erase.addEventListener("click", ()=>{
    markMode = "erase";    
})

//change drawing mode to color or rainbow
modes.forEach(mode => {
    mode.addEventListener("click", changeMode)
})

//change size of grid in the canvas
sizeSlider.addEventListener("change", setGrid);
sizeSlider.addEventListener("mousemove", (e)=>{
    sizeValue.textContent = `${e.target.value} x ${e.target.value}`;
});

//initiate canvas at start
event.initEvent("change", false, false);
sizeSlider.dispatchEvent(event);

//display chosen button
selects.forEach(select=> {
    select.addEventListener("click", selected);
});




//add "selected" class to the selected button
function selected(e) {
    selects.forEach(select => {
        select.classList.remove("selected");
    })
    e.target.classList.add("selected");
} 




//switch between color and rainbow mode
function changeMode(e) {
    if (e.target.textContent == "Rainbow Mode") {
        markMode = "rainbow";
    } else if (e.target.textContent == "Color Mode") {
        markMode = "mark";
    }
}




//change the size of grid in canvas. 
function setGrid(e) {
    //delete previous grids
    removeGrid();
    
    //recreate the grid base on the new value
    const numGrid = Number(e.target.value);
    for (let i = 0; i < numGrid; i++) {
        for (let j = 0; j<numGrid; j++) {
            const div = document.createElement("div");
            div.textContent="one";
            div.classList.add("grid");
            container.appendChild(div);
            div.style.flex = `1 0 ${1/numGrid*100}%`; 
            div.style.backgroundColor = backgroundColor;   
        }
    }
    
    //add eventlistener to new grid make them know if mouse is down or moving
    const grids = document.querySelectorAll(".grid");
    //grids = document.querySelectorAll(".grid")
    grids.forEach(grid => {
        grid.addEventListener("mousemove", marked);
        grid.addEventListener("mousedown", marked);
        
    });
   
    //set updated number of grid to clear button
    clear.value = numGrid;
}




//remove current grid on the canvas. 
function removeGrid() {
    let grids = document.querySelectorAll(".grid");
    grids.forEach(grid => {
        grid.remove();
    });
}



//change color of grid based on the different mode. 
function marked(e) {
    //if mouse is not down do nothing
    if (e.type == "mousemove" && !mouseDown) {
        return;
    }
    //if it is color mode, change color of grid to color picker
    if (markMode=="mark") {
        //e.target.classList.add("marked");
        e.target.style.backgroundColor = colorPicker.value;
    //if it is erase mode, change color if gird back to background color
    } else if (markMode=="erase") {
        //e.target.classList.remove("marked");
        e.target.style.backgroundColor = backgroundColor;
    //if it is rainbow mode, change color of gird to random color
    } else if (markMode == "rainbow") {
        //e.target.classList.add("marked");
        e.target.style.backgroundColor = randomColor();
    }   
}



//generate random color
function randomColor() {
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber).toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
}


