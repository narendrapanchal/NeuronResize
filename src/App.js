import { useEffect, useState } from 'react';
import './App.css';
import FormList from './components/FormList';
function App() {
  const [userList,setUserList]=useState([]);
  const [listData,setListData]=useState([]);
  const [dataChanged,setDataChanged]=useState(true);

  useEffect(()=>{
    getUserList();
    getTodoList();
  },[dataChanged]);

  useEffect(()=>{
    getUserList();
    getTodoList();
  },[])
  function getUserList() {
    fetch("https://neuron-backend.onrender.com/user")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
          setUserList(data);
        })
        .catch(error => {
            console.error('There was a problem retrieving the user list:', error.message);
        });
}
function getTodoList() {
  fetch("https://neuron-backend.onrender.com/todo/")
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error('Network response was not ok.');
      })
      .then(data => {
        setListData(data);
      })
      .catch(error => {
          console.error('There was a problem retrieving the user list:', error.message);
      });
}

  return (
    <div className="App">
      <div className='top_div'>
        <div>{userList?.length>0&&<FormList user={userList[0]} data={listData.filter((ele)=>ele.userId===userList[0]._id)} setDataChanged={setDataChanged}/>}</div>
        <div>{userList?.length>0&&<FormList user={userList[1]} data={listData.filter((ele)=>ele.userId===userList[1]._id)} setDataChanged={setDataChanged}/>}</div>
      </div>
      <div className='bottom_div'>{userList?.length>0&&<FormList user={userList[2]} data={listData.filter((ele)=>ele.userId===userList[2]._id)} setDataChanged={setDataChanged}/>}</div>
    </div>
  );
}

export default App;
