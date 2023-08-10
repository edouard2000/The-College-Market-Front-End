import React, { useEffect, useState } from "react";
import "./effect.css";

const Effect = () => {
    const [currentText, setCurrentText] = useState(0);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentText((prevText) => (prevText === 2 ? 0 : prevText + 1));
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentText]);

    const colorClasses = ['color1', 'color2', 'color3'];
    
    return (
       <div className="trade-effect">
        {currentText === 0 && <h4 className={colorClasses[0]}>Want to Maximize Your Item's Worth? <span> Trade it in at The College Market!</span></h4>}
        {currentText === 1 && <h4 className={colorClasses[1]}>Easily Unlock Your Item's True Value: <span>Rent it Out Today!</span></h4>}
        {currentText === 2 && <h4 className={colorClasses[2]}>Have Unused Items? <span>Give Them a Second Life by Donating with Us!</span></h4>}
       </div> 
    )
}

export default Effect;
