import React, {useState,useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi';
import { motion } from "framer-motion";


const Cryptocurrencies = ({simplified }) => {
    const count = simplified ? 10 :100;
 
    const {data: cryptosList , isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    },[cryptosList,searchTerm])
      
    if(isFetching)   return 'Loading ...';
   
  
    return (
        <>
        {!simplified && (
            <div className='search-crypto'>
            <Input placeholder='Search CryptoCurrency ' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        )} 
        <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}>
            <Row gutter={[32,32]} className="crypto-card-container">
                { cryptos?.map((currency,i) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card title={`${currency.rank} . ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl}  alt="img"/>}
                            hoverable
                            >
                            <p>Price: {millify(currency.price)}</p>
                             <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {millify(currency.change)}%</p>

                            </Card>
                        </Link>
                    </Col>  
                ))}  
            </Row>
            </motion.div>
        </>
    )
}

export default Cryptocurrencies
