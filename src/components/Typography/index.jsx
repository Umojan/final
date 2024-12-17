import './index.css';

export default function Typography(props) {
    const {size = 'md', children} = props;
    return <div className={`typography ${size}`}{...props}>{children}</div>
}