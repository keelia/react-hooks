export const showModal = (modalId,args,resolve)=>{
  return {
    type:"nice-modal/show",
    payload:{
      modalId,
      args,
      resolve
    }
  }
}

export const hideModal = (modalId,force)=>{
  return {
    type:"nice-modal/hide",
    payload:{
      modalId,
      force
    }
  }
}
