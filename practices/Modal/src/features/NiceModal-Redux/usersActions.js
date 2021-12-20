export const addUser = (user)=>{
  return {
    type:"users/add",
    payload:{user}
  }
}

export const updateUser = (user)=>{
  return {
    type:"users/update",
    payload:{user}
  }
}

export const fetchingUsers = ()=>{
  return {
    type:"users/fetching",
    payload:{ }
  }
}

export const fetchUsersSucceed = (users=[])=>{
  return {
    type:"users/fetchedSucceed",
    payload:{  users }
  }
}

export const fetchUsersError = (error)=>{
  return {
    type:"users/fetchedFailed",
    payload:{ error }
  }
}

