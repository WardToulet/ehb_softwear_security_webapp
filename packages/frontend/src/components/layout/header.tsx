import React, { FC } from 'react';
import { Button, Pane, Heading, Avatar, Popover, Menu, Position } from 'evergreen-ui';

const Header: FC = () => {
  return (
    <Pane display="flex" paddingX="1em" paddingY=".5em" background="tint2"> 
      <Pane flex="1" display="flex">
        <Heading size={ 800 }>TODO</Heading>
      </Pane>
      <Pane>


        <Popover 
          position={Position.BOTTOM_RIGHT}
          content={
            <Menu>
                <Menu.Item>Account</Menu.Item>
                <Menu.Item>Logout</Menu.Item>
            </Menu>
          }
        >
          <Avatar name="Ward Toulet" size={30} isSolid src="https://avatars1.githubusercontent.com/u/18327334?s=60&u=e999ee7da13441493c71c1835202868fd09ee6a2&v=4"/>
        </Popover>


      </Pane>
    </Pane>
  );
}

export default Header;
