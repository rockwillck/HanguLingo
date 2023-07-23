var mode = localStorage.getItem("mode") ? (localStorage.getItem("mode") == "dark" ? true: false) : false
setMode(document.getElementById("uiMode"))
function setMode(btn) {
    btn.innerText = mode ? "☾" : "☼"
    document.querySelector(":root").style.setProperty("--theme-color", mode ? "rgb(45, 44, 56)" : "white");
    document.querySelector(":root").style.setProperty("--font-color", mode ? "white" : "black");
    document.querySelector(":root").style.setProperty("--accent-color", mode ? "lightgray" : "gray");
}
function switchMode(btn) {
    mode = !mode
    localStorage.setItem("mode", mode ? "dark" : "light")
    setMode(btn)
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
                    document.getElementById("lessons").innerHTML += `<div class="newLesson"></div>`
                    document.getElementById("lessons").innerHTML += lesson
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

lastPassed = 0
function findMostBottom() {
    requestAnimationFrame(findMostBottom)
    i = 0
    thisTimeMostBottom = 0
    for (div of document.getElementsByClassName("newLesson")) {
        coordinate = div.offsetTop - window.scrollY
        if (coordinate <= 0) {
            if (i > thisTimeMostBottom) {
                thisTimeMostBottom = i
            }
        }
        i++
    }

    i = 0
    for (circle of document.getElementsByClassName("progressCircle")) {
        if (i == thisTimeMostBottom) {
            circle.style.transform = "rotate(0deg)"
            circle.style.width = "25vw"
            circle.style.background = `linear-gradient(to right, var(--progress-color) ${progress[i]*100}%, var(--theme-color) 0)`
            circle.innerText = document.getElementsByTagName("h2")[i].innerText
        } else {
            circle.innerText = document.getElementsByTagName("h2")[i].innerText.split(" ").map(x => /^\p{Lu}/u.test(x) ? x[0] : "").join("")
            circle.style.transform = ""
            circle.style.width = ""
            circle.style.background = `conic-gradient(var(--progress-color) ${progress[i]*100}%, var(--theme-color) 0)`
        }
        i++
    }

    if (thisTimeMostBottom > mostBottom) { 
        mostBottom = thisTimeMostBottom
        localStorage.setItem("lastLesson", mostBottom)
    }
}
findMostBottom()

function loadProgressBtns() {
    id = requestAnimationFrame(loadProgressBtns)

    if (document.getElementsByTagName("h2").length > 0) {
        titles = []
        i = 0
        for (let header of document.getElementsByTagName("h2")) {
            progressButton = document.createElement("button")
            progressButton.className = "progressCircle"
            progressButton.addEventListener("click", (e) => {
                header.scrollIntoView({behavior:"smooth"})
            })
            titles.push(progressButton)
            i++
        }
    
        document.getElementById("progressBar").innerHTML = ""
        titles.forEach((btn) => {
            document.getElementById("progressBar").appendChild(btn)
        })

        cancelAnimationFrame(id)
    }
}
loadProgressBtns()

function getMobileInfo() {
    h2s = Array.prototype.slice.call(document.getElementsByTagName("h2")).map(x => x.innerText)
    iframes = Array.prototype.slice.call(document.getElementsByTagName("iframe")).map(x => x.src)
    if (!(h2s.length > 0 && iframes.length > 0 && h2s.length == iframes.length)) {
        return ""
    } else {
        returnStringList = []
        for (i=0;i<iframes.length;i++) {
            returnStringList.push(iframes[i])
            returnStringList.push(h2s[i])
        }
        return returnStringList.join(",")
    }
}

function getQuizProgress() {
    headings = document.getElementById("lessons").querySelectorAll("h2")
    quizzesUnderHeadings = []
    for (h2 of headings) {
        let h2Quizzes = []
        let currentEl = h2
        while (currentEl.nextSibling && currentEl.nextSibling.tagName != "H2") {
            currentEl = currentEl.nextSibling
            if (currentEl.className == "quiz") {
                h2Quizzes.push([localStorage.getItem(currentEl.id) ? ((localStorage.getItem(currentEl.id).match(/1/g) || []).length) : 0, quizzes[currentEl.id].length])
            }
        }
        quizzesUnderHeadings.push(h2Quizzes)
    }
    return quizzesUnderHeadings
}
progress = []
gqp = setInterval(() => {
    progressInfo = getQuizProgress()
    if (progressInfo.length > 0) {
        progress = []
        progressInfo.forEach((section) => {
            total = 0
            completed = 0
            section.forEach((quiz) => {
                total += quiz[1]
                completed += quiz[0]
            })
            progress.push(completed/total)
        })
    }
})

function mobileGetProgress() {
    return progress
}
console.log(mobileGetProgress())