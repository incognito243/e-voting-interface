import {Layout, Typography} from "antd";

const {Footer} = Layout;
const {Text} = Typography;

const FooterBar = () => {
  return (
    <Footer className="report-footer">
      <Text style={{color: '#999'}}>E Voting Interface ©2025 Created by incognito243</Text>
    </Footer>
  )
}

export default FooterBar;