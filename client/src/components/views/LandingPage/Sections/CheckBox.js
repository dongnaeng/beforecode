import React,{useState} from 'react'
import {Checkbox, Collapse} from 'antd';
const {Panel}=Collapse;

function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const handleToggle=(value)=>{
        // 누른 거의 인덱스 구함
        const currentIndex=Checked.indexOf(value)
        //현재 누른  checkbox가 이미 있다면
        const newChecked=[...Checked]
        if(currentIndex===-1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
    }
    const renderCheckboxList=()=>props.list&&props.list.map((value,index)=>(
        <React.Fragment key={index}>
    <Checkbox onChange={()=>handleToggle(value._id)}
    checked={Checked.indexOf(value._id)===-1?false:true} />
    <span >      {value.name} &nbsp;&nbsp; </span>
</React.Fragment>    ))
    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
    <Panel header="식품 선택" key="1">
        {renderCheckboxList()}
    </Panel>
  </Collapse>
        </div>
    )
}

export default CheckBox
