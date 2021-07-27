import React, { useContext, useState, useEffect } from "react";
// import bootstrap from 'bootstrap';
// import '@popperjs/core'; // Edit here
// import 'bootstrap/dist/js/bootstrap.bundle';

import { makeStyles, styled } from '@material-ui/core/styles';

import { StateDataManager } from "../stateProvider/DataManager";
import * as api from "../services/StorageService";

import Product from "./Product";
import Cart from "./Cart";


const Home = () => {


    const {
        cart_list,
        set_cart_list,
        products_list,
    } = useContext(StateDataManager);


    const create_list_ui = (items) =>
    items.map(item => (
        // <CardItem key={item.id} >
           <Product key={item.id} {...item} />
        // </CardItem>
    ));



    useEffect(() => {


    }, [products_list, products_list.length]);


    return (

        <div className="container-fluid no-gutters d-flex flex-row flex-wrap w-100" >

            <div className="row mt-0 d-flex justify-content-end w-100" >
                <div className="dropdown d-flex justify-content-end" >
                    <button className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButton2" type="button"  aria-expanded="false"
                            style={btnCart}
                    >

                        Shopping Cart
                        <span  className="badge bg-danger text-light rounded-pill" style={badgeCart}>
                            { cart_list.length }
                        </span>

                    </button>

                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <li>
                          <Cart/>
                        {/* <a className="dropdown-item" href="#">Action</a> */}
                        </li>

                        {/* <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li> */}
                    </ul>
                </div>
            </div>

            {/* <div className="row mt-5 d-flex flex-row flex-wrap w-100">
                <div className="col-12 d-flex flex-row flex-wrap "> */}
                    <div
                        className="shop-listing row mt-3 w-100 "
                    >
                        {create_list_ui(products_list)}
                    </div>
                {/* </div>
            </div> */}

        </div>

    );
};

export default Home;


const badgeCart  = {
  display: 'inline-block',

  marginLeft: '10px',
  padding: '3px 6px',

  border: '1px solid transparent',
//   borderRadius: '50%',

  minWidth: '10px',

  lineHeight: '1.1',
  fontSize: '11px',
  fontWeight: '600',

  textAlign: 'center',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',


  borderColor: '#ef1c1c',
//   backgroundColor: '#ef1c1c',
//   color: 'white',
};


const btnCart  = {

  minWidth: '17em',

};