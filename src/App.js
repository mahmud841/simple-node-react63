import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      // fetch('https://jsonplaceholder.typicode.com/users')
      // fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])


  const handleDefault = e => {
    // console.log(nameRef.current.value);
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    // const newUser = {name, email} same as nicher line 
    const newUser = { name: name, email: email }
    //send to to the server easily 
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        //  'constent-type': 'application/json'
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        //  console.log(data);
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);

      })

    nameRef.current.value = '';
    emailRef.current.value = '';
    e.preventDefault();
  }
  return (
    <div className="App">
      <h2>Found All Users : {users.length} </h2>
      <form onSubmit={handleDefault}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="email" />
        <input type="submit" value="Submit " />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id} >
            {user.id}:{user.name} {user.email} <br /> {user.Phone} </li>)
        }
      </ul>
    </div>
  );
}

export default App;
