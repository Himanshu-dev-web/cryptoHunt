import React,{useState, useEffect} from 'react'
import { Button , Menu, Typography , Avatar } from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import { HomeOutlined,LogoutOutlined,LoginOutlined ,AlignRightOutlined, MoneyCollectOutlined,BulbOutlined ,FundOutlined,MenuOutlined } from '@ant-design/icons'
import icon from '../image/cryptocurrency.png'
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);
    
    const handleLogout = async () => {
     
      try {
        await logOut();
        navigate('/signin');
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 700) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

 
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size/>
                <Typography.Title level={2} className="logo" >
                    <Link to="/" style={{"color":"#FFC23C","textDecorationLine":"overline"}}> CryptoHunter</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>< AlignRightOutlined /></Button>
            </div>
            {activeMenu && (
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined/>}>
                    <Link to="/cryptocurrencies">cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined/>}>
                    <Link to="/news">News</Link>
                </Menu.Item>
                {user?.email ? (    
                  <div >
                <Menu.Item    onClick={handleLogout} icon={<LogoutOutlined/>}>
                  Logout
                </Menu.Item>
                </div>
                ) : (
                  <div>
                  <div>
                <Menu.Item icon={<LoginOutlined />}>
                    <Link to="/signin">
                     Sign In
                    </Link>
                </Menu.Item>
                </div>
                <div>
                <Menu.Item icon={<LoginOutlined />}>
                    <Link to="/signup">
                      Sign Up
                    </Link>
                </Menu.Item>
                </div>
                </div>
                )}
            </Menu>
            )}
        </div>
    )
}

export default Navbar
