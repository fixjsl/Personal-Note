

document.addEventListener('DOMContentLoaded',()=>{
    const username = document.getElementById('username')
const LogoutButton = document.getElementById('logout')
const userinfoButton = document.getElementById('userinfo')
const write = document.getElementById('write')
const urlusername = window.location.pathname.split('/')[2] 
 
            username.textContent = urlusername+"의 노트"


LogoutButton.addEventListener('click',()=>{

        })
userinfoButton.addEventListener('click',()=>{

        })
if(write){
    write.addEventListener('click',()=>{
    window.location.href = `/posts/${urlusername}/WriteText.html`
})
}

})



