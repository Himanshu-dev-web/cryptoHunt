import React from 'react'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Layout , Typography, Space } from 'antd';
import { Navbar , Cryptodetails,Cryptocurrencies, News,HomePage}  from './components';
import './app.css'
import { AuthContextProvider } from './context/AuthContext';
import Signup from './components/Signup';
import Signin from './components/Signin';
import ProtectedRoute from './components/Protectedroute';

function App() {
  return (
    <>
    <AuthContextProvider>
    <div className="app">
      <div className='navbar'>
        <Navbar/>
      </div>
      <div className='main'>   
        <Layout>
            <div className='routes'>

              <Routes>
              <Route path="/" element={<HomePage/>} />
             
              <Route path="/cryptocurrencies" element={<ProtectedRoute><Cryptocurrencies/></ProtectedRoute>} />
              <Route path="/crypto/:coinId" element={  <ProtectedRoute><Cryptodetails/></ProtectedRoute>} />
              <Route path="/news" element={ <ProtectedRoute><News/></ProtectedRoute>} />
              <Route  path='/signup' element={ <Signup/>} />
              <Route  path='/signin' element={ <Signin/>} />

              </Routes>
              
            </div>
        </Layout>  

      <div className='footer'>
         <Typography.Title level={5} style={{color: 'white', textAlign:'center'}}>
            CryptoHunter <br/>
            All Rights Reserved.
         </Typography.Title>
         <Space >
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">cryptocurrencies</Link>
            <Link to="/news">News</Link>
         </Space>
         </div>

      </div>
    </div>
    </AuthContextProvider>
    </>
  );
} 

export default App;
