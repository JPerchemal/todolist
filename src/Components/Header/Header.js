import { Link } from 'react-router-dom';
import './Header.module.css';

const Header = () => {

    return (
        <header>
            <h1>Todo List</h1>
            <nav>
                <ul>
                    <li>
                        <Link to={ '/' }>Home</Link>
                    </li>
                    <li>
                        <Link to={ '/About' }>About</Link>
                    </li>
                    <li>
                        <Link to={ '/Api' }>Test API</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;