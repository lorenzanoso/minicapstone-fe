import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionBlog from "../redux/actions/actionBlog";

function AdminBlogs() {
  const [blogName, setBlogName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const { getAllBlogs, addBlog, deleteBlog } = bindActionCreators(
    actionBlog,
    useDispatch()
  );
  const blogList = useSelector((state) => state.blogList);

  //validation

  const [invalidBlogName, setInvalidBlogName] = useState(false);
  const [invalidAuthor, setInvalidAuthor] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfValid()) {
      const requestBody = {
        blogName: blogName,
        blogAuthor: author,
        description: description,
      };

      addBlog(requestBody);
    }
  };

  const checkIfValid = () => {
    let isValid = true;

    //check if blog name is valid
    if (blogName.match("(^$|^.*@.*..*$)")) {
      setInvalidBlogName(true);
      isValid = false;
    } else {
      setInvalidBlogName(false);
    }

    //check if author is valid
    if (author.match("(^$|^.*@.*..*$)")) {
      setInvalidAuthor(true);
      isValid = false;
    } else {
      setInvalidAuthor(false);
    }
    //check if description has input
    if (description.match("(^$|^.*@.*..*$)")) {
      setInvalidDescription(true);
      isValid = false;
    } else {
      setInvalidDescription(false);
    }

    return isValid;
  };

  function MyDropzone(blog) {
    // Callback function
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);
    }, []);

    // React Dropzone
    const { getRootProps } = useDropzone({ onDrop });

    // Return statement
    return (
      <div className="card h-100 text-center p-4">
        <img
          src={
            blog.imageLink
              ? blog.imageLink
              : "https://vipha.co/wp-content/themes/vipha/images/empty-img.png"
          }
          alt={blog.blogName}
          {...getRootProps()}
        />
        <div className="card-body">
          <h5 className="card-title mb-0">
            {blog?.blogName.substring(0, 12)}...
          </h5>
          <p className="card-text lead fw-bold">{blog.blogAuthor}</p>
          <button onClick={() => deleteBlog(blog.blogID)}>DELETE</button>
        </div>
      </div>
    );
  }

  const renderBlogs = () => {
    return (
      <>
        {blogList.map((blog) => (
          <React.Fragment key={blog.blogId}>
            <div
              className="col-md-3 mb-4"
              style={{ height: "300px", width: "250px" }}
            >
              <MyDropzone {...blog} />
            </div>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <hr />
      <Form onSubmit={handleSubmit} className="row p-3">
        {/* BLOG NAME */}
        <Form.Group controlId="formBlogName" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Name"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            isInvalid={invalidBlogName}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a valid blog name
          </Form.Control.Feedback>
        </Form.Group>

        {/* BLOG AUTHOR */}
        <Form.Group controlId="formAuthor" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            isInvalid={invalidAuthor}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Price must be a number
          </Form.Control.Feedback>
        </Form.Group>

        {/* DESCRIPTION */}
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            isInvalid={invalidDescription}
          />
          <Form.Control.Feedback type="invalid">
            Please input a product description
          </Form.Control.Feedback>
        </Form.Group>

        <div className="col-12 d-flex flex-wrap justify-content-center">
          <button
            className="bg-primary text-center text-white w-50"
            onClick={handleSubmit}
          >
            POST BLOG
          </button>
        </div>
      </Form>
      <hr />
      <h4 className="text-danger">BLOGS</h4>
      <div className="row justify-content-center">{renderBlogs()}</div>
    </>
  );
}

export default AdminBlogs;
