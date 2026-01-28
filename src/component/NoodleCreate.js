import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertContext';


function NoodleCreate(props) {

  const {setNoodleCount} = useContext(AlertContext);
  const [form, setForm] = useState({
    name:'',
    company:'',
    kind:'',
    price:'',
    e_date:''
  });
  // url 주소관리 
  const navigate = useNavigate();
  // 폼양식에 데이터를 입력하면 호출되는 함수 
  const handleChange=(e)=>{
    setForm({
      ...form, //기존 배열값에 추가하여 입력 
      [e.target.name]:e.target.value
    })
  }
  // 폼양식 아래 'submit'버튼 클릭시 호출되는 함수 
  const handleSubmit=(e)=>{
    e.preventDefault(); //새로고침 방지
    // 비동기로 백엔드 서버에 데이터 넘김 
    axios.post('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/noodle',form)
    .then(()=>{//통신이 성공적으로 이루어지면 
      setNoodleCount(count => count+1); //숫자 증강
    alert('상품이 정상적으로 등록 완료 되었습니다');
    navigate('/noodle');// 상품 목록 페이지로 이동하기 
    })
    .catch(err=> console.log(err)); //실패시 콘솔에 에러 출력
  }
  return (
    <div>
      <section>
        <h2>noodle DB입력을 위한 페이지 </h2>
        <form onSubmit={handleSubmit}>
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
            <input type="date" name='e_date' id='e_date' value={form.e_date} onChange={handleChange} required />
          </p>
          <p>
            <button type='submit'>라면 등록하기</button>
          </p>
        </form>
      </section>
    </div>
  );
}


export default NoodleCreate;
