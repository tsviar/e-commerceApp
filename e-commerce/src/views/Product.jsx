import React, { useContext, useState, useEffect } from "react";

// import main_palete_theme from '../style.lib/PalleteStyles';

// import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';

import { StateDataManager } from "../stateProvider/DataManager";


const Product = ({ id, title, price, description, image }) => {
  // console.log('name:',name)
  //	console.log('props:',props)
  // coordinates = {
  //   lat: -34.397,
  //   lng: 150.644
  // };

    const {
        cart_list,
        set_cart_list,
    } = useContext(StateDataManager);


    const addToCart = async (id, title, price) => {
        // try {
        //     const response = await fetch("http://localhost:4000/cart", {
        //         method: "POST",
        //         body: JSON.stringify({
        //         productId: id,
        //         // quantity: quantity,
        //         }),
        //         headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //         },
        //     });

        //     let data = await response.json();
        //     console.log(data);
        // } catch (err) {
        //     console.log(err);
        // }

        let new_cart_list = cart_list;
        new_cart_list.push({id: id, title: title, price: price});
        console.log('new_cart_list', new_cart_list);
        set_cart_list( [...new_cart_list ] );

    };

//   console.log('cart_list', cart_list);

  return (


        <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-xs-3 m-0 mb-3" >


            <div className="card shop-hover border-1 d-flex flex-column justify-content-start "
                style={ cardStyle }
            >
                <img
                    src={image}
                    alt="wrapkit"
                    className="img-fluid card-img-top"
                    style={ imgStyle }

                />


                <div className="card-body "  style={ cardBodyStyle }>

                    <h5 className="card-title text-primary">{title}</h5>

                    <p className="card-text" style={ descriptionStyle }>{description}</p>

                    <h6 className="card-subtitle mb-2 text-muted mb-3 ">
                        <span  className="badge bg-success text-light" >
                        ${price}
                        </span>

                    </h6>

                    {/* <div className="card-img-overlay align-items-center"> */}
                    <div className="d-flex justify-content-center align-items-center align-self-end">

                        <button
                            onClick={(e) => addToCart(id, title, price)}
                            className="btn btn-sm btn-info mt-0"
                            style={ btnStyle }
                        >
                        Buy
                        </button>
                    </div>

                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>

            </div>
        </div>

  );
};

export default Product;

  const cardStyle = {
    margin: '0.1rem',
    width: '10rem',
    height: '20rem',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',

  };

  const imgStyle = {
    flex: '0 0 40%',
    height: '40%',
    width:'100%',

  };

  const cardBodyStyle = {
    flex: '0 0 50%',
    height: '50%',
    width:'100%',
    fontSize: '1.1rem',
    lineHeight: '1.15rem',
  };

  const descriptionStyle = {
    flex: '0 0 40%',
    height: '40%',
    width:'100%',
  };


 const btnStyle = {
  width:'60%',
 };
