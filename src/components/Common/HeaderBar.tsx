import {Button, Space} from "antd";
import {BellOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Header} from "antd/lib/layout/layout";

const HeaderBar = () => {
  return (
    <Header className="report-header" style={{ padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Space>
        <Button type="text" icon={<BellOutlined />} style={{ color: 'white' }} />
        <Button type="text" icon={<QuestionCircleOutlined />} style={{ color: 'white' }} />
      </Space>
    </Header>
	)
}
export default HeaderBar;