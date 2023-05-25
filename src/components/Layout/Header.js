import React from "react";
import style from './Header.module.css';
import mealImg from './../../assets/meals.jpg';
import CartButton from "../UI/CartButton";


const Header = props => {
    
    return (
        <React.Fragment>
            <header>
                <nav className={style.navBar}>
                    <h2>Swad</h2>
                    <CartButton onClick={props.onShowCart} />
                </nav>
            </header>
            <div className={style.frontImg}>
                <img src={mealImg}></img>
            </div>
        </React.Fragment>
    )
};


export default Header;