import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : '/api/users/';

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-warning">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id || idx}>
                  <th scope="row">{user.id || idx + 1}</th>
                  <td>{user.username || '-'}</td>
                  <td>{user.name || '-'}</td>
                  <td>{JSON.stringify(user)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
