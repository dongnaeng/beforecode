import React,{useEffect, useState} from 'react'
import axios from "axios";
import { USER_SERVER } from '../../Config';
import {Button, Descriptions} from 'antd';

function MyinfoPage() {
  

    const [Info, setInfo] = useState({});

    useEffect(() => {
        
        getInfo();
        
       
    }, []);

    const getInfo=()=>{
        axios.get(`${USER_SERVER}/info`).then(response=>{
            if(response.data.success){
                
                    setInfo(response.data.userInfo)
               
            }else{
                alert("상품들을 가져오는데 실패 했습니다.")
            }
        })
    
    }

    return (
        <div style={{fontSize:"20px",textAlign:"center"}}>
          <br/><br/><br/><br/>
              
    

              <Descriptions title="나의정보" bordered>
                <Descriptions.Item label="이름"> {Info.name}</Descriptions.Item>
                <Descriptions.Item label="이메일">{Info.email}</Descriptions.Item>
                <Descriptions.Item label="전화번호">{Info.phone}</Descriptions.Item>
                <Descriptions.Item label="주소" >{Info.address}</Descriptions.Item>
                <Descriptions.Item label="상세주소">  {Info.addressdetail}</Descriptions.Item>
                <Descriptions.Item label="크레딧">  {Info.credit}</Descriptions.Item>
            </Descriptions>           
            
        </div>
    )
}

export default MyinfoPage
