import "./homepage.css"
import Products from "../Products/Products";

function HomePage(props) {
    return (
        <div className={props.containerClass}>
            <div className="homepage" >
                <img src="/cravekart.png" alt='cravekart' height='300' width='250'/>
            </div>
            <div>
                <Products />
            </div>
        </div>
    )
}

export default HomePage;