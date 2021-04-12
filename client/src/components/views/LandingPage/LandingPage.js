import React,{useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon,Col,Card,Row,Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'
import Checkbox from './Sections/CheckBox';
import {classes} from './Sections/Datas';
import{useDispatch} from 'react-redux';
import {Button, Descriptions} from 'antd';
import {addToCart} from '../../../_actions/user_actions';
import CartPage from '../CartPage/CartPage';



function LandingPage(props) {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(200)
const [Filters, setFilters] = useState({
    class:[],
    price:[]
})


  

useEffect(() => {
    let body={
        skip:Skip,
        limit:Limit
    }
    getProducts(body);
    
   
}, []);


const getProducts=(body)=>{
    axios.post('/api/product/products',body).then(response=>{
        if(response.data.success){
            
                setProducts(response.data.productInfo)
            
            

        }else{
            alert("상품들을 가져오는데 실패 했습니다.")
        }
    })

}

const loadMoreHandler=()=>{
    let limit=Limit+8;
    let body={
        skip:Skip,
        limit:limit,
        loadMore:true
    }
    getProducts(body);
    setLimit(limit)

}
const dispatch = useDispatch();
const clickHandler=(productid)=>{
    dispatch(addToCart(productid))
    alert("재료 추가 성공")
        
}
//<Meta title={product.title}description={`${product.price}원`}/>

const renderCards=Products.map((product, index
    )=>{
        const ti=`${product.title}  [${product.leastbuy}]`
       
    return(<Col lg={3} md={8} xs={8} key={index} style={{alignContent:'center', justifyContent:'center', border:"#ffa000"}}>
        
        <Card
        cover={<div style={{alignContent:'center', justifyContent:'center', border:"#ffa000"}}><a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>
       
       </div>}  style={{alignContent:'center', justifyContent:'center', border:"#ffa000"}}
        >
            <Meta title= {ti}
            description={<Button size="small" shape="round" type="danger"   
            onClick={(event)=>{clickHandler(product._id)}} 
            style={{backgroundColor:"#ffa000",alignContent:'center', align:'center', justifyContent:'center', border:"#ffa000", fontSize:"10px", width: "50px"}}
            >
                 {product.price}원
            </Button>}
            />
            </Card>
            
             </Col>) 
             
});

const showFilterResults=(filters)=>{

    let body={
        skip:0,
        limit:Limit,
        filters:filters
        
    }

    getProducts(body)
   
}

const handleFilters=(filters,category)=>{
    const newFilters={...Filters};
    newFilters[category]=filters;
    showFilterResults(newFilters)

}



    return (
        <div>
            
        <div style={{width:'90%',margin:'1rem auto'}}>
        
            
            <Checkbox list={classes} handleFilters={filters=>handleFilters(filters,"class")}/>

            <Row gutter={[16,16]} >
            {renderCards}
            </Row>
            <br/>
            <CartPage user={props.user} style={{alignContent:'center'}} />
        </div>
        
       
       
        </div>
    )
}

export default LandingPage
