import {useState} from 'react';
import Typography from '../Typography';
import './index.css';


export default function Tooltip(props) {

    const [showToolTip, setShowToolTip] = useState(false);

    const {
        position = 'top', tooltipText, children, onMouseEnter = (() => {
            setShowToolTip(true);
        }), onMouseLeave = (() => {
            setShowToolTip(false);
        })
    } = props;


    return <div className={`tooltip-block ${position}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div
            className={`tooltip-text 
                    ${position} 
                    ${showToolTip ? 'show' : 'hide'}
                `}>
            <Typography size='sm'>{tooltipText}</Typography>
        </div>

        <div>{children}</div>

    </div>
}