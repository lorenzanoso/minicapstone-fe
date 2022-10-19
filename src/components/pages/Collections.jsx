import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { renderLoading } from "../../utilities/loader";
import * as actionProducts from "../../redux/actions/actionProduct";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

function Collections() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const { getAllProducts } = bindActionCreators(actionProducts, useDispatch());
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    setLoading(true);

    getAllProducts().then((response) => {
      const allProducts = response.payload.filter(
        (product) => product.type === "regular"
      );

      if (activeFilter !== "ALL") {
        setProduct(
          allProducts.filter((product) => product.filter === activeFilter)
        );
        setLoading(false);
      } else {
        setProduct(allProducts);
        setLoading(false);
      }
    });
  }, [activeFilter]);

  const renderCollectionList = () => {
    return products.map((item) => (
      <div className="col-md-6 col-lg-4 col-xl-3 featured" key={item.id}>
        <div className="collection-img position-relative">
          <Link to={`/products/${item.productId}`}>
            <img
              src={
                item.imageLink
                  ? item.imageLink
                  : "https://vipha.co/wp-content/themes/vipha/images/empty-img.png"
              }
              className="w-100"
            />
          </Link>

          <span
            className="bg-primary position-absolute d-flex align-items-center 
                        justify-content-center text-white"
          >
            sale
          </span>
        </div>
        <div className="text-center">
          <div className="rating">
            <span className="text-primary">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          <p className="text-capitalize">{item.name}</p>
          <span className="fw-bold">{item.price}</span>
        </div>
      </div>
    ));
  };

  renderLoading();

  return (
    <section id="collection" className="py-5">
      <div className="container">
        <div className="title text-center">
          <h2 className="position-relative d-inline-block">New Collection</h2>
        </div>
        <div className="row g-0">
          <div className="d-flex flex-wrap mt-5 justify-content-center ">
            <button className="btn m-2" onClick={() => setActiveFilter("ALL")}>
              All
            </button>
            <button className="btn m-2" onClick={() => setActiveFilter("Best")}>
              Best Sellers
            </button>
            <button className="btn m-2" onClick={() => setActiveFilter("Feat")}>
              Featured
            </button>
            <button className="btn m-2" onClick={() => setActiveFilter("new")}>
              New Arrival
            </button>
          </div>
        </div>
        <div className="collection-list row gy-5 mt-5">
          {loading ? renderLoading() : renderCollectionList()}
        </div>
      </div>
    </section>
  );
}

export default Collections;
