import axios from 'axios';
const apimiddleware=({dispatch})=>next=>async action=>{
    if(action.type!=='apicallBegan') return next(action);
    next(action);
    const {url,method,data,onSuccess,onError}=action.payload;
    try{
        const response = await axios.request({
            baseURL: 'https://reqres.in',
            url,
            method,
            data
        });
        dispatch({type:onSuccess,payload:response.data});
    } catch(err){
        dispatch({type:'apiRequestFailed',payload:err});
        if(onError)  dispatch({type:onError,payload:err});

    }


}
export default apimiddleware;