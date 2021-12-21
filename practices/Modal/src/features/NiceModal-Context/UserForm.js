import React,{useCallback} from "react";
import APIClient from '../../APIClient'
import { Form, Input } from "antd";

const UserForm = ({user,...props}) =>{
    const nameExistsCheckRule = useCallback(({getFieldValue})=>{
        return {
            validator:(rule,value)=>(user ? Promise.resolve() : APIClient.get('users')
                .catch(err=>Promise.reject('Please submit again!'))
                .then(resp=>(resp.data.some(exist=>exist.name?.toLowerCase() === value.toLowerCase()) ? Promise.reject(`Name ${value} Already Exists!`):Promise.resolve()))
            )
        }
      },[user])

    return (
        <Form  name="user-form" {...props}>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input user name!',
                    },
                    nameExistsCheckRule
                    ]}>
                <Input/>
            </Form.Item> 
            <Form.Item label="Job" name="job"
             rules={[
                {
                    required: true,
                    message: 'Please input user job!',
                },
                ]}>
                <Input />
            </Form.Item>
        </Form>
        );
}
export default UserForm