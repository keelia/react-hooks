import React ,{useCallback,useMemo}from "react";
import { useForm } from "./useForm";
import APIClient from "../../APIClient";
import useNameValidator from "./useNameValidator";

const BasicForm = () =>{
    const {validator} = useNameValidator()
    const {values,errors,setField,reset} = useForm({name:'',email:''},{
        name:value=>{
            const error= !value || value.length < 2
            return {
                error,
                errMsg: "Name length should be no less than 2."
            }
        },
        email:value=>{
            const error = !value || !/.+@.+/.test(value)
            return {
                error,
                errMsg:"Invalid email address."
            }
        }
    },{
        name:validator
    })
    const disableSubmit = useMemo(()=>!Object.keys(errors).length || Object.keys(errors).some(key=>!!errors[key]?.length),[errors])
    const onSubmit = useCallback(()=>{
        APIClient.post('names',{
            name:values.name
        })
    },[values])
    return (
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={values?.name} onChange={e=>setField('name',e.target.value)}/>
                {errors['name'] && <p>{errors['name']}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={values?.email} onChange={e=>setField('email',e.target.value)}/>
                {errors['email'] && <p>{errors['email']}</p>}
            </div>
            <div>
               <button disabled={disableSubmit} onClick={onSubmit}>Submit</button>
               <button onClick={reset}>Reset</button>
            </div>
        </div>
        );
}
export default BasicForm