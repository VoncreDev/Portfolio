var Canvas
var CTX

function getSecondsSinceEpoch(){
    var now = new Date()  
    var utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)  
    
    return utcMilllisecondsSinceEpoch
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function createGrid(GridSize, GridPadding){
    var ObjectAmount = (300 * 150) / GridSize
    var GridObjects = new Array(ObjectAmount).fill({})
    
    GridObjects.forEach((GridData, GridIndex) => {
        var x = (GridIndex % (300 / GridSize)) * GridSize + GridPadding / 2
        var y = Math.floor(GridIndex / (300 / GridSize)) * GridSize + GridPadding / 2

        var n = getSecondsSinceEpoch() + GridIndex * Math.sin((getSecondsSinceEpoch() / 10) * (Math.PI / 180)) / 2

        var r = Math.floor(
            Math.sin(
                (
                    Math.ceil(
                        Math.abs(255 - ((x / 143) * 255)) + n / 3
                    ) / 255
                ) * 360 * (Math.PI / 180)
            ) * 255 / 2 + 255 / 2
        )  
        var g = Math.floor(
            Math.cos(
                (
                    Math.ceil(
                        Math.abs(255 - ((y / 143) * 255)) + n / 4
                    ) / 255
                ) * 360 * (Math.PI / 180)
            ) * 255 / 2 + 255 / 2
        )   
        var b = Math.floor(
            Math.cos(
                (
                    Math.ceil(
                        Math.abs(255 - ((x / 143) * 255)) + n / 5
                    ) / 255
                ) * 360 * (Math.PI / 180)
            ) * 255 / 2 + 255 / 2
        )   
        
        CTX.fillStyle = rgbToHex(
            r,
            g,
            b
        ).toUpperCase()

        GridElement = CTX.fillRect(x, y, GridSize - GridPadding, GridSize - GridPadding)
    })
}

window.onload = async function(){
    Canvas = document.getElementById("Canvas")
    CTX = Canvas.getContext("2d")

    while (true){
        createGrid(3, 0)

        await sleep(10)
    }
}
