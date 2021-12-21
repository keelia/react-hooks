import React,{ useCallback,useState,createContext,useContext } from 'react';
import { Modal } from 'antd';
import { useMemo } from 'react';
import { hideModal, showModal } from './niceModalActions';

export const NiceModalContext = createContext({state:{hiding:{}},dispatch:()=>{}})

//Use container to improve performance
export const createNiceModal=(modalId,ModalComp)=>{
    return props=>{
        const {visible,args} = useNiceModal(modalId)
        if(!visible){
            return null;
        }
        return <ModalComp  {...args} {...props}/>
    }
}

//Global Modal Template, control cancel/afterClose/Ok behavior/animation globally
export const NiceModal = ({id,children,...props})=>{
    const modal = useNiceModal(id)
    const [confirmLoading,setConfirmLoading] = useState(false)
    return (<Modal 
                confirmLoading={confirmLoading}
                onCancel={e=>{
                    modal.hide()
                }}
                onOk={async e=>{
                    setConfirmLoading(true);
                    if(props.onAsyncOk){
                        await props.onAsyncOk()
                    }
                    modal.hide();
                }}
                afterClose={e=>{
                    setConfirmLoading(false)
                    modal.hide(true)
                }}
                visible={!modal?.hiding}
                {...props}
                > 
            {children}
        </Modal>)
}

const modalCallbacks = {};
//Modal Hook to let specific modal to be accessable for whichever component in every level
export const useNiceModal = (modalId)=>{
    const {state,dispatch} = useContext(NiceModalContext);

    const {args,hiding} = useMemo(()=>({
        args:state[modalId],
        hiding:state.hiding[modalId]
    }),[state,modalId]);

    const show = useCallback((args)=>{
        return new Promise(resolve=>{
            modalCallbacks[modalId] = resolve;
            dispatch(showModal(modalId,args))
        })
    },[modalId,dispatch]);

    const hide = useCallback((force)=>{
        dispatch(hideModal(modalId,force))
    },[modalId,dispatch]);

    const resolve = useCallback((args)=>{
        if(modalCallbacks[modalId]){
            modalCallbacks[modalId](args);
            delete modalCallbacks[modalId]
        }
    },[modalId]);
    return {
        args,
        visible:!!args,
        hiding,
        show,
        hide,
        resolve
    }
}