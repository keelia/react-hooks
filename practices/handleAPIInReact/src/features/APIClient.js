import axios from "axios";

const END_POINTS = {
    DEV:`http://localhost:3000/`,
    TEST:`http://localhost:3000/`,
    PROD:`http://localhost:3000/`
}

const instance = axios.create({
    //choose endpoints based on current env in practice
    baseURL: process.env.NODE_ENV === 'production' ? END_POINTS.PROD : ( process.env.NODE_ENV  === 'test' ? END_POINTS.TEST: END_POINTS.DEV) , 
    timeout: 1000,
    headers: {Authorization: 'Bear my token'}
});

instance.interceptors.request.use(res=>{
    //process sucess request. e.g. log
    //const {method,url} = res
    //console.log(method,url)
    return res
},err=>{
    if(err.response.status ===  403){
        //process unAuth reques, jump to login page
        document.location = '/login'
    }
    return Promise.reject(err)
})

export default instance;
