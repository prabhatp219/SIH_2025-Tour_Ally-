import { useEffect, useState } from "react";

function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        if (res.status === 403) {
          window.location = "/"; // not admin
        }
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {users.map(u => (
        <p key={u._id}>{u.email}</p>
      ))}
    </div>
  );
}

export default AdminPage;
