import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
       <Menu.Item key="info">
      <a href="/introduce">동냉 소개</a>
    </Menu.Item>
   
    <Menu.Item key="mail">
      <a href="/">주문하기</a>
    </Menu.Item>
   
  </Menu>
  )
}
/* <SubMenu title={<span>Blogs</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1" >Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
*/

export default LeftMenu