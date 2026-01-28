import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookStore(props) {
    // 페이지 상태 변수 선언 
    const [currentPage, setCurrentPage] = useState(1); //초기값 1 
    const itemsPerPage = 5 ; //한 페이지당 보여지는 게시물 수

  // 상태변수 추가 
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const loadData=()=>{
    // 비동기 통신 사용 
    axios
    .get('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/bookstore')
    // 성공시 데이터를 저장 
    .then(res=>setData(res.data))
    // 실패시 에러 출력
    .catch(err=>console.log(err))
  }
  // 함수를 작성하여 loadData();함수 호출 
  useEffect(()=>{
    loadData();
  },[]);

  // 선택한 자료 삭제하기 
  const deleteData=(num)=>{
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios
      .delete(`http://localhost:9070/bookstore/${num}`)
      .then(()=>{
        alert('삭제되었습니다');
        loadData();
      })
      .catch(err=>console.log(err))
    }
  }

  // 페이지네이션 계산 - 현재 게시물 수 50/5 = 10 페이지
  // 현재 페이지의 마지막 인덱스 버호 2*5 = 10 10 번째 아이템까지 보여주겠다는 뜻
  const indexOfLast = currentPage * itemsPerPage;

  // 현재 페이지의 첫 인덱스 번호를 계산 10-5=5, 5번째부터 9번째 아이템까지 보여줍니다. 
  const indexOfFirst = indexOfLast - itemsPerPage;

  // 예: data.slice(5,10) -> data[5], data[6],data[7],data[8],data[9]만 화면에 표시
  const currentItems = data.slice(indexOfFirst,indexOfLast);

  // 전체 페이지 수 totalpage = Math.ceil(13/5) = 3, 무조건 올림
  // 예) 페이지 번호는 게시물이 13개 잇는 경우 1,2,3까지 나오도록 한다. 
  const totalPage = Math.ceil(data.length/itemsPerPage);

  // 시작번호와 끝번호 계산
  let startPage = Math.max(1, currentPage -2);
  let endPage = Math.min(totalPage, startPage + 4);

  // 만약 끝 페이지가 totalPage에 도달했으면, 시작 페이지도 다시 보정 
  startPage = Math.max(1, endPage - 4);

  // 페이지 번호 배열 (1-5고정 , 또는 totalPages까지 제한 1,2,3,4,5)
  const pageNumbers = Array.from({length:endPage-startPage+1},(_,i)=>startPage +i);

  return (
    <main>
      <section>
        <h2>4. 교보문구 DB입력/출력/삭제/수정</h2>
        <p>MYSQL DB에 있는 자료를 출력 (SELECT)하고, 자료입력(INSERT), 삭제 (DELETE), 수정 (UPDATE)하기를 실습 응용한다 - crud</p>
        <div className='table-wrapper'>

      <div className='btn_group'><button onClick={()=>navigate(`/bookstore/bookstorecreate`)}>
  등록하기
</button></div>

        <table className='data_list'>
          <caption>교보문구</caption>

          <thead>
            <tr>
              <th>code</th>
              <th>서점명</th>
              <th>지역1</th>
              <th>지역2</th>
              <th>지역3</th>
              <th>주문개수</th>
              <th>주문자</th>
              <th>주문자 번호</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            {/* backend에서 db요청하여 결과를 json으로 받아서 map 함수로 출력한다 */}
            {
              currentItems.map(item=>(
              // data.map(item=>(
                <tr key={item.num}>
                  <td>{item.num}</td>
                  <td>{item.name}</td>
                  <td>{item.area1}</td>
                  <td>{item.area2}</td>
                  <td>{item.area3}</td>
                  <td>{Number(item.book_cnt).toLocaleString()}</td>
                  <td>{item.owner_nm}</td>
                  <td>{item.tel_num}</td>
                  <td><button className='u_btn' onClick={()=>navigate(`/bookstore/bookstoreupdate/${item.num}`)}>수정</button><button className='del_btn' onClick={()=>deleteData(item.num)}>삭제</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {/* 페이지 네이션 */}
        <div style={{marginTop:'20px',textAlign:'center', width:'700px'}}>
            {/* 이전버튼 */}
              {/* <button 
              onClick={()=>setCurrentPage(currentPage -1)}
              style={{color:'#333', marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc',borderRadius:'4px',backgroundColor:'#e0e0e0'}}>이전</button> */}

              {currentPage>1&&
                <button style={{color:'#333', marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc',borderRadius:'4px',backgroundColor:'#e0e0e0'}}>이전</button>
              }
            {/* 페이지번호 배열 1,2,3,4,5 */}
              {pageNumbers.map(number=>(
                <button key={number}
                onClick={() => setCurrentPage(number)}
                style={{marginRight:'5px',backgroundColor:currentPage===number?'#4caf50':'#f0f0f0'}}>
                  {number}
                </button>
              ))}

              {currentPage<totalPage&&
                <button style={{color:'#333', marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc',borderRadius:'4px',backgroundColor:'#e0e0e0'}}>다음</button>
              }

            {/* 다음 버튼 */}
              {/* <button 
              onClick={()=>setCurrentPage(currentPage +1)}
              style={{color:'#333', marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc',borderRadius:'4px',backgroundColor:'#e0e0e0'}}>다음</button> */}
        </div>
        </div>
      </section>
    </main>
  );
}


export default BookStore;
