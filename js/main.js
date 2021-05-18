async function getData(url) {

    const response = await fetch(url, {
        method:"GET",
    })
    const data = await response.json()
    return data
}

function initDelete() {
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
}
async function getImage(url) {

    const response = await fetch(url, {
        method:"GET",
    })
    const data = await response.json()
    return data
}

let allOfEm = []
let container = document.querySelector(".container")
let id = 1
switch  (window.location.pathname) {
    case "/index.html":
        id = 1

        getData("https://12u.ad6.myftpupload.com//wp-json/wp/v2/posts?per_page=12").then(data => {
            for (let i = 0; i < data.length; i++){
                let dest = data[i]
                const imageLinkLocation = dest._links["wp:attachment"][0].href
                const idofpage = dest.id
                getImage(imageLinkLocation).then(data => {
                    let image = data[0].source_url
                    let json = {image: image, id: idofpage}
                    allOfEm.push(json)
                    let title = dest.title.rendered
                    title = title.replace("Destination ", "")

                    let format = `
                    <div class="travelcard${id}">
                        <a href=blogpage.html?id=${idofpage} style="">
                            <img src="${image}" alt="Picture of ${title}">
                        </a>
                        <h3>${title}</h3>
                    </div>`

                    if (id <= 2) {
                        container = document.querySelector(".container")
                    } else if (id <= 6) {
                        container = document.querySelector(".tdcontainer")
                    } else {
                        container = document.querySelector(".pjcontainer")
                    }

                    container.innerHTML += format
                    id++


                })

            };
        });

        break
    case "/ListOfBlogs.html":
        id = 1
        getData("https://12u.ad6.myftpupload.com//wp-json/wp/v2/posts?per_page=12").then(data => {
            for (let i = 0; i < data.length; i++){
                let dest = data[i]
                const imageLinkLocation = dest._links["wp:attachment"][0].href
                const idofpage = dest.id
                getImage(imageLinkLocation).then(data => {
                    let image = data[0].source_url
                    let title = dest.title.rendered
                    title = title.replace("Destination ", "")

                    let format = `
                    <div class="travelcard${id}">
                        <a href=blogpage.html?id=${idofpage}>
                            <img src="${image}" alt="Picture of ${title}">
                        </a>
                        <h3>${title}</h3>
                    </div>`

                    if (id <= 2) {
                        container = document.querySelector(".container")
                    } else if (id <= 6) {
                        container = document.querySelector(".tdcontainer")
                    } else {
                        container = document.querySelector(".pjcontainer")
                    }

                    container.innerHTML += format
                    id++
                })
            };
        }); 
        break
        case "/About.html":
            id = 3
            getData("https://12u.ad6.myftpupload.com//wp-json/wp/v2/posts?categories=30").then(data => {
                for (let i = 0; i < data.length; i++){
                    let dest = data[i]
                    const imageLinkLocation = dest._links["wp:attachment"][0].href
                    const idofpage = dest.id
                    getImage(imageLinkLocation).then(data => {
                        let image = data[0].source_url
                        let title = dest.title.rendered
                        title = title.replace("Destination ", "")
    
                        let format = `
                        <div class="travelcard${id}">
                            <a href=blogpage.html?id=${idofpage}>
                                <img src="${image}" alt="Picture of ${title}">
                            </a>
                            <h3>${title}</h3>
                        </div>`
    
                        container = document.querySelector(".tdcontainer")

    
                        container.innerHTML += format
                        id++
                    })
                };
            }); 
            break

}

setTimeout(() => {
    parent1 = document.querySelector(".container")
    tc1 = document.querySelector(".travelcard1")
    tc2 = document.querySelector(".travelcard2")
}, 750);

async function getDataForCarousel(id, id2) {
    const response = await fetch(`https://12u.ad6.myftpupload.com//wp-json/wp/v2/posts/${id}`, {
        method:"GET",
    })
    const num1 = await response.json()

    const response2 = await fetch(`https://12u.ad6.myftpupload.com//wp-json/wp/v2/posts/${id2}`, {
        method:"GET",
    })
    const num2 = await response2.json()

    const obj = {num2: num2, num1: num1}
    return obj
}

let pos = 1
let id1
let id2
function next() {
    initDelete()
    tc1.remove()
    tc2.remove()
    pos = pos + 2
    console.log(allOfEm[pos])
    id1 = allOfEm[pos].id
    id2 = allOfEm[pos + 1].id
    getDataForCarousel(id1, id2).then(data => {
        console.log(id2, id1)
        Object.values(data).forEach(data => {
                let dest = data
                const imageLinkLocation = dest._links["wp:attachment"][0].href
                const idofpage = dest.id
                getImage(imageLinkLocation).then(data => {
                    let image = data[0].source_url
                    let title = dest.title.rendered
                    title = title.replace("Destination ", "")

                    let format = `
                    <div class="travelcard">
                        <a href=blogpage.html?id=${idofpage}>
                            <img src="${image}" alt="Picture of ${title}">
                        </a>
                        <h3>${title}</h3>
                    </div>`
                    tc1 = document.querySelector(`.travelcard`)
                    parent1.innerHTML += format
                    id++
                })
            })
        });

    console.log("Removed")
}

function prev() {
    tc1.remove()
    tc2.remove()
    getDataForCarousel(id1, id2).then(data => {

    })
    console.log("Removed")
}