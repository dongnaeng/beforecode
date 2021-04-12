import React from 'react'
import {Icon,Col,Card,Row,Carousel} from 'antd';
function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay >
           {props.images.map((image,index)=>(
               <div key={index}
               >
                   <img style={{width:'100%', maxHeight:'80px'}} 
                   
                   src={`http://www.dongnaeng.com:5000/${image}`}></img>

               </div>

           ))}

        </Carousel>
        </div>
    )
}

export default ImageSlider
