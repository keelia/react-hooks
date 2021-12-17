import React from "react";
import { useKeyPress } from "./useKeyPress";

const TypedKey = () =>{
    const pressedKey = useKeyPress()
    return (
        <div className="list-with-more">
            <h1>Pressed Key</h1>
            <p>{pressedKey || 'N/A'}</p>
        </div>
        );
}
export default TypedKey