import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NoodleUpdate(props) {

  // 1. url 경로에서 num 값을 추출하여 가져온다
  
  const {num} = useParams();

  // 2. 상태변수 
  const [form,setForm] = useState({
    name:'',
    company:'',
    kind:'',
    price:'',
    e_date:''
  });

  const navigate = useNavigate();

  // 특정 번호를 가지고 해당하는 데이터 조회
  useEffect(()=>{
    axios.get(`https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/noodle/${num}`)
    // 성공시 
    .then(res=>{
      console.log('서버 응당 값 :', res.data);
      setForm(res.data);
    })
    // 실패시
    .catch(err=> console.log('조회 오류 : ',err));
  },[num]);

  // 입력 폼에 입력지 데이터 입력을 위한 함수
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  // 수정하기 버튼 클릭시 내용 전송을 위한 함수
  const handleSubmit=(e)=>{
  e.preventDefault();//새로고침 방지 
  // 비동기 방식으로 업데이트 할 내용을 백엔드로 전달함 
  axios.put(`https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/noodle/noodleupdate/${num}`,{
    name:form.name,
    company:form.company,
    kind:form.kind,
    price:form.price,
    e_date:form.e_date
  })
  .then(()=>{ //통신이 성공적으로 이루어질 경우
    alert('상품정보가 수정 완료되었습니다');
    navigate('/noodle'); //noodle페이지로 이동하기 
  })
  .catch(//통신이 실패할 경우
    err=>console.log('수정 실패: ',err)
  );
  }
  return (
    <div>
      <section>
        <h2>noodle DB입력을 위한 페이지 </h2>
        <form onSubmit={handleSubmit}>
          <p>
              <label htmlFor="num">라면 번호</label>
              <input type="text" id='num' name='num' value={num} readOnly />
          </p>
          <p>
            <label htmlFor="name">라면명 : </label>
            <input type="text" name='name' id='name' value={form.name} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="company">제조사 : </label>
            <input type="text" name='company' id='company' value={form.company} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="kind">종류</label>
            <select name="kind" id="kind" onChange={handleChange} required>
              <option value="">종류를 선택해주세요 예: 매운맛/순한맛</option>
              <option value="M">매운맛</option>
              <option value="C">순한맛</option>
            </select>
          </p>
          <p>
            <label htmlFor="price">가격 : </label>
            <input type="text" name='price' id='price' value={form.price} onChange={handleChange} required/>
          </p>
          <p>
            <label htmlFor="e_date">유통기한</label>
            <input type="date" name='e_date' id='e_date' value={form.e_date ? form.e_date.slice(0, 10) : ''} onChange={handleChange} required />
          </p>
          <p>
            <button type='submit'>라면 등록하기</button>
          </p>
        </form>
      </section>
    </div>
  );
}


export default NoodleUpdate;
