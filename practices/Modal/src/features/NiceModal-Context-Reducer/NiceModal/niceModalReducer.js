export default function niceModalReducer(state = {hiding:{}},{type,payload}){
  const {modalId,args,force} = payload || {};
  switch (type) {
    case 'nice-modal/show':
      return {
        ...state,
        [modalId]:args || true,
        hiding:{
          ...state.hiding,
          [modalId]:false
        }
      }
    case 'nice-modal/hide':
      return force ? {
        ...state,
        [modalId]:false,//completely invisile from UI
        hiding:{
          [modalId]:false  
        }
      }:{
        ...state,//still visile, hiding-true for close animation
        hiding:{
          [modalId]:true
        }
    }
    default:
      return state
  }
 }