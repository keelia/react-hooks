export default function usersReducer(state = {
    loading:false,
    error:null,
    users:[]
},{type,payload}){
    const {user} = payload || {};
    switch (type) {
        case 'users/add':
            return {
                ...state,
                users:[...state?.users,user]
            }
        case 'users/update':
            return {
                ...state,
                users:state.users?.map(existUser=>existUser.id === user.id?user:existUser)
            }
        case 'users/fetching':
            return {
                ...state,
                loading:true,
                error:null
            }
        case 'users/fetchedSucceed':
            return {
                ...state,
                loading:false,
                error:null,
                users:payload.users
            }
        case 'users/fetchedFailed':
            return {
                ...state,
                loading:false,
                error:payload.error
            }
      default:
        return state
    }
   }