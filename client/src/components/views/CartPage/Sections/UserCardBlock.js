import React from 'react'
import "./UserCardBlock.css"

function UserCardBlock(props) {
    const renderCartImage=(images)=>{
        if(images.length>0){
            let image=images[0]
            return `http://www.dongnaeng.com:5000/${image}`
        }
    }
    const renderItems=()=>(
       
        props.products && props.products.map((product,index)=>{
           
            return(
            <tr key={index}>
                <td>
                    <img style={{width:'70px'}} alt="product"
                    src={renderCartImage(product.images)}
                    />
                </td>
                <td>
                    {product.title} 

                </td>
                <td>
                    {product.quantity} 개

                </td>
                <td>
                    {product.price} 원
                </td>
                <td>
                    <button onClick={()=>props.removeItem(product._id)}>빼기</button>
                </td>
            </tr>
        )})
    )

    return (
        <div>
            <table>
                <thead>

                
                <tr>
                    <th>사진</th>
                    <th>이름</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>빼기</th>
                </tr>
                </thead>
                <tbody>
                    {renderItems()}

                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
