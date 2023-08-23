import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/card.css';
import { Link } from 'react-router-dom';
import { updateQuantity } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import {connect} from "react-redux"
import { incrementByAmount } from '../redux/counterReducer';


 function Card({updateCartCount,updateQuantity,currentPosts,setData,firstPostIndex,lastPostIndex}) {
  const currentPostsToShow = currentPosts.slice(firstPostIndex, lastPostIndex);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredCurrentPosts =
    selectedCategory
      ? currentPostsToShow.filter((product) => product.category === selectedCategory)
      : currentPostsToShow
  const dispatch = useDispatch();
 
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
  const handleRatingClick = (productId, rating) => {
    const updatedData = currentPosts.map(product => {
      if (product.id === productId) {
        product.rating.rate = rating;
      }
      return product;
    });
    setData(updatedData);
  };
  

  return (
    <div>
    <button
      type="button"
      className={`btn ${selectedCategory === null ? "btn-dark" : "btn-light"} mt-4 mx-4 md-4`}
      onClick={() => handleCategoryClick(null)}
    >
      All
    </button>
    <button
      type="button"
      className={`btn ${selectedCategory === "men's clothing" ? "btn-dark" : "btn-light"} mt-4 mx-2 md-4`}
      onClick={() => handleCategoryClick("men's clothing")}
    >
      Men's Clothing
    </button>
    <button
      type="button"
      className={`btn ${selectedCategory === "jewelery" ? "btn-dark" : "btn-light"} mt-4 mx-2 md-4`}
      onClick={() => handleCategoryClick("jewelery")}
    >
      Jewelry
    </button>
    <button
      type="button"
      className={`btn ${selectedCategory === "women's clothing" ? "btn-dark" : "btn-light"} mt-4 mx-2 md-4`}
      onClick={() => handleCategoryClick("women's clothing")}
    >
      Women's Clothing
    </button>
    <button
      type="button"
      className={`btn ${selectedCategory === "electronics" ? "btn-dark" : "btn-light"} mt-4 mx-2 md-4`}
      onClick={() => handleCategoryClick("electronics")}
    >
      Electronics
    </button>
   
   
   <section style={{ backgroundColor: "#eee" }}>
      <div className='row'>
  {filteredCurrentPosts.map((product)=>(  
  <div className="container pt-4 col-md-12 mb-4" key={product.id}>
    <div className="row justify-content-center mb-4">
      <div className="col-md-8 col-xl-10">
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                  <img
                    src={product.image}
                    className="w-100"
                  />
                  
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <h5>{product.title}</h5>
                <div className="mt-1 mb-4 text-muted small">
                {[...Array(5)].map((_, index) => (
           <span
           key={index}
           className={
             index < Math.floor(product.rating.rate) ? "star-active" : "star"
           }
           onClick={() => handleRatingClick(product.id, index + 1)}
         >
           &#9733;
         </span>
                     ))}
                </div>
                
                <p className="text-truncate mb-4 mb-md-0">
                  {product.description}
                </p>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">${product.price}</h4>
                  
                </div>
                <h6 className="text-success text-capitalize">{product.category}</h6>
                <div className="d-flex flex-column mt-4">
                  
                  <button className="btn btn-primary btn-sm" type="button">
                  <Link to={`/CardDetail/${product.id}`} style={{color:"white", textDecoration:"none"}}>
                    Details
                    </Link>
                  </button>

                  <button 
                    className=" linkBtn btn btn-outline-primary btn-sm mt-2"
                    type="button"
                  >
                    <a href="#"className='link'  onClick={()=> handleAddToCart(product.id)}>
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
  ))}
  </div>
</section>
</div>
  )
 }
 const mapDispatchToProps = {
   updateQuantity,
 };

 export default connect(null, mapDispatchToProps)(Card);






