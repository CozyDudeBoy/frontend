import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertContext';


function Fruits(props) {


  // 1. 상태변수 
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //초기값 1페이지
  const {setFruitsCount} = useContext(AlertContext);

  // 한페이지에 보여줄 페이지 개수 
  const itemsPerPage = 5; //한페이지에 보여질 게시물 개수

  // 글쓰기 버튼시 해당 컴포넌트 주소로 이동하기 위함 
  const navigate = useNavigate();

  // 1. 상품 리스트 조회(출력)
  const loadData=()=>{
    //비동기 통신 사용 
    axios
    .get('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/fruits')
    //성공시 데이터를 저장
    .then(res=>setData(res.data) )
          
    // 실패시 에러 출력
    .catch(err=>console.log(err))
  }
  // 함수를 작성하여 loadDAta(); 함수호출
  useEffect(()=>{
    loadData();
  },[]);

  // 선택한 자료 삭제하기
  const deleteData=(num)=>{
    if(window.confirm('정말 삭제하시겠습니까?')){

      axios
      .delete(`http://localhost:9070/fruits/${num}`)
      .then(()=>{
        alert('삭제되었습니다.');
        loadData(); //삭제후 다시 불러와서 목록을 새로고침
      })
      .catch(err=>console.log(err))
    }
  }

  // 페이지네이션 계산 공식 만들기 게시물 50개 / 5개씩 보여주겠다 = 50/5 = 5개 페이지가 나와야...현재 페이지의 마지막 인덱스 번호 2*5=10 10번째 아이템까지 보여주겠다는 뜻 
  const indexOfLast = currentPage * itemsPerPage;

  // 현재 페이지의 첫 인덱스 번호를 계산 10-5=5, 5번째부터 9번째까지 아이템을 보여주겠다는 듯
  const indexOfFirst = indexOfLast - itemsPerPage;

  //data 배열 중 현재 페이지에 해당하는 부분만 잘라서 출력해야 
  // 예) data.slice(5,10) -> data[5]~ data[9] 만 화면에 표시함 
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  // 전체 페이지 수 totalpage = Math.ceil(13/5) =3 , 무조건 올림
  const totalPage = Math.ceil(data.length/itemsPerPage);

  // 시작 번호와 끝번호 계산하기 
  let startPage = Math.max(1, currentPage-2);
  let endPage = Math.min(totalPage, startPage + 4);

  //만약에 끝페이지가 totalpage에 도달하면 시작페이지도 다시 수정
  startPage = Math.max(1, endPage - 4);

  // 페이지 번호 배열 (1~5까지 고정 )
  const pageNumbers = Array.from({length:endPage - startPage + 1},(_, i)=> startPage+i);


  return (
    <main>
      <h2>2. fruits db 페이지</h2>
      <div className='table-wrapper'>
      <div className='btn_group'><button onClick={()=>navigate(`/fruits/fruitscreate`)}>과일 등록하기</button></div>
      <table className='data_list'>
        <thead>
          <tr>
            <th>번호</th>
            <th>과일명</th>
            <th>가격</th>
            <th>색상</th>
            <th>원산지</th>
            <th>수정 / 삭제</th>
          </tr>
        </thead>
        <tbody>
        {
          data.map(item=>(
            <tr key={item.num}>
              <td>{item.num}</td>
              <td>{item.name}</td>
              <td>{Number(item.price).toLocaleString()}</td>
              <td>{item.color}</td>
              <td>{item.country}</td>
              <td className='btn'><button className='u_btn'onClick={()=>{
                navigate(`/fruits/fruitsupdate/${item.num}`)}}>수정</button><button className='del_btn' onClick={()=>deleteData(item.num)}>삭제</button></td>
            </tr>
          ))
        }
        </tbody>
      </table>
      {/* 페이지 번호 출력 */}
      <div style={{marginTop:'20px', textAlign:'center', width:'700px'}}>

        {currentPage>1&&(
          <button
          onClick={()=>setCurrentPage(currentPage-1)}
          style={{color:'#333', marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc',borderRadius:'4px',backgroundColor:'#e0e0e0'}}
          >이전</button>
        )}
        {/* 
          조건부 렌더링 공식 값이 참인 경우 && 실행할 값 
          삼항조건연산자 => 조건식?참인값:거짓인값
        */}
        {pageNumbers.map(number=>(
          <button
          key={number}
          onClick={()=>setCurrentPage(number)}
          style={{marginRight:'5px',backgroundColor:currentPage===number?'#4caf50':'#f0f0f0'}}
          >{number}</button>
        ))}
        {currentPage<totalPage&&(
          <button
          onClick={()=>setCurrentPage(currentPage+1)}
          style={{color:'#333', marginRight:'5px',padding:'5px 10px', border:'1px solid #ccc',borderRadius:'4px',backgroundColor:'#e0e0e0'}}
          >다음</button>
        )}
      </div>
        </div>
    </main>
  );
}


export default Fruits;
