import React,{useEffect, useState} from 'react'
import axios from "axios";
import { USER_SERVER } from '../../Config';
import {Button, Descriptions} from 'antd';

function OrderinfoPage() {

    
    const [Info, setInfo] = useState({});

    useEffect(() => {
        
        getInfo();
        
       
    }, []);
    const getlog = Info.history&&Info.history.map((his, index )=>{
        const ltxt=`${index}: ${his.totalprice}원 주문 `;
        const ttxt=`${index}번 주문`
        return(<div key={index}>
            <br/>
            <Descriptions title={ttxt} >
            <Descriptions.Item label={ltxt} span={1} style={{multiline:"true"}}>{his.order.map((ord)=>{return(<div>{ord.name} {ord.price}원에  {ord.quantity}개 구매 </div>)})}</Descriptions.Item>
          
            </Descriptions>
        </div>)
    }).reverse();
  
    

    const getInfo=()=>{
        axios.get(`${USER_SERVER}/info`).then(response=>{
            if(response.data.success){
                
                    setInfo(response.data.userInfo)
                console.log(response.data.userInfo)
            }else{
                alert("상품들을 가져오는데 실패 했습니다.")
            }
        })
    
    }

    return (
        <div style={{textAlign:"center",alignContent:"center", margin:'1rem auto', width:"90%"}}>
           <br/><br/> <h1>주문내역</h1>
            카카오뱅크 3333-18-3493363 하규원 으로 입금해주시면 주문완료 됩니다.
            <br/><br/>
            
               
                
                {getlog}
            

         
        </div>
    )
}

export default OrderinfoPage
