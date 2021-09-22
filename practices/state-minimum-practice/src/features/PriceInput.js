import React, { useCallback} from "react";

/**
 * 1. let parent component to pass value, instead of creating an internal state in PriceInput
 * 2. onChange event change the value from parent directly, let parent passing new value back to PriceInput
 */
export default function PriceInput({price = {
  type:"RMB",
  count:100
},onChange = ()=>{}}) {
  const handleChange = useCallback(deltaValue=>{
    onChange({...price,...deltaValue})
  },[price,onChange])

    return (
      <div>
          <input  value={price.count} onChange={evt=>handleChange({count:evt.target.value})}/>
          <select onChange={evt=>handleChange({type:evt.target.value})} value={price.type}>
              <option value="NZD">NZD</option>
              <option value="RMB">RMB</option>
          </select>
      </div>
    );
  }