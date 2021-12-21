import React from "react";
import { NiceModalContext } from "./NiceModal/NiceModal";
import { UsesrContext } from "./useUsers";

const ContextRenderer = ({children}) =>(<NiceModalContext.Consumer>
    {({"user-modal":userModal})=><UsesrContext.Consumer>
            {({users})=> (children({"user-modal":userModal,users}))}
        </UsesrContext.Consumer>
    }
</NiceModalContext.Consumer>);

export default ContextRenderer