import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminBlogs from "../AdminBlogs";
import AdminPopularProduct from "../AdminPopularProduct";
import AdminProducts from "../AdminProducts";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.email !== "lorenz@test.com") {
      navigate("/");
    }
  }, [navigate]);

  if (localStorage.email !== "lorenz@test.com") {
    return;
  }

  return (
    <div className="admin">
      <div className="content">
        <h3>Products</h3>
        <AdminProducts />
        <br />
        <br />
        <h1>BLOGS</h1>
        <AdminBlogs />
        <br />
        <br />
        <h3>Popular of this year</h3>
        <AdminPopularProduct />
      </div>
    </div>
  );
}

export default Admin;
