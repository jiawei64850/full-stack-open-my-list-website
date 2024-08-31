import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Users = () => {
  const [users, setusers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(result => setusers(result.data))
      .catch(e => console.log(e))
  }, [])

  const remove = (id) => {
    axios.delete('http://localhost:3001/deleteUser/' + id)
      .then(
        result => {
          console.log(result)
          window.location.reload()
        })
      .catch(e => console.log(e))
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => {
                return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                      <button className="btn btn-danger" onClick={(e) => remove(user._id)}>delete</button>
                  </td>
                </tr>
              )})
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users;