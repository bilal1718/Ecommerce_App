import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/card.css';
import {useParams} from "react-router-dom"
import Navbar from "./Navbar";
import { updateQuantity } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { incrementByAmount } from '../redux/counterReducer';


export default function CardDetail({cartCount,currentPosts,setData,updateCartCount}){
  const dispatch=useDispatch()
    const params=useParams()
    const [productDetail, setProductDetail] = React.useState([]);
        React.useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then(res => res.json())
        .then(data => setProductDetail(data))
    },[params.id])
    if (!productDetail) {
      return <p>Loading...</p>;
    }
    const handleAddToCart = (productId) => {
      const updatedData = currentPosts.map(product => {
        if (product.id === productId) {
          product.inCart = true;
          product.quantity += 1; 
          dispatch(updateQuantity({ productId, newQuantity: product.quantity }));
          dispatch(incrementByAmount(product.quantity))
        }
        return product;
      });
      setData(updatedData);
      updateCartCount();
    };
    const { id,image, title,description, price, category } = productDetail;
  
    return (
      <div>
        <Navbar cartCount={cartCount} />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container pt-4 col-md-12 mb-4">
          <div className="row justify-content-center mb-4">
            <div className="col-md-8 col-xl-10">
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <img
                          src={image}
                          className="w-100"
                          alt={title}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5>{title}</h5>
                    
                      <p className="mb-4 mb-md-0">
                        {description}
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">${price}</h4>
                      </div>
                      <h6 className="text-success text-capitalize">{category}</h6>
                      <div className="d-flex flex-column mt-4">
                        <button
                          className="linkBtn btn btn-outline-primary btn-sm mt-2"
                          type="button"
                        >
                        
                    <a href="#"className='link' onClick={()=> handleAddToCart(id)}>
                    Add to Cart
                    </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }
