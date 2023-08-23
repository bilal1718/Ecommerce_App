import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/slider.css"
import { Carousel } from 'react-bootstrap';
import img1 from "../Images/img.jpg";
import img2 from "../Images/img2.jpg";
import img3 from "../Images/img3.jpg";
import img4 from "../Images/img4.jpg";
import img5 from "../Images/img5.jpg";

class ImageSlider extends React.Component {
  render() {
    return (
      <div className="slider-container">
        <Carousel wrap={true} indicators={false}>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={img1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={img2}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={img3}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={img4}
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={img5}
              alt="Third slide"
            />
          </Carousel.Item>
          
        </Carousel>
      </div>
    );
  }
}

export default ImageSlider;
