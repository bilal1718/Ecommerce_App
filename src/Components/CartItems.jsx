import PropTypes from 'prop-types';
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../redux/cartSlice"; 
import "../Styles/cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { incrementByAmount } from "../redux/counterReducer";
import { removeProduct } from "../redux/cartSlice";


const CartItems = ({ cart, productQuantities,currentPosts,setData }) => {
  const TotalPrice = React.useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + parseFloat(item.price) * (productQuantities[item.id] || 0),
      0
    );
  }, [cart, productQuantities]);
  
  const handleIncrement = (productId) => () => {
    handleQuantityChange(
      productId,
      productQuantities[productId] + 1
    );
  };
  const { quantity } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleQuantityChange = React.useCallback((productId, newQuantity) => {
    const difference = newQuantity - (productQuantities[productId] || 0);
    if (difference > 0) {
      dispatch(incrementByAmount(difference));
    }
    dispatch(updateQuantity({ productId, newQuantity }));
  }, [dispatch, productQuantities]);

  // const handleRemoveProduct = (productId) => {
  //   dispatch(removeProduct(productId)); // Dispatch the removeProduct action
    
  //   // You can update the currentPosts array to exclude the removed product
  //   const updatedPosts = currentPosts.filter((product) => product.id !== productId);
  //    setData(updatedPosts);
  // };
  
  return (
    <section className="h-100 gradient-custom">
      <div className="container py-3">
        <div className="row d-flex justify-content-center my-0">
          <div className="col-md-8">
            <div className="card-header py-3 card mb-2 bg-light">
              <h5 className="mb-0">{quantity} Items</h5>
            </div>
            {cart.map((product) => (
              <div key={product.id}  className="card mb-4">
                 {/* <button
      className="btn btn-danger delete-button"
      onClick={() => handleRemoveProduct(product.id)}
    >
      x
    </button> */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div className="bg-image hover-overlay hover-zoom ripple rounded">
                        <img
                          src={product.image}
                          className="w-100"
                          alt={product.title}
                        />
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>{product.title}</strong>
                      </p>
                      <p>${product.price}</p>
                      <p>{React.useMemo(() => {
                        return [...Array(5)].map((_, index) => (
                            <span
                             key={index}
                             className={
                             index < Math.floor(product.rating.rate) ? "star-active" : "star"
                               }
                              >
                         &#9733;
                       </span>
                            ));
  }, [product.rating.rate])}</p>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 d-flex align-items-center">
                      <div className="d-flex max-width-300">
                        <div className="form-outline">
                          <label
                            className="form-label"
                            htmlFor={`form${product.id}`}
                          >
                            Quantity
                          </label>
                          <input
                            type="number"
                            id={`form${product.id}`}
                            className="form-control"
                            value={productQuantities[product.id] || 0}
                            readOnly
                          />
                        </div>
                        <button
                          className="btn btn-primary px-3 ms-2"
                          style={{ height: '50px' }}
                          onClick={handleIncrement(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>{quantity}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${TotalPrice.toFixed(2)}</strong>
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



CartItems.propTypes = {
  cart: PropTypes.array.isRequired,
  productQuantities: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  productQuantities: state.cart.productQuantities,
});

const mapDispatchToProps = {
  updateQuantity,
  removeProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
