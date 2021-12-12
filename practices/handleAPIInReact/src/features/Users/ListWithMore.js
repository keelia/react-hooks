import React, { useMemo } from "react";

const ListWithMore = ({renderItem,data = [],maxCount}) =>{
    const elements = useMemo(()=>data.map((item,index)=>renderItem({item,index,data})),[data,renderItem])
    const {show,hide} = useMemo(()=>{
        return{
            show:elements.slice(0,maxCount),
            hide:elements.slice(maxCount)
        }
    },[elements,maxCount])
        return (
        <div className="list-with-more">
            {show}
            {hide.length >0 && (
                <div id="popover" 
                    onMouseEnter={e=>document.getElementById('popoverContent').classList.add('show')}
                    onMouseLeave={e=>document.getElementById('popoverContent').classList.remove('show')}>
                    {`and ${hide.length} more...`}
                    <div id="popoverContent">{hide}</div>
                </div>
            )}
        </div>
        );
}
export default ListWithMore