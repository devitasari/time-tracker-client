import { Link, useHistory } from 'react-router-dom';

export default function Navbar() {
    const history = useHistory();

    function logout() {
        localStorage.clear();
        history.push('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <Link to="/" className="navbar-brand" >Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse d-flex justify-content-end navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button onClick={logout} className="nav-link btn btn-danger">Logout</button>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
    )
}
