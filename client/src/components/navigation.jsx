import {Link} from "react-router-dom";

const Navigate=()=>{
    return (<>
    <header>
        <div className="logo">
            BERN 3.0
        </div>
        <nav>
            <ul>
                <li>
                <Link className="nav_link" to="/">
                Wallet
              </Link>
                </li>
                <li>
                    <Link className="nav_link" to="/view-all-task">
                    View All Task
                    </Link>
                </li>
                <li>
                    <Link className="nav_link" to="/create-task">
                        Create Task
                    </Link>
                </li>
                <li>
                    <Link className="nav_link" to="/delete-task">
                        Delete task
                    </Link>
                </li>
                <li>
                    <Link className="nav_link" to="/update-task">
                        Update Task
                    </Link>
                </li>
                <li>
                    <Link className="nav_link" to="/view-task">
                        View Task
                    </Link>
                </li>
        
            </ul>
        </nav>
    </header>
    </>)
    }
    export default Navigate;