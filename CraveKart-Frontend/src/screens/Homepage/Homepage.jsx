import "./homepage.css"
import Products from "../Products/Products";
import Page from "../frontpage/page";
import Restaurants from "../restaurants/Restaurants";

function HomePage() {
    return (
            <div className="Homepage" >
                <div className="main">
                <img src="/images/firstpimg.jpg" width="1500" height="900" alt="Burger" />
            </div>    
            <div>
                <Restaurants />
            </div>
            
        </div>
    )
}

export default HomePage;


