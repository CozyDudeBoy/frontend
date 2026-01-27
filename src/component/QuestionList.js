import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuestionList() {
  const [data, setData] = useState([]);

  const loadData = () => {
    axios.get('http://localhost:9070/api/question')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  // 날짜 데이터 포멧
  const formatData = (date) =>{
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR'); // 한국 지역날짜

  }

  return (
    <main>
      <section>
        <h2>Question List</h2>

        <table className="data_list">
          <thead>
            <tr>
              <th>ID</th>
              <th>성함</th>
              <th>휴대전화</th>
              <th>이메일</th>
              <th>문의내용</th>
              <th>접수일</th>
              <th>답변</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.content}</td>
                  <td><button>답변</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  등록된 문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}


export default QuestionList;