import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import Cookies from "js-cookie";
import UpdateOrderForm from "../components/UpdateOrderForm";
import { MdEdit } from "react-icons/md";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  document.title = "Admin | Manage Orders"

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/order`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [API_URL]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateOrderClick = (order) => {
    setSelectedOrder(order);
    setShowUpdateForm(true);
  };

  const handleOrderUpdated = () => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/order`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
    setShowUpdateForm(false);
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
              <th>Order ID</th>
              <th>User</th>
              <th>Address</th>
              <th>Products</th>
              <th>Amount</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : orders
            ).map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.fullname}</td>
                <td>{order.address}</td>
                <td>
                  {order.products.map((item) => (
                    <div className="flex items-center" key={item.product._id}>
                      <img src={item.product.image} alt={item.product.name} width={50} />
                      <span>{item.product.name} (x{item.quantity})</span>
                    </div>
                  ))}
                </td>
                <td>{order.amount}</td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
                <td> 
                  <div className="flex justify-center">
                    <button className="text-lg" onClick={() => handleUpdateOrderClick(order)}>
                      <MdEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={7} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={7}
                count={orders.length}
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
      {showUpdateForm && selectedOrder && (
        <UpdateOrderForm onClose={() => setShowUpdateForm(false)} onOrderUpdated={handleOrderUpdated} order={selectedOrder} />
      )}
    </div>
  );
}
