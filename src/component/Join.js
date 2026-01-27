import axios from 'axios';
import React, { useState } from 'react';

function Join(props) {
   // 1. 상태 변수
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 2. 입력값 처리
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  // 3. 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 맞지 않습니다. 다시 확인하세요.');
      return;
    }

    try {
      await axios.post('http://localhost:9070/register', {
        username: form.username,
        password: form.password
      });

      setSuccess('회원가입이 완료되었습니다.');
      setForm({
        username: '',
        password: '',
        confirmPassword: ''
      });

    } catch (err) {
      setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다');
    }
  };
  return (
    <main>
      <section>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="username">아이디 : </label>
            <input type="text"id='username' name='username' placeholder='아이디' value={form.username} onChange={handleChange} required/>
          </p>
          <p>
            <label htmlFor="password">패스워드 : </label>
            <input type="password" name="password" id="password" value={form.password} onChange={handleChange} required  placeholder='비밀번호'/>
          </p>
          <p>
            <label htmlFor="confirmPassword">패스워드 확인 : </label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="비밀번호 확인"
            />
          </p>
          <p>
            <button type='submit'>회원가입</button>
          </p>
          {/* 회원가입 에러가 나면 빨강색으로 문자 출력 */}
          {error&& <p style={{color:'red'}}>{error}</p>}

          {/* && : 조건부 렌더링 공식 : 조건에 맞으면 출력(실행) */}

          {/* 회원가입 성공이면 초록색으로 문자 출력 */}
          {success&& <p style={{color:'green'}}>{success}</p>}
        </form>
      </section>
    </main>
  );
}

export default Join;