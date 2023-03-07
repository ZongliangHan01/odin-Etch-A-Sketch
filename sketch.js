const container = document.querySelector(".Container");
let markMode = "mark";


let mouseDown = false;
document.body.onmousedown = () =>{mouseDown = true}
document.body.onmouseup = () => {mouseDown = false}

const clear = document.querySelector(".clear");
clear.addEventListener("click", setGrid);

const colorPicker = document.querySelector(".colorPicker");


const erase = document.querySelector(".erase");
erase.addEventListener("click", (e)=>{
    if (e.target.value == "false") {
        markMode = "erase";
        e.target.textContent = "Draw";
        e.target.value = "true";
    } else {
        markMode = "mark";
        e.target.textContent = "Erase";
        e.target.value = "false";
    }
    
})

const sizeSlider = document.querySelector(".sizeSlider");
sizeSlider.addEventListener("change", setGrid);
sizeSlider.addEventListener("mousemove", (e)=>{
    //sizeValue.textContent = `${e.target.value} X ${e.target.value}`;
    sizeValue.innerHTML = `${e.target.value} x ${e.target.value}`
});

const sizeValue = document.querySelector(".sizeValue");

function setGrid(e) {
    //delete privous grids
    removeGrid();
    
    
    const numGrid = Number(e.target.value);
    for (let i = 0; i < numGrid; i++) {
        for (let j = 0; j<numGrid; j++) {
            const div = document.createElement("div");
            div.textContent="one";
            div.classList.add("grid");
            container.appendChild(div);
            div.style.flex = `1 0 ${1/numGrid*100}%`;
            
        }
    }
    let grids = document.querySelectorAll(".grid");
    grids = document.querySelectorAll(".grid")
    grids.forEach(grid => {
        grid.addEventListener("mousemove", marked);
        grid.addEventListener("mousedown", marked);
        // console.log("hello")
    });

   clear.value = numGrid;
   
}


function marked(e) {
    console.log(mouseDown)
    if (e.type == "mousemove" && !mouseDown) {
        return;
    }
    if (markMode=="mark") {
        e.target.classList.add("marked");
        e.target.style.backgroundColor = colorPicker.value;
    } else if (markMode="erase") {
        e.target.classList.remove("marked");
        e.target.style.backgroundColor = "#80ffd4"
    }
    
    
    
}

function removeGrid() {
    let grids = document.querySelectorAll(".grid");
    grids.forEach(grid => {
        grid.remove();
    });
}
