import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  Button,
  Switch,
  Box,
  Typography,
} from "@mui/material";
import { ChevronDown, Edit, Delete, FileX } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Helpers from "../Helper/Helpers";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]); // Manage products state
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllProduct();
    GetAllCategoryData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categoryInfo?.name === selectedCategory
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, selectedCategory, products]);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Get the products for the current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getAllProduct = async () => {
    try {
      const res = await Helpers("/admin/products/get", "GET", null, {}); // Pass token as argument
      if (res && res?.status) {
        setProducts(res?.data);
        console.log("hgggjhghghghghgg", res?.data);
      } else {
        console.log("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllCategoryData = async () => {
    try {
      const res = await Helpers("/admin/category/get", "GET", null, {}); // Pass token as argument
      if (res && res?.status) {
        setCategories(res?.data);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await Helpers(
          `/admin/products/delete/${id}`,
          "DELETE",
          null,
          {}
        );

        if (res) {
          getAllProduct(); // Refresh categories after deletion
          toast.success("Deleted Successfully");
        } else {
          toast.error("Failed to delete");
          console.log("Error deleting product");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // Handle switch toggle

  const handleSwitchChange = async (id) => {
    try {
      const res = await Helpers(
        `/admin/products/toggle-availability/${id}`,
        "PUT",
        null,
        {}
      );

      if (res) {
        getAllProduct(); // Refresh categories after deletion
        toast.success("Updated Successfully !");
      } else {
        toast.error("Failed to available");
        console.log("Error in available product");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleLatest = async (productId) => {
    try {
      const res = await Helpers(
        `/admin/products/toggle-latest/${productId}`,
        "POST",
        null,
        {}
      );

      if (res) {
        getAllProduct(); // Refresh categories after deletion
        toast.success("Updated Successfully !");
      } else {
        toast.error("Failed to available");
        console.log("Error in available product");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleFeatured = async (productId) => {
    try {
      const res = await Helpers(
        `/admin/products/toggle-featured/${productId}`,
        "POST",
        null,
        {}
      );

      if (res) {
        getAllProduct(); // Refresh categories after deletion
        toast.success("Updated Successfully !");
      } else {
        toast.error("Failed to available");
        console.log("Error in available product");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (data) => {
    navigate(`/admin/ProductDetails`, { state: data }); // Navigate to the ProductDetails page
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    // Call a function here to filter your products based on the selected category if needed
  };

  return (
    <div className="container mx-auto p-16 md:p-32">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="search"
          placeholder="Search By name"
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="max-w-sm w-half">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Search By Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="flex items-center space-x-2">
          <Button variant="outlined" size="small">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outlined" size="small">
            <Columns className="h-4 w-4 mr-2" />
            Columns
            <span className="ml-2 rounded-full bg-primary w-6 h-6 flex items-center justify-center text-primary-foreground text-xs">
              6
            </span>
          </Button>
        </div> */}
      </div>

      {/* Responsive Table for Larger Screens */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[80px]">
                SL
                <ChevronDown className="h-4 w-4 inline-block ml-2" />
              </TableCell>
              <TableCell>
                PRODUCT NAME{" "}
                <ChevronDown className="h-4 w-4 inline-block ml-2" />
              </TableCell>
              <TableCell>STOCKS</TableCell>
              <TableCell>LATEST</TableCell>
              <TableCell>FEATURED</TableCell>
              <TableCell>TYPE</TableCell>
              <TableCell>
                DESC <ChevronDown className="h-4 w-4 inline-block ml-2" />
              </TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts?.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                  </TableCell>
                  <TableCell>{`${product.productName.slice(
                    0,
                    20
                  )}...`}</TableCell>
                  <TableCell>
                    <Switch
                      checked={!product.available}
                      onChange={() => handleSwitchChange(product._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={product.isLatest} // Use your state management here
                      onChange={() => handleToggleLatest(product._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={product.isFeatured} // Use your state management here
                      onChange={() => handleToggleFeatured(product._id)}
                    />
                  </TableCell>
                  <TableCell>{product.categoryInfo?.name}</TableCell>
                  <TableCell>{`${product.productDisc.slice(
                    0,
                    30
                  )}...`}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(product._id)}
                      style={{ color: "red" }}
                      variant="text"
                      size="small"
                    >
                      <Delete className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <span
                style={{ color: "red", height: "100%", whiteSpace: "nowrap" }}
              >
                No Data Available...
              </span>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
      </Box>

      {/* Mobile-Friendly Card Layout */}
      <Box sx={{ display: { xs: "block", md: "none" }, padding: 2 }}>
        {paginatedProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: 2,
              marginBottom: 2,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="body2">
              Type: {product.categoryInfo?.name}
            </Typography>
            <Typography variant="body2">Desc: {product.productDisc}</Typography>

            {/* Toggle Switches */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                marginTop: 2,
                paddingY: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Switch
                  checked={!product.available}
                  onChange={() => handleSwitchChange(product._id)}
                  size="small"
                />
                <Typography variant="body2">In Stock</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Switch
                  checked={product.isLatest}
                  onChange={() => handleToggleLatest(product._id)}
                  size="small"
                />
                <Typography variant="body2">Latest</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Switch
                checked={product.isFeatured}
                onChange={() => handleToggleFeatured(product._id)}
                size="small"
              />
              <Typography variant="body2">Featured</Typography>
            </Box>
            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{ marginLeft: "auto" }}
                onClick={() => handleEditClick(product.id)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={() => onDelete(product._id)}
                variant="text"
                color="error"
                size="small"
              >
                <Delete className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </Box>
          </Box>
        ))}

        {/* Pagination Controls */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography variant="body2">
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
      </Box>
    </div>
  );
}
