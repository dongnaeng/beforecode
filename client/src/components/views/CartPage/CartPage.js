

import React,{useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import {getCartItems, removeCartItem,sendOrder} from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import {Button, Descriptions} from 'antd';

function CartPage(props) {

    const dispatch=useDispatch();
const [Total, setTotal] = useState(0);
const [preTotal, setpreTotal] = useState(0);

    useEffect(() => {
        
        let cartItems=[];
       
        
        if(props.user.userData && props.user.userData.cart){
            
            if(props.user.userData.cart.length>0){
                
                props.user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)

                })
                dispatch(getCartItems(cartItems,props.user.userData.cart)).then(response=>{
                    calculateTotal(response.payload)
                })
            }
        }
        
    }, [props.user.userData])

    let calculateTotal=(cartDetail)=>{
        let total=0;
        const discount=props.user.userData &&props.user.userData.discount;
        cartDetail.map(item=>{
            total+=parseInt(item.price,10)*item.quantity;
        })
        console.log(props.user.userData)
        setpreTotal(total);
        setTotal(total*(100-discount)/100)
    }

    let removeFromCart=(productId)=>{
        dispatch(removeCartItem(productId)).then(response=>{
            if(response.payload.productInfo.length<=0){

            }
        })

    }


    let orderfood=(orderingtype)=>{
        const orderProduct= props.user.cartDetail.map((food,index)=>{return({id:`${food._id}`,name:`${food.title}`,quantity:`${food.quantity}`, price:`${food.price}`,leastbuy:`${food.leastbuy}`})
    })
    const disrate=props.user.userData &&props.user.userData.discount;
    console.log(orderProduct);
    const sendData={Ordered:orderProduct,totalprice:Total,discount:{disrate},ordertype:orderingtype};
        dispatch(sendOrder(sendData)).then(response=>{
            if(response.payload.ordersuccess){
                alert(response.payload.orderinfo + " ??????????????? 3333-18-3493363 ?????? ?????????????????? ???????????? ?????????.");
                
            }else{
                alert("????????????");
            }
        })
    }




    return (
        <div style={{width:'90%', margin:'1rem auto',alignContent:'center', justifyContent:'center'}}>
            <h3>?????? ?????????</h3>
            
            <UserCardBlock products={props.user.cartDetail } removeItem={removeFromCart} />
            <div style={{align:"center"}}>
            <div>
<h3> ???: {preTotal} ??? -- {props.user.userData &&props.user.userData.discount}% ???????????? {Total} ??? ?????????. </h3>
            </div>

<Button size="large" shape="round" type="danger"  style={{backgroundColor:"#ffa000",alignContent:'center', justifyContent:'center', border:"#ffa000"}} 
            onClick={()=>{orderfood("?????? ??????")}}>
               ?????? ????????????
            </Button>

            <Button size="large" shape="round" type="danger"  style={{backgroundColor:"#ffa000",alignContent:'center', justifyContent:'center', border:"#ffa000"}} 
            onClick={()=>{orderfood("12??? ?????? ??????")}}>
               12??? ?????? ????????????
            </Button>

            <Button size="large" shape="round" type="danger"  style={{backgroundColor:"#ffa000",alignContent:'center', justifyContent:'center', border:"#ffa000"}} 
            onClick={()=>{orderfood("5??? ?????? ??????")}}>
               ?????? 5??? ?????? ????????????
            </Button>

</div>



        </div>
    )
}

export default CartPage
