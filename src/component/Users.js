import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users=()=> {
  const [data, setData] = useState([]); //json데이터 받기 위해
  const navigate = useNavigate(); //url 주소 가져오기 위해


  // 1. 상품 리스트 조회(출력)
  const loadData=()=>{
    //비동기 통신 사용 
    axios
    .get('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/users')
    //성공시 데이터를 저장
    .then(res=>setData(res.data) )
    // 실패시 에러 출력
    .catch(err=>console.log(err))
  }
  
  //2. 컴포넌트 생성시 한번만 데이터 불러오기
  useEffect(()=>{
    loadData();
  },[])

  // 3. 해당 user_no에 대한 자료 삭제하기 = deleteData 함수
  const deleteData =(user_no)=>{//매개변수로 user_no값 받는다
    if(window.confirm('정말 삭제하시겠습니까?')){
      axios //서버에 delete 요청을 전송
      .delete(`http://localhost:9070/users/${user_no}`)
      // 성공일떄 아래 내용을 실행함.
      .then(()=>{
        alert('회원정보가 성공적으로 삭제 되었습니다.');
        loadData(); //데이터 삭제가 이루어지면 목록 다시 갱신해야 함.
      })
      // 실패인 경우
      .catch(err=>console.log(err));
    }
  };

  return (
    <>
      <h2>USERS PAGE</h2>
      <div className='table-wrapper'>

      <div className='btn_group'><button onClick={()=>navigate(`/users/userscreate`)}>글쓰기</button></div>
      <table className='data_list'>
        <thead >
          <tr>
            <th>NAME(이름)</th>
            <th>NICKNAME(닉네임)</th>
            <th>PHONE(전화번호)</th>
            <th>EMAIL(이메일)</th>
            <th>ROLE(등급)</th>
            {/* toLocalString = 숫자 천단위 만단위 , 해주는 . {Number(item.g_cost).toLocaleString()}*/}
            <th>메뉴(수정,삭제)</th>
          </tr>
        </thead>
      <tbody>
        {
          data.map(item=>(
            <tr key={item.user_no}>
              <td>{item.user_name}</td>
              <td>{item.user_nickname}</td>
              <td>{item.user_phone}</td>
              <td>{item.user_email}</td>
              <td>{item.user_role}</td>
              <td className='btn'><button className='u_btn' onClick={()=>navigate(`/users/usersupdate/${item.user_no}`)}>수정</button><button className='del_btn' onClick={()=>deleteData(item.user_no)}>삭제</button></td>
            </tr>
          ))
        }
      </tbody>
      </table>
      </div>
    </>
  );
}


export default Users;
