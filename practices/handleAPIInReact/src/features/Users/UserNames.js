import React from "react";
import ListWithMore from "./ListWithMore";

const UserNames = ({data = []}) =>{
    return (
      <div className="user-names">
          <h1>User Names</h1>
          {data.length > 0 && (
            <>Liked by :<ListWithMore 
              data={data}
              maxCount={3}
              renderItem={({item})=>(<span key={item.id} style={{margin:10}}>{item.name}</span>)}/>
            </>
          )}
      </div>
    );
}
export default UserNames