import { useState, useEffect } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

// use with user service old
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // get --> promise --> res / err
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof CanceledError) return;
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // using async await
    // const fetchUsers =async () => {
    //   try {
    //     const res = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
    //     setUsers(res.data)
    //   } catch (err) {
    //     // typescript cannot annotate types on the catch clause
    //     setError((err as AxiosError).message);
    //   }
    // }
    // fetchUsers();

    return cancel;
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    //optimistic update
    setUsers(users.filter((u) => u.id !== user.id));
    // call the server to persist the changes
    userService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);

    userService
      .createUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setUsers([...originalUsers]);
        setError(err.message);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.updateUser(updatedUser).catch((err) => {
      setUsers([...originalUsers]);
      setError(err.message);
    });
  };

  console.log(error);
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {loading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
