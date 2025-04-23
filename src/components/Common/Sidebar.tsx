"use client";

import {Button, Menu, Typography} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined, UserOutlined, SwapOutlined
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {useState} from "react";
import {useRouter} from "next/navigation";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="report-sidebar"
      width={240}
    >
      <div style={{
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'space-between',
        alignItems: 'center',
        padding: collapsed ? '16px 0' : '16px 24px',
        color: '#9ac2c2'
      }}>
        {!collapsed &&
          <Typography.Title level={4} style={{margin: 0, color: '#9ac2c2'}}>Bot Report</Typography.Title>}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
          onClick={() => setCollapsed(!collapsed)}
          style={{color: '#9ac2c2'}}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{background: 'transparent', borderRight: 0}}
      >
        <Menu.Item key="/" title="Exchanges" icon={<SwapOutlined />} className="menu-item"
                   onClick={() => router.push('/voting')}
        >
          <>Voting Server</>
        </Menu.Item>
        <Menu.Item key="/admin" title="Admin" icon={<UserOutlined/>} className="menu-item"
                   onClick={() => router.push('/admin')}
        >
          <>Admin</>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}