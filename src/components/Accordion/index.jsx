import './index.css';

export default function Accordion(props) {
    const { title, isOpen = false, children, onClick } = props;

    return (
        <div
            onClick={onClick}
            className={`accordion-container ${isOpen ? 'open' : 'closed'}`}>
            <div className="accordion-block">
                <h2 className="accordion-title">{title}</h2>
                <span className="accordion-button">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="accordion-text">{children}</div>}
        </div>
    );
}
