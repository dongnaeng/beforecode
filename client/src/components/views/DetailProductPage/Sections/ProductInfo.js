
import React from 'react';
import {Button, Descriptions} from 'antd';
import Axios from 'axios';
import{useDispatch} from 'react-redux';
import {addToCart} from '../../../../_actions/user_actions'

function ProductInfo(props) {

    const dispatch = useDispatch();
    const desc=props.detail.description && props.detail.description.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
    console.log(desc);

    const clickHandler=()=>{
        // 필요한 정보를 카트 필드에 넣는다.
        dispatch(addToCart(props.detail._id))
        alert("추가되었습니다.")
        

    }
    const clicks=()=>{
        props.ap.history.push("/");
    }
    return (
        <div>
            <Descriptions title="재료정보" bordered>
                <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="최소구매 단위">{props.detail.leastbuy}</Descriptions.Item>
                <Descriptions.Item label="응용예">{props.detail.application}</Descriptions.Item>
                <Descriptions.Item label="설명" style={{multiline:"true"}}>{desc}</Descriptions.Item>
            </Descriptions>
            <br/>
            <br/>
          
           

            <div style={{display:'flex' , justifyContent:'center'}}>
                <Button size="large" shape="round" type="danger" style={{backgroundColor:"#ffa000", border:"#ffa000"}} 
                onClick={clickHandler} >
                    냉장고에 추가
                </Button>

                <Button size="large" shape="round" type="danger" style={{backgroundColor:"#ffa000", border:"#ffa000"}} 
                onClick={clicks} >
                    돌아가기
                </Button>


            </div>
            
        </div>
    )
}

export default ProductInfo
