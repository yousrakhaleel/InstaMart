import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

function CatProductsSlider({ catID, setErrorAlert }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/v1/categories/${catID}/products`);
        const { data } = result.data;
        setProducts(data);
      } catch (error) {
        setErrorAlert(true);
        setTimeout(() => setErrorAlert(false), 5000);
      }
    };
    fetchData();
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: products.length < 5 ? products.length : 5,
    slidesToScroll: 3,
  };
  return (
    <div className="cat-products-continer">
      <h2>Related Products</h2>
      {products.length ? (
        <Slider
          className="products-slider"
          infinite={settings.infinite}
          speed={settings.speed}
          slidesToShow={settings.slidesToShow}
          slidesToScroll={settings.slidesToScroll}
        >
          {products.map((product) => (
            <div className="products-slider-card" key={product.id}>
              <img
                className="products-slider-card-image"
                src={product.imageUrl}
                alt={product.name}
              />
              <a
                href={`/product/${product.id}`}
                className="products-slider-card-name"
              >
                {product.name}
              </a>
              <p className="products-slider-card-price">
                {product.price}
                $
              </p>
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
}
CatProductsSlider.propTypes = {
  catID: PropTypes.number.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};
export default CatProductsSlider;