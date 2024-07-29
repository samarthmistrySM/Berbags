import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import Cookies from "js-cookie";
import AddProductForm from "../components/AddProductForm"; 
import UpdateProductForm from "../components/UpdateProductForm";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [API_URL]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddProductClick = () => {
    setShowAddForm(true);
  };

  const handleUpdateProductClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateForm(true);
  };

  const handleProductAddedOrUpdated = () => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    setShowAddForm(false);
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
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Category</th>
              <th>Discount</th>
              <th>Sold Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : products
            ).map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td><img src={product.image} alt={product.name} width={50} /></td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.discount ?? "No discount"}</td>
                <td>{product.isSoldOut ? "Yes" : "No"}</td>
                <td> 
                  <div className="flex justify-center">
                  <button className="text-lg" onClick={() => handleUpdateProductClick(product)}>
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
                count={products.length}
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
      <button className="text-sm mt-5" onClick={handleAddProductClick}>
        + Add Product
      </button>
      {showAddForm && (
        <AddProductForm onClose={() => setShowAddForm(false)} onProductAdded={handleProductAddedOrUpdated} />
      )}
      {showUpdateForm && selectedProduct && (
        <UpdateProductForm onClose={() => setShowUpdateForm(false)} onProductUpdated={handleProductAddedOrUpdated} product={selectedProduct} />
      )}
    </div>
  );
}
