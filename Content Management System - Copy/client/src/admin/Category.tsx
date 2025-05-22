import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,

} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import AddCategory from "./AddCategory";

interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  createdAt: string;
  count: number;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState<boolean>(false);



  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/categories/count/category"
      );
      const fetchedCategories: Category[] = response?.data?.data || [];
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginBottom: "20px" }}
        onClick={() => setAddCategory(true)}
      >
        Add Category
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Post Count</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.categoryId}
                onClick={() => {
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{category.categoryId}</TableCell>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell>{category.categoryDescription || "-"}</TableCell>
                <TableCell>{category.count}</TableCell>
                <TableCell>
                  {new Date(category.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCategory addCategory={addCategory} setAddCategory={setAddCategory} />
    </div>
  );
};

export default Category;
