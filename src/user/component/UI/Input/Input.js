
import React from 'react';
import { BaseInput } from './Input.style';

function Input({...rest}) {
    return (
       <BaseInput {...rest}/>
      
    );
}

export default Input;
