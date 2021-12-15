import React from "react";
import { useKeysPress } from "./useKeysPress";

const TypedKeys = () =>{
    const pressedKeys = useKeysPress();
    return (
        <div className="list-with-more">
            <h1>Pressed Keys</h1>
            <p>{pressedKeys?.join(' ') || 'N/A'}</p>
        </div>
        );
}
export default TypedKeys