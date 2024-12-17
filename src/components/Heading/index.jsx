import './index.css';

export default function Heading(props) {
    const {children, level=1} = props;
    return <p 
        className={`title the-${level}st-level`}
    >{children}</p>
}