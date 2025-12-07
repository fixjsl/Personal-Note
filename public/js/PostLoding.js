document.addEventListener('DOMContentLoaded', async()=>{
     const container = document.getElementById('post')
    const url = window.location.pathname.split('/')
    const username = url[3]
    const postid = url[4]
    const api = `/api/post/${username}/${postid}`

    const result = await fetch(api)
    const postjson = await result.json()

    const post = postjson.postdata

    const titleH = document.createElement('h2')
    titleH.textContent = post.title
    titleH.className = 'title'
    container.appendChild(titleH)

    container.appendChild(document.createElement('hr'))    
    const whenP = document.createElement('p')
    whenP.className = 'when'
    whenP.textContent = `작성일 : ${post.when}`
    container.appendChild(whenP)

    const textP = document.createElement('p')
    textP.className = 'text'
    textP.textContent = post.text
    container.appendChild(textP)
    container.appendChild(document.createElement('hr'))
    



})