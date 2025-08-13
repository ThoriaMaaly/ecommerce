import axios from 'axios'
import React, { useEffect } from 'react';
import Products from '../Products/products';
import CategeorySlider from '../CategeorySlider/categeorySlider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import Slider from "react-slick";
function Home() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (


    <>


      <div className="container p-5 overflow-hidden bg-light-main">
        <div className="row ">
          <div className="col-md-9 col-sm-12  gx-0 ">


            <Slider {...settings} className='containe'>
              <figure >
                <img className='w-100' height={400} src={require('../../Assets/Images/slider-image-3.jpeg')} alt="cookies slider image" />
              </figure>
              <figure>
                <img className='w-100' height={400} src={require('../../Assets/Images/slider-image-2.jpeg')} alt="cookies slider image" />
              </figure>
              <figure >
                <img className='w-100' height={400} src={require('../../Assets/Images/slider-image-1.jpeg')} alt="cookies slider image" />
              </figure>

            </Slider>


          </div>
          <div className='col-md-3 col-sm-12 p-0  '>
            <div className="container  p-0">
              <div className="row ">
                <figure className='my-0 col-md-12 col-sm-6'>
                  <img className='w-100' height={200} src={require('../../Assets/Images/slider-image-2.jpeg')} alt="cookies slider image" />
                </figure>

                <figure className=' col-sm-6  col-md-12 ' >
                  <img className='w-100' height={200} src={require('../../Assets/Images/slider-image-1.jpeg')} alt="cookies slider image" />
                </figure>
              </div>
            </div>


          </div>
        </div>
      </div>
      <section className="container p-5 bg-light-main mt-2">
        <CategeorySlider />

      </section>





      <Products  />





    </>

  )
}

export default Home
