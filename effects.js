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


var allLessons = new Array(document.getElementById("lessons").children.length)
function resizeIframe() {
    for (let iframe of document.getElementById("lessons").children) {
        iframe.style.height = 0
        iframe.style.width = 0
        iframe.addEventListener("load", () => {
            allLessons[[].indexOf.call(iframe.parentNode.children, iframe)] = (iframe.contentWindow.document.body.innerHTML)
            if (!allLessons.includes(undefined)) {
                allLessons.forEach((lesson) => {
                    document.body.innerHTML += lesson
                })
            }
        })
    }
}
resizeIframe()