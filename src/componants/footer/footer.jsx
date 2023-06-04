import React from 'react';
import './footer.css'
import { useState } from 'react';

export const Footer = ({getPrice}) => {

    return (<>
    
        <div className='footer'>
            <h1 className='footer-total'> סכום לתשלום: <span className='money'>₪</span><span className="priceMoney">{getPrice}</span> </h1>
            <button className="btn-footer">לסיום</button>
        </div>
    
    </>)

}