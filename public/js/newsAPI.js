async function getApi() {
    fetch('/api/news')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
    // for (let i = 0; i < 20; i++) {
    //     const element = data.articles[i];

    //     let parentDiv = document.getElementById('append-to')

    //     let aTag = document.createElement('a')
    //     aTag.classList.add('display-flex', 'col-6', 'align-left', 'justify-center', 'text')
    //     aTag.setAttribute('href', element.url)
    //     aTag.setAttribute('target', '_blank')
    //     let outisdeDiv = document.createElement('div')
    //     outisdeDiv.classList.add('card', 'display-flex', 'justify-center')
    //     outisdeDiv.setAttribute('width', '100%')
        
    //     let img = document.createElement('img')
    //     img.classList.add('card-news-img')
    //     img.setAttribute('src', element.urlToImage)
    //     img.setAttribute('alt', 'Image taken from article\'s website')
        
    //     let insideDiv = document.createElement('div')
    //     insideDiv.classList.add('col-4', 'display-flex', 'flex-column', 'align-center', 'justify-center')
        
    //     let hTitle = document.createElement('p')
    //     hTitle.classList.add('news-text')
    //     hTitle.textContent = element.title


    //     parentDiv.appendChild(aTag)
    //     aTag.appendChild(outisdeDiv)
    //     outisdeDiv.appendChild(img)
    //     outisdeDiv.appendChild(insideDiv)
    //     insideDiv.appendChild(hTitle)
    // }
    
    })
}
getApi()
