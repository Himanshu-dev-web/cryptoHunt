import React from 'react'
import millify from 'millify'
import { Typography ,Row,Col, Statistic } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import ClipLoader from "react-spinners/ClipLoader";
import { UserAuth } from '../context/AuthContext';
import Signin from './Signin';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
  };
const { Title } = Typography;

const Homepage = () => {
    const { user } = UserAuth();

    const {data , isFetching } = useGetCryptosQuery(10);

    const globalStats = data?.data?.stats;
    

    if(isFetching) return  <ClipLoader color="#ffffff" loading="true" cssOverride={override} size={150} />;
    
    return (
       <>
             {user?.email ? (  
                <div>
            <Title level={2} className="heading" style={{"textDecorationLine":"overline"}}>Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Caps" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>

            <div className='home-heading-container'>
                <Title  level={2} className="home-title"> Top 10 Crypto  in the world..</Title>
                <Title  level={3} className="show-more"><Link style={{fontSize:'15px'}}  to="/cryptocurrencies">Show more..</Link></Title>
            </div>
            <Cryptocurrencies simplified/>
            <div className='home-heading-container'>
                <Title  level={2} className="home-title">Latest Crypto News..</Title>
                <Title level={3} className="show-more"><Link style={{fontSize:'15px'}}  to="/news">Show more..</Link></Title>
            </div>
            <News simplified/>
            </div>
            ) : (
                <div>
                <Signin/>
                </div>
                )}
       </>
    )
}

export default Homepage
