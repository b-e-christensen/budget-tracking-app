async function getApi() {
    fetch('https://newsapi.org/v2/everything?q=finance+personal&language=en&apiKey=043db38b8cec4ff9a5a9337db68f65b7')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
    for (let i = 0; i < 20; i++) {
        const element = data.articles[i];

        let parentDiv = document.getElementById('append-to')

        let aTag = document.createElement('a')
        aTag.classList.add('display-flex', 'col-9', 'align-center', 'justify-center')
        aTag.setAttribute('href', element.url)
        aTag.setAttribute('target', '_blank')
        let outisdeDiv = document.createElement('div')
        outisdeDiv.classList.add('card', 'display-flex', 'justify-center')
        outisdeDiv.setAttribute('width', '100%')
        let img = document.createElement('img')
        img.classList.add('card-img', 'col-4')
        img.setAttribute('src', element.urlToImage)
        img.setAttribute('alt', 'Image taken from article\'s website')
        let insideDiv = document.createElement('div')
        insideDiv.classList.add('col-5', 'display-flex', 'flex-column', 'align-center', 'justify-center')
        let hTitle = document.createElement('h4')
        hTitle.textContent = element.title


        parentDiv.appendChild(aTag)
        aTag.appendChild(outisdeDiv)
        outisdeDiv.appendChild(img)
        outisdeDiv.appendChild(insideDiv)
        insideDiv.appendChild(hTitle)
    }
    
    })
}
getApi()