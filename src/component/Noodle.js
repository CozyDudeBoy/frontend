import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Noodle(props) {
// 상태변수 등록
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  // 상품 리스트 조회 (출력)
  const loadData=()=>{
    // 비동기 통신사용 
    axios
    .get('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/noodle')
    // 성공시 데이터 저장 
    .then(res=>setData(res.data))
    // 실패시 에러 출력
    .catch(err=>console.log(err))
  }
  // 함수를 작성하여 loadData ()함수 호출 
  useEffect(()=>{
    loadData();
  },[]);

  // 선택한 자료 삭제하기 
  const deleteData=(num)=>{
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios
      .delete(`http://localhost:9070/noodle/${num}`)
      .then(()=>{
        alert('삭제되었습니다.');
        loadData(); //삭제후 다시 불러와서 목록을 새로고침
      })
      .catch(err=>console.log(err))
    }
  }

  return (
    <main>
      <h2> noodle db 페이지</h2>
      <div className="table-wrapper">
        <div className='btn_group'><button onClick={()=>navigate(`/noodle/noodlecreate`)}>라면 등록하기</button></div>
        <table className="data_list">
          <thead>
            <tr>
              <th>번호</th>
              <th>라면명</th>
              <th>제조사</th>
              <th>종류</th>
              <th>가격</th>
              <th>유통기한</th>
              <th>수정/삭제</th>
            </tr>
          </thead>

          <tbody>
            {
              data.map(item=>(
                <tr key={item.num}>
                  <td>{item.num}</td>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.kind}</td>
                  <td>{Number(item.price).toLocaleString()}</td>
                  <td>{item.e_date.slice(0,10)}</td>
                  <td><button className="u_btn" onClick={()=>{
                navigate(`/noodle/noodleupdate/${item.num}`)}}>수정</button><button className="del_btn" onClick={()=>deleteData(item.num)}>삭제</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </main>
  );
}


export default Noodle;
