import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/features/users";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.items);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      {loading ? ("Loading...") : (
        <table border='1'>
            <thead>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </thead>
            <tbody>
                {users.map((user) => {
                    return ( <tr key={user.id}>
                        <td>
                            {user.id}
                        </td>
                        <td>
                            {user.name}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            <button
                                onClick={() => handleDelete(user.id)}
                                disabled={user.deleting}
                            >
                                X
                            </button>
                        </td>
                    </tr>
                    )}
                )}
            </tbody>
        </table>
    )}
    </div>
)}

export default Users;
