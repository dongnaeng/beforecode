import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler=(files)=>{
        let formData=new FormData();
        const config={
            header:{'content-type': 'multipart/fomr-data'}
        }
        formData.append("file",files[0])

        axios.post('/api/product/image',formData,config).then(response=>{

            if(response.data.success){
                console.log(response.data.filePath)

                setImages([...Images,response.data.filePath])
                props.refreshFunc([...Images,response.data.filePath]);
                


            }else{
                alert('파일을 저장하는데 실패했습니다.')
            }
        })

    }
    const deleteHandler=(image)=>{
        const currentIndex=Images.indexOf(image);
        let newImages=[...Images]
        newImages.splice(currentIndex,1);//해당 인덱스의 값을 없앰 인덱스 부터 1개 제거
        setImages(newImages)
        props.refreshFunc(newImages);
    }


    return (
        <div style={{display: 'flex', justifyContent:'space-between'}}>
           

<Dropzone onDrop={dropHandler}>
  {({getRootProps, getInputProps}) => (
    <section>

      <div style={{width:300, height:240, border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent:'center'}} 
      {...getRootProps()}>
        <input {...getInputProps()} />
        <Icon type="plus" style={{fontSize: '3rem'}}/>
        
      </div>
    </section>
  )}
</Dropzone>
<div style={{display:'flex', width:'350px',height:'240px', overflowX:'scroll'}}>
    {Images.map((image, index)=>(
        <div onClick={()=> deleteHandler(image)} key={index}>
            <img style={{minWidth:'300px', width:'300px', height: '240px'}} 
            src={`http://www.dongnaeng.com:5000/${image}`}/>
            </div>
    ))}
</div>
        </div>
    )
}

export default FileUpload
