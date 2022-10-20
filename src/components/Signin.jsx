import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Button, Checkbox, Form, Input } from 'antd';
import { motion } from "framer-motion";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const { user, logIn } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) { // add?
            e.preventDefault();
            e.persist();
        }
        setError('')
        try {
          await logIn(email, password)
          navigate('/')
        } catch (error) {
          console.log(error);
          setError(error.message)
        }
      };

    return (
        <>
         <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    style={{"display":"flex" , "flexDirection":"column","padding-top":"6rem","padding-bottom":"6rem"}}>
        <h2 style={{"textAlign":"center","padding":"2.5rem","fontWeight":"bolder","textDecorationLine":"overline"}}>Sign In</h2>
        {error ? <p style={{"textAlign":"center", "color":"red"}}>OOPS {error}</p> : null}
        <Form
     
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="User Email"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input 
                onChange={(e) => setEmail(e.target.value)}
               
                type='email'
                placeholder='Email'
                autoComplete='email'
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password 
             onChange={(e) => setPassword(e.target.value)}
                
                type='password'
                placeholder='Password'
                autoComplete='current-password'
        />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
      <Form.Item 
      wrapperCol={{
          offset: 8,
          span: 16,
        }}>
      <span>Not Have Account</span>{'  '}
                <Link to='/signup'>Sign Up</Link>
      </Form.Item>
    </Form>
    </motion.div>
        </>
    )
}

export default Signin
