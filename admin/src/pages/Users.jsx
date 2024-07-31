import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import Cookies from "js-cookie";
import UpdateUserForm from "../components/updateUser"; 
import AddUserForm from "../components/AddUserForm"
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
// eslint-disable-next-line 

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  document.title = "Admin | Manage Users"

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line 
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddUserClick = () => {
    setShowAddForm(true);
  };

  const handleUpdateUserClick = (user) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
  };

  const handleUserAddedOrUpdated = () => {
    fetchUsers();
    setShowAddForm(false);
    setShowUpdateForm(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
    fetchUsers();
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Root = styled("div")(
    ({ theme }) => `
    table {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }

    td,
    th {
      border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
      text-align: left;
      padding: 8px;
    }

    th {
      background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    }
    `
  );

  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }

    & .${classes.selectLabel} {
      margin: 0;
    }

    & .${classes.displayedRows} {
      margin: 0;

      @media (min-width: 768px) {
        margin-left: auto;
      }
    }

    & .${classes.spacer} {
      display: none;
    }

    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
  `;

  return (
    <div>
      <Root sx={{ maxWidth: "100%", width: "100%" }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Is Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : users
            ).map((user) => (
              <tr key={user._id}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td className="flex justify-center">
                  <button className="border-none py-1 text-lg" onClick={() => handleUpdateUserClick(user)}><MdEdit /></button>
                </td>
                <td className="flex justify-center">
                  <button className="border-none py-1 text-lg" onClick={() => handleDeleteUser(user._id)}><MdDelete /></button>
                </td>
              </tr>
            ))}
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={6} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
      <button className="text-sm mt-5" onClick={handleAddUserClick}>
        + Add User
      </button>
      {showAddForm && (
        <AddUserForm onClose={() => setShowAddForm(false)} onUserAdded={handleUserAddedOrUpdated} />
      )}
      {showUpdateForm && selectedUser && (
        <UpdateUserForm onClose={() => setShowUpdateForm(false)} onUserUpdated={handleUserAddedOrUpdated} user={selectedUser} />
      )}
    </div>
  );
}
