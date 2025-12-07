const username = document.getElementById('username')
const LogoutButton = document.getElementById('logout')
const userinfoButton = document.getElementById('userinfo')
const urlusername = window.location.pathname.split('/')[2] 
document.addEventListener('DOMContentLoaded',()=>{
  console.log("이거 작동은 함?")
            username.textContent = urlusername+"의 노트"
})
LogoutButton.addEventListener('click',()=>{

        })
userinfoButton.addEventListener('click',()=>{

        })