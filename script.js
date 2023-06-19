const buttonEl = document.getElementById('btn')
const inputEl = document.getElementById('input')
const errMsgEl = document.getElementById('errorMessage')
const galleryEl = document.getElementById('gallery')
let URLS = ``

async function fetchImage(){
    URLS = ''

    if(inputEl.value > 10 || inputEl.value < 1){
        errMsgEl.style.display = 'block'
        errMsgEl.textContent = 'Enter number between 2 to 10 only'
        return
    }

    try {
        buttonEl.style.display = 'none'
        const loading = `<img scr="./images/spinner.svg"/>`
        galleryEl.innerHTML = loading
        await fetch(`https://api.unsplash.com/photos?per_page=${inputEl.value}&page=${Math.floor(Math.random()*1000)}&client_id=4XdUvFpquJ8x8uOv_jDs2J8SRhokUM4lzHN3ZO1VLYM`)
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            if (data){
                data.forEach(image => {
                    // console.log(image.urls.small);
                    URLS += `<img src=${image.urls.small} alt="image"/>`
                    console.log(URLS);
                    galleryEl.innerHTML = URLS
                    buttonEl.style.display = 'block'
                });
            }
        })

        errMsgEl.style.display = 'none'
    } catch (error) {
        errMsgEl.style.display = 'block'
        errMsgEl.innerText = 'An error happened, try again'
        console.log(error); 
        buttonEl.style.display = 'block'
    }
}

buttonEl.addEventListener('click', fetchImage)