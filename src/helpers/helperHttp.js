const fetchFunction=async(endpoint,options={})=>{
    const defaultheaders={
        //accept: "application/json"
    }
    const controller = new AbortController();
    options.signal=controller.signal

    options.headers= options.headers?{...options.headers,...defaultheaders}:defaultheaders
    options.method=options.method || 'GET'
    options.mode='cors'
    if(Object.hasOwn(options,'body')){
        if(!(options?.isFormData===true)){
            options.body=JSON.stringify(options.body) 
        }
    }else{
        delete options.body
    }
    delete options.isFormData

    setTimeout(()=>controller.abort(),6000)

    try{

        const res = await fetch(endpoint,options)
        const json = await res.json()
        if(res?.ok===false)return json
        
        return json
        
    }catch(err){
        return {
            ok:false,
            status:err.status || '00',
            text:err.message || `Error peticion ${options.method} a la API` 
        }
    }
}
const get=async(url,options={})=>{
    options.method='GET'
    return fetchFunction(url,options)
}
const post= async(url,options={})=>{
    options.method='POST'
    return fetchFunction(url,options)
}
const put= async(url,options={})=>{
    options.method='PUT'
    return fetchFunction(url,options)
}
const del=async(url,options={})=>{
    options.method='DELETE'
    return fetchFunction(url,options)
}
export {
    get,
    post,
    put,
    del
}