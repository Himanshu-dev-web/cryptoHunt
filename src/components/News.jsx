import React,{useState,CSSProperties } from 'react'
import { Select, Typography,Row,Col, Avatar, Card } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetNewsQuery } from '../services/cryptoNewsApi'
import moment from 'moment';
import { Option } from 'antd/lib/mentions';
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";
import { Audio } from  'react-loader-spinner'
import { Oval } from "react-loader-spinner";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

const { Text, Title} = Typography;
const demoImage = "https://www.bing.com/th?id=ODF.2UiZPknOYXZPC3V72DJ1Rw&pid=news"
const News = ({simplified}) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    const {data: cryptoNews ,isFetching } = useGetNewsQuery({ newsCategory , count:simplified ? 6 :100});
    const { data } = useGetCryptosQuery(100);



    if(isFetching) return <Audio
    height = "150"
    width = "150"
    radius = "9"
    color = 'green'
    ariaLabel = 'five-dots-loading'     
    wrapperStyle
    wrapperClass
  />


    return (
        
      <>
       <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.1, 0.1, 0.01]
      }}
    >
      <Row gutter={[24,24]}>
      {!simplified && (
            <Col span={24}>
                <Select showSearch
                    className='select-news'
                    placeholder="Select a Crypto"
                    optionFilterProp='children'
                    onChange={(value) => setNewsCategory(value)}
                    filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
                >
                <Option value="Cryptocurrency">CryptoCurrency</Option>
                {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                </Select>
            </Col>   
        )}
                { cryptoNews?.value.map((news,i) => (
                        <Col xs={24} sm={12} lg={8} key={i}>
                            <Card hoverable className='news-card'>
                                <a href={news.url} target="_blank" rel="noreferrer">
                                    <div className='news-image-container'>
                                        <Title className='news.title' level={4}>{news.name}</Title>
                                        <img style={{ maxwidht:'200px', maxHeight:'100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="img not found"/>
                                    </div>
                                    <p>
                                        {news.description > 100 ? `${news.description.substring(0,100)}...`: news.description }
                                    </p>
                                    <div className='provider-container'>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                        <Text className='provider-name' >{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text >{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                                </a>
                            </Card>
                        </Col>
                    ))
                }
      </Row>
      </motion.div>
      </>
    )
}

export default News
