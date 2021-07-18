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
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                {user.name}
                ---
                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={user.deleting}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Users;
