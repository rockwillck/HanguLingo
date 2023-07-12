function scrollVertical(depth) {
    window.scrollTo({
        top:depth*window.innerHeight,
        left:0,
        behavior:"smooth"
    })
}

var mode = false
function switchMode(btn) {
    mode = !mode
    btn.innerText = mode ? "☾" : "☼"
    document.querySelector(":root").style.setProperty("--theme-color", mode ? "rgb(45, 44, 56)" : "white");
    document.querySelector(":root").style.setProperty("--font-color", mode ? "white" : "black");
    document.querySelector(":root").style.setProperty("--accent-color", mode ? "lightgray" : "gray");
}