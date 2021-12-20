import React ,{useCallback}from "react";
import { createNiceModal, NiceModal, useNiceModal } from "./NiceModal/NiceModal"
import UserForm from "./UserForm"
import APIClient from "../../APIClient";
import { Form,message } from "antd"
import { useState } from "react";

const initialValues = {name:'',job:''};

export default createNiceModal('user-modal',({id,title,user,...props})=>{ 
    const [form] = Form.useForm();
    const userModal = useNiceModal('user-modal');
    const [disableSubmit,setDisableSubmit] = useState(true);

    const info = useCallback((succeed = true) => {
        message.info(`${user?'Edited':'Added'} ${succeed? 'succeed' :'failed, please try again.'}`);
    },[user]);

     const handleOK = useCallback(async ()=>{
        form.validateFields().then(values=>{
            const execute = user ? APIClient.put(`users/${user.id}`,values): APIClient.post('users',values)
            execute.then(resp=>{
                userModal.resolve(resp.data)
                form.resetFields();
            }).catch(err=>{
                info(false)
            })
        }).catch(err=>{
            info(false)
        })
    },[form,userModal,info,user]);

    const onFieldsChange = useCallback((changedFields, allFields)=>{
        setDisableSubmit(!form.isFieldsTouched(user?void 0:true) ||
        !!form.getFieldsError().filter(({ errors }) => errors.length).length)
    },[form,user])

    return (
        <NiceModal 
            id={'user-modal'} 
            title={user ?  `Edit ${user.name}`:"Add New User"}
            okText={user ? "Update" : "Create"}
            onAsyncOk={handleOK}
            okButtonProps={{  disabled: disableSubmit}}
            >
            <UserForm {...props} user={user} form={form} onFieldsChange={onFieldsChange} initialValues={user?{
                name:user.name,
                job:user.job
            }:initialValues}/>
        </NiceModal>
    )
})