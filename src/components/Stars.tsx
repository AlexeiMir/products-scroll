import React from 'react';
import starImg from '../assets/star.png'

interface StarsProps {
    count:number
}

const Stars: React.FC<StarsProps> = ({count}) => {
    return (
        <div className="stars">
            {Array.from({length:count}, (_,index) => (
                <img key={index} src={starImg} alt="Start"/>
            ))}

        </div>
    );
};

Stars.defaultProps = {
    count: 5,
};

export default Stars;