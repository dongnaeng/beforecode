import React,{useState} from 'react'
import {Typography,Button, Form,Input, message}from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';



const  {TextArea}=Input;
const classes=[
    {key:1 , value: "채소"},
    {key:2 , value: "육류"},
    {key:3 , value: "과일"},
    {key:4 , value: "가공식품"},
    {key:5 , value: "해산물"},
    {key:6 , value: "향신료"},
    {key:7 , value: "반찬"},
    {key:8 , value: "난류"},
    {key:9 , value: "레시피"},


]

function UploadPage(props) {

    const [Title,setTitle]=useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Class, setClass] = useState(1)
    const [Images, setImages] = useState([])
    const [Application, setApplication] = useState("")
    const [Leastbuy, setLeastbuy] = useState("")

const titleChangeHandler=(event)=>{
    setTitle(event.currentTarget.value);
}

const descriptionChangeHandler=(event)=>{
    setDescription(event.currentTarget.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    
}

const priceChangeHandler=(event)=>{
    setPrice(event.currentTarget.value);
}

const classChangeHandler=(event)=>{
    setClass(event.currentTarget.value);
}
const updateImages=(newImages)=>{
setImages(newImages);
}
const leastbuyChangeHandler=(event)=>{
    setLeastbuy(event.currentTarget.value)
}
const applicationChangeHandler=(event)=>{

    
    setApplication(event.currentTarget.value)
}

const submitHandler=(event)=>{
    event.preventDefault();

    if(!Title||!Description||!Images||!Application||!Leastbuy){
        return alert("모든값을 넣어주세요");
    }

    //서버에 채운 값을 보낸다.
    const body={
        //로그인 된 사람의 ID
        writer: props.user.userData._id,
        title:  Title,
        description: Description,
        price:Price,
        images:Images,
        application:Application,
        leastbuy:Leastbuy,
        class:Class
    }


    Axios.post("/api/product",body).then(response=>{

        if(response.data.success){
            alert('상품 업로드에 성공했습니다.');
            props.history.push('/')
        }else{
            alert('상품 업로드에 실패했습니다.');
        }
    })


}



    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2>식재료 업로드</h2>

            </div>
            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunc={updateImages}/>
                <br/>
                <br/>
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/>
                <br/>
                <label>최소구매단위</label>
                <TextArea onChange={leastbuyChangeHandler} value={Leastbuy}/>
                <br/>
                <br/>
                <label>활용예시</label>
                <TextArea onChange={applicationChangeHandler} value={Application}/>
                <br/>
                <br/>
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n')}/>
                <br/>
                <br/>
                <label>가격</label>
                <Input type="number" onChange={priceChangeHandler}  value={Price}/>
                <br/>
                <br/>
                <select onChange={classChangeHandler} value={Class}>
                    {classes.map(item=>(
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                    
                </select>
                <br/>
                <br/>
                <Button htmlType="submit">확인</Button>

            </Form>
            
        </div>
    )
}

export default UploadPage
