import React from 'react';

import tumbaImg from '../assets/tumba.png'
import heartImg from '../assets/heart.svg'
import cartImg from '../assets/cart.svg'
import Stars from './Stars';


export interface ProductProps {
    title: string
    rating: number
    price: {
        new: number
        old: number
        hot?: boolean
    }
    color: string
    material: string
    size: string
    mechanism: string
    seller: string
}

const formatPrice = (price: number): string =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')


const Product: React.FC<ProductProps> = ({
                                             title,
                                             rating,
                                             price,
                                             color,
                                             material,
                                             size,
                                             mechanism,
                                             seller
                                         }) => {
    return (
        <div className="product">
            <div className="product__overlay"></div>
            <ul className="columns columns--product">
                <li>
                    <div className="columns__preview">
                        <div className="columns__preview-image">
                            <img width="148" src={tumbaImg} alt="Product image"/>
                        </div>
                        <h5>{title}</h5>
                    </div>
                </li>
                <li className="columns__rating">
                    <Stars count={Math.floor(rating)}/>
                    <b>{rating}</b>
                </li>
                <li className={`columns__price ${price.hot ? 'columns__price--hot' : ''}`}>
                    <span>{formatPrice(price.new)} P</span>
                    <s>{formatPrice(price.old)} P</s>
                </li>
                <li>{color}</li>
                <li>{material}</li>
                <li>{size}</li>
                <li>{mechanism}</li>
                <li><a href={"/"}>{seller}</a></li>
                <li>
                    <button className="button button--like">
                        <img src={heartImg} alt="Heart"/>
                    </button>
                    <button className="button button--cart">
                        <img src={cartImg} alt="Cart"/>
                        <span>Купить</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Product;