import React,{ useCallback,useState,createContext,useContext } from 'react';
import { Modal } from 'antd';
import { useMemo } from 'react';

export const NiceModalContext = createContext({hiding:{}})

//Use container to improve performance
export const createNiceModal=(modalId,ModalComp)=>{
    return props=>{
        const niceModal = useContext(NiceModalContext);
        const {visible,args} = niceModal[modalId] ||{};
        if(!visible){
            return null;
        }
        return <ModalComp  {...args} {...props}/>
    }
}

//Global Modal Template, control cancel/afterClose/Ok behavior/animation globally
export const NiceModal = ({id,children,...props})=>{
    const niceModal = useContext(NiceModalContext);
    const modal = useMemo(()=>(niceModal[id]),[niceModal,id]);
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
    const [modal,setModal] = useState({hiding:{}})

    const {args,hiding} = useMemo(()=>({
        args:modal[modalId],
        hiding:modal.hiding[modalId]
    }),[modal,modalId]);

    const show = useCallback((args)=>{
        return new Promise(resolve=>{
            modalCallbacks[modalId] = resolve
            setModal(prev=>({
                ...prev,
                [modalId]:args || true,
                hiding:{
                    ...prev.hiding,
                    [modalId]:false
                }
            }))
        })
    },[modalId]);

    const hide = useCallback((force)=>{
        setModal(prev=>( force ? {
            ...prev,
            [modalId]:false,//completely invisile from UI
            hiding:{
              [modalId]:false  
            }
          }:{
            ...prev,//still visile, hiding-true for close animation
            hiding:{
              [modalId]:true
            }
        }))
    },[modalId]);

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