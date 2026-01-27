import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:9070/login',
        form
      );

      // 토큰 저장
      localStorage.setItem('token', res.data.token);

      setError('');
      alert('로그인 성공');

      // 로그인 후 이동
      navigate('/');

    } catch (err) {
      setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요');
    }
  };

  return (
    <main>
      <section>
        <h2>로그인</h2>

        <form onSubmit={handleSubmit} className="login">
          <p>
            <label htmlFor="username">아이디 :</label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="아이디"
              required
            />
          </p>

          <p>
            <label htmlFor="password">패스워드 :</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="패스워드"
              required
            />
          </p>

          <p>
            <button type="submit" id="login_btn">로그인</button>
          </p>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p>
            <Link to="/id_search">아이디 찾기 | </Link>
            <Link to="/pw_search">비밀번호 찾기 | </Link>
            <Link to="/register">회원가입</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
