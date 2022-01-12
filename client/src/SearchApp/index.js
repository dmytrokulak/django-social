import React, { useState, useEffect } from 'react';
import { config } from '../Config'

/// Allows searching for users in the system. 
/// Consists of an input field and a list of users found.
const SearchApp = () => {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setUsers(await getUsers())
    }
    loadData();
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setText(e.target.value)
    setTimeout(async () => {
      setUsers(await getUsers(e.target.value))
    }, 300);
  };

  return (
    <div>
      <div class="row input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter user's name ..."
          value={text}
          onChange={onChange}
        />
      </div>
      {users ? (
        <div className="row">
          {users.map(user => (
            <div key={user.user_id}>
              <a href={`${config.HOST}/users/${user.username}`}>
                <img
                  src={`${config.HOST}/${user.profile_picture_path}`}
                  alt={user.profile_picture_path}
                  width="150"
                  className="m-1" />
              </a>
              <div>{user.full_name}</div>
            </div>
          ))}
        </div>
      ) : <span>Loading..</span>}
    </div>
  )
}

const getUsers = async (query) => {
  const response = await fetch(`${config.HOST}/api/users${query ? '/?filters=' + query : ''}`)
  return await response.json()
}

export default SearchApp
