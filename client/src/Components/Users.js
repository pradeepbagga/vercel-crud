import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('users - ', users);

    axios.get("/users")
      .then(response => {
        console.log('API Response - ', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log('API Error - ', error)
      });

  }, []); 

  const handleDelete = (id) => {
    console.log('handle Delete - ', id);
    axios.delete(`/delete/${id}`)
    .then((res) => {
      console.log('Delete response', res)
    })
    .catch(error => {
      console.log('Delete Error - ', error)
    });
  }

  return (
    <div>
      <div><Link to="/add">Add User+</Link></div>
      {
        users.length === 0 ? <h3>No data</h3> :
          (
            <>
              <h2>Users</h2>
              <div className='users-list'>
                <div className='row row-heading'>
                  <div>Name</div>
                  <div>City</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                </div>
                {
                  users.map((item, index) => {
                    return (<div className='row' key={index}>
                      <div>{item.name}</div>
                      <div>{item.city}</div>
                      <div><Link to={`/update/${item._id}`}>Update</Link></div>
                      <div><Button variant="outlined" color="error" onClick={() => handleDelete(`${item._id}`)}>Delete</Button></div>
                    </div>)
                  })
                }
              </div>
            </>
          )
      }

    </div>
  )
}

export default Users