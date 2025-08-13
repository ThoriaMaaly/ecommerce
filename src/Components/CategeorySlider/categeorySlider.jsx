import React,{ useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

import Slider from "react-slick";
function CategeorySlider() {
  const [allcategories, setallcategories] = React.useState(null)
 const getcategories = async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setallcategories(data.data)

  };
    useEffect(() => {
     
      getcategories();
      
    }, [])
    
 var settings = {
    dots: true,
    infinite: true,
    arrows:true,
    speed: 500,
    rows: 2,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
    return (<>
              <h2 className='h4 fw-light mb-1'>Shop Popular Categeory</h2>

       {
        

        allcategories?<Slider {...settings} >
                     
                     {allcategories.map((categ) =>{return <figure key={categ._id}>
                        <img  className='w-100' height={120} src={categ.image} alt="cookies slider image" />
                      </figure>
                       })} 
                    </Slider>:''
       } 

    
    

      
    </>
         
        
    )
}

export default CategeorySlider
