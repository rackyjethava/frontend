import React from 'react';
import  {BigButton, baseButton}  from './Button.style';

function Button({children}) {
    return (
       
        <BigButton>
               {children}
        </BigButton>
    );
}

export default Button;

