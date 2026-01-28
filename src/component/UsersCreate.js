import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function UsersCreate(props) {
  // 상태값 관리를 위한 함수
  // useState 안에 객체를 넣어야 하는데
  // 배열 + 대입문(=)을 쓰고 있음
  // JS 문법상도 잘못된 코드
  // 회원가입 폼은 객체로 관리해야 함
  const [form, setForm] = useState({
    user_name:'',
    user_id:'',
    user_pw:'',
    user_nickname:'',
    user_phone:'',
    user_email:''
});

  // url주소관리
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 신규가입하기 버튼 클릭시 호출되는 함수==backend 서버로 전달
  const handleSubmit=(e)=>{
    e.preventDefault();//새로고침 막기

    axios.post('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/users',form)
    .then(()=>{ //통신이 성공하면 
      alert('회원가입이 완료 되었습니다.');
      navigate('/users'); //회원 목록 페이지로 이동하기
    })
    .catch(err=>console.log(err)); //실패시 콘솔모드에 에러를 출력함
  }

  return (
    <main>
      <section>
        <h2>Users DB 입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="">이름: </label>
            <input type="text" name='user_name' value={form.user_name} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="">아이디: </label>
            <input type="text" name='user_id' value={form.user_id} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="">비밀번호: </label>
            <input type="password" name='user_pw' value={form.user_pw} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="">닉네임: </label>
            <input type="text" name='user_nickname' value={form.user_nickname} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="">전화번호: </label>
            <input type="text" name='user_phone' value={form.user_phone} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="">이메일: </label>
            <input type="email" name='user_email' value={form.user_email} onChange={handleChange} required />
          </p>
          <button>신규가입 하기</button>
        </form>
      </section>
    </main>
  );
}


export default UsersCreate;
