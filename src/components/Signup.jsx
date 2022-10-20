import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Button, Checkbox, Form, Input } from 'antd';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, signUp } = UserAuth();
    const navigate = useNavigate()
  
    const [error, setError] = useState('')

    
    const handleSubmit = async (e) => {
        if (e && e.preventDefault) { // add?
            e.preventDefault();
            e.persist();
        }
        
        try {
          await signUp(email, password);
          navigate('/')
        } catch (error) {
            setError(error.message)
          console.log(error);
        }
    };   

 
    return (
        <>
        <div style={{"display":"flex" , "flexDirection":"column","padding-top":"6rem","padding-bottom":"6rem"}}>
        <h2 style={{"textAlign":"center","padding":"2.5rem","fontWeight":"bolder","textDecorationLine":"overline"}}>Sign Up</h2>
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
            message: 'Please input your user-email!',
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
          Sign Up
        </Button>
        
      </Form.Item>

      <Form.Item 
      wrapperCol={{
          offset: 8,
          span: 16,
        }}>
      <span>Already Have Account</span>{'  '}
                <Link to='/signin'>Sign In</Link>
      </Form.Item>

    </Form>
    </div>
        </>
    )
}

export default Signup
