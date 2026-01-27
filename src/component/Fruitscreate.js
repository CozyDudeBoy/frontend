import axios from 'axios';
import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertContext';

function Fruitscreate(props) {

    const {setFruitsCount} = useContext(AlertContext);
  const[form, setForm] = useState({
    name:'',//과일명
    price:'',//가격
    color:'',//색상
    country:''//원산지
  });

  // url 주소 관리
  const navigate = useNavigate();
//  폼양식에 데이터를 입력하면 호출되는 함수
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
    axios.post('http://localhost:9070/fruits',form)
    .then(()=>{//통신이 성공적으로 이루어지면 
      setFruitsCount(count => count+1); //숫자 증강
    alert('상품이 정상적으로 등록 완료 되었습니다');
    navigate('/fruits'); //상품목록 페이지로 이동하기
  })
    .catch(err=> console.log(err)); //실패시 콘솔에 에러 출력
  }

  return (
    <main>
      <section>
        <h2>Fruits DB입력을 위한 페이지</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="name">과일명 : </label>
            <input type="text" name="name" id="name" value={form.name} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="price">가격 : </label>
            <input type="text" name="price" id="price" value={form.price} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="color">색상 : </label>
            <input type="text" name="color" id="color" value={form.color} onChange={handleChange} required />
          </p>
          <p>
            <label htmlFor="country">원산지 : </label>
            <input type="text" name="country" id="country" value={form.country} onChange={handleChange} required />
          </p>
          <p>
          <button type='submit'>과일 등록하기</button>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Fruitscreate;