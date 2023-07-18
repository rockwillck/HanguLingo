var mode = false
function switchMode(btn) {
    mode = !mode
    btn.innerText = mode ? "☾" : "☼"
    document.querySelector(":root").style.setProperty("--theme-color", mode ? "rgb(45, 44, 56)" : "white");
    document.querySelector(":root").style.setProperty("--font-color", mode ? "white" : "black");
    document.querySelector(":root").style.setProperty("--accent-color", mode ? "lightgray" : "gray");
}


var latestExists = localStorage.getItem("lastLesson") != undefined
var allLessons = new Array(document.getElementById("lessons").children.length)
function resizeIframe() {
    for (let iframe of document.getElementById("lessons").children) {
        iframe.style.height = 0
        iframe.style.width = 0
        iframe.addEventListener("load", () => {
            allLessons[[].indexOf.call(iframe.parentNode.children, iframe)] = (iframe.contentWindow.document.body.innerHTML)
            if (!allLessons.includes(undefined)) {
                allLessons.forEach((lesson) => {
                    document.body.innerHTML += `<div class="newLesson"></div>`
                    document.body.innerHTML += lesson
                })
            }
        })
    }
    if (latestExists) {
        scrollToLatest()
    }
}
resizeIframe()

var mostBottom = localStorage.getItem("lastLesson") != undefined ? parseInt(localStorage.getItem("lastLesson")) : 0
localStorage.setItem("lastLesson", mostBottom)
function scrollToLatest() {
    thing = requestAnimationFrame(scrollToLatest)
    dividers = (document.getElementsByClassName("newLesson"))
    if (dividers.length != 0) {
        window.scrollTo({top:dividers[mostBottom].offsetTop, behavior:"smooth"})
        cancelAnimationFrame(thing)
    }

}

function findMostBottom() {
    requestAnimationFrame(findMostBottom)
    i = 0
    for (div of document.getElementsByClassName("newLesson")) {
        coordinate = div.offsetTop - window.scrollY
        if (coordinate < 0) {
            if (i > mostBottom) {
                mostBottom = i
                localStorage.setItem("lastLesson", mostBottom)
            }
        }
        i++
    }
}
findMostBottom()