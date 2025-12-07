


document.addEventListener('DOMContentLoaded',  async ()=>{
    const url = '/api/RootPage/usertable'

    const result = await fetch(url)

    const userjson = await result.json()
    const userdata = userjson.userdata
    const tableBody = document.getElementById('userTableBody')
    if (Array.isArray(userdata)) {
        userdata.forEach(user => {
            const newRow = tableBody.insertRow() 
            const idCell = newRow.insertCell()
            idCell.textContent = user.uid


            const nicknameCell = newRow.insertCell()
            nicknameCell.textContent = user.username
            const PostNCell = newRow.insertCell()
            PostNCell.textContent = user.PostN
            const isLoginCell = newRow.insertCell()

            isLoginCell.textContent = user.isLogged ? "O" : "X"

            const deletebutton = newRow.insertCell()
            deletebutton.textContent = '회원 삭제'

            deletebutton.addEventListener('click',()=>{
                alert('회원을 삭제합니다')

            })
            })}
})