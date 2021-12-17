import React from "react";
import { useForm } from "./useForm";

const BasicForm = () =>{
    const {values,errors,setField} = useForm({name:'',email:''},{
        name:value=>((!value || value.length < 2) ? "Name length should be no less than 2." : null),
        email:value=>((!value || !/.+@.+/.test(value)) ? "Invalid email address." : null)
    })
    return (
        <form>
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
        </form>
        );
}
export default BasicForm