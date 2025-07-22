import React, { useState,CSSProperties  } from 'react';
import './Index.css'

interface StyleInterface {
    base: CSSProperties;
    hover: CSSProperties;
}

const Button = (props:any) =>{

    const [isHovered, setIsHovered] = useState(false);
    const styles: StyleInterface = {
        base: {
            background: props.background_color,
            color: props.color,
            border: props.border,
            borderRadius: props.border_radius,       
            fontSize: props.font_size,
            width: props.width,
            marginLeft: props.margin_left,
            padding: '20px',
            transition: 'all 0.3s ease',
        },
        hover: {
          backgroundColor: 'darkblue',
          color: 'white',
          cursor: 'pointer'
        },
    };
    return(
        <div 
            onClick={()=>{
                props.result(props.action)
            }}
            
        >
            {props.label} 
        </div>
    )
}
export default Button