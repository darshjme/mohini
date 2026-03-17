import {Link} from 'react-router-dom';

const TopMenus = ({id}) => {
    return (
        <ul className="nav nav-tabs style-2 mb-4" id="pills-tab" role="tablist">
            <li className="nav-item">
                <Link to={"/auto-write"} className={`nav-link border-s-1 ${id === 1 ? 'active' : ''}`}> Auto Write </Link>
            </li>
            <li className="nav-item">
                <Link to={"/scheduled"} className={`nav-link ${id === 2 ? 'active' : ''}`}> Scheduled </Link>
            </li>
             <li className="nav-item">
                <Link to={"/repurpose"} className={`nav-link ${id === 3 ? 'active' : ''}`}> Repurpose </Link>
            </li>
            <li className="nav-item">
                <Link to={"/rss"} className={`nav-link ${id === 4 ? 'active' : ''}`}> RSS </Link>
            </li>
            <li className="nav-item">
                <Link to={"/chatbot"} className={`nav-link ${id === 5 ? 'active' : ''}`}> Chatbot </Link>
            </li>
            <li className="nav-item">
                <Link to={"/fine-tune-models"} className={`nav-link ${id === 6 ? 'active' : ''}`}> Fine-tune Models </Link>
            </li>
            <li className="nav-item">
                <Link to={"/prompt"} className={`nav-link ${id === 7 ? 'active' : ''}`}> AI Menu Prompts </Link>
            </li>
            <li className="nav-item">
                <Link to={"/setting"} className={`nav-link ${id === 8 ? 'active' : ''}`}> Settings </Link>
            </li> 
            <li className="nav-item">
                <Link to={"/import"} className={`nav-link border-s-2 ${id === 9 ? 'active' : ''}`}> Export/Import Settings </Link>
            </li>
        </ul>
    );
};

export default TopMenus;