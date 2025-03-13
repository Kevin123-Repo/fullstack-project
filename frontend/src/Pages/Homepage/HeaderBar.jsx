import {Link}  from "react-router-dom"

function HeaderBar() {
    return(
        <div className="App">
            <Link className="navbar-brand" to="/"> My Web App</Link>
        </div>
    )
}

export default HeaderBar