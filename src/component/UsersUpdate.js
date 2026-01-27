import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UsersUpdate() {
  // 1. URL 파라미터
  const { user_no } = useParams();
  const navigate = useNavigate();

  // 2. 상태값 (input에서 쓰는 모든 필드 포함)
  const [form, setForm] = useState({
    user_no: '',
    user_name: '',
    user_id: '',
    user_pw: '',
    user_nickname: '',
    user_phone: '',
    user_email: ''
  });

// 3. 페이지 진입 시 회원 정보 조회 (GET)
useEffect(() => {
  axios
    .get(`http://localhost:9070/users/${user_no}`)
    .then((res) => {
      console.log('조회 결과:', res.data);
      setForm(res.data);
    })
    .catch((err) => console.log('조회 오류:', err));
}, [user_no]);

  // 4. input 값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 5. 수정 버튼 클릭 (PUT)
  const handleSubmit = (e) => {
    e.preventDefault();

axios.put(`http://localhost:9070/users/update/${user_no}`, {
  user_pw: form.user_pw,
  user_nickname: form.user_nickname,
  user_phone: form.user_phone,
  user_email: form.user_email
})
.then(() => {
  alert('회원정보가 수정 완료되었습니다');
  navigate('/users');
})
.catch((err) => console.log('수정 실패:', err));
  };

  return (
    <main>
      <section>
        <h2>Users 회원정보 수정 페이지</h2>

        <form onSubmit={handleSubmit}>
          <p>
            <label>이름: </label>
            <input type="text" name="user_name" value={form.user_name} readOnly />
          </p>

          <p>
            <label>아이디: </label>
            <input type="text" name="user_id" value={form.user_id} readOnly />
          </p>

          <p>
            <label>비밀번호: </label>
            <input
              type="password"
              name="user_pw"
              value={form.user_pw}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label>닉네임: </label>
            <input
              type="text"
              name="user_nickname"
              value={form.user_nickname}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label>전화번호: </label>
            <input
              type="text"
              name="user_phone"
              value={form.user_phone}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label>이메일: </label>
            <input
              type="email"
              name="user_email"
              value={form.user_email}
              onChange={handleChange}
              required
            />
          </p>

          <button type="submit">회원정보 수정 하기</button>
        </form>
      </section>
    </main>
  );
}

export default UsersUpdate;
