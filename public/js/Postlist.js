document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('postlist'); 
    const urlusername = window.location.pathname.split('/')[2] 
    const API_URL = `/api/post/${urlusername}`; 


    async function fetchAndRenderPosts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            const postlist = data.postlist;


            
            if (postlist && postlist.length > 0) {
                const tableElement = createTableDom(postlist); 
                container.appendChild(tableElement);
            } else {
                container.textContent = '표시할 게시물이 없습니다.';
            }
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            container.textContent = '게시물 목록을 불러오지 못했습니다.';
        }
    }

    function createTableDom(data) {
        const table = document.createElement('table');
        table.className = 'post-data-table';


        const thead = document.createElement('thead');
        const headerRow = thead.insertRow();
        
        ['Post N', 'Title', 'When'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        table.appendChild(thead);


        const tbody = document.createElement('tbody');
        data.forEach(item => {
            const row = tbody.insertRow();
            

            row.insertCell().textContent = item.postN;
            

            const titleCell = row.insertCell();
            const titleLink = document.createElement('a'); 
            
            // <a> 태그의 텍스트 설정
            titleLink.textContent = item.title;
            

            titleLink.href = `/post/${item.postN}`; 

            titleCell.appendChild(titleLink);
            

            row.insertCell().textContent = item.when;
            
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        return table; 
    }

    fetchAndRenderPosts();
});