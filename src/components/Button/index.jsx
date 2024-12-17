import './index.css';


export default function Button(props) {
    const {
        children, 
        size='md', 
        variant='bordered',

        disabled, 
        type='button',
        onClick
    } = props;

    const classNameButton = disabled ? `button ${variant} ${size} ${type} disabled` : `button ${variant} ${size} ${type}`

    return <button
        onClick={onClick} 
        className={classNameButton}
    >{children}</button>
}