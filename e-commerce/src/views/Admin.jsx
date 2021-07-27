
import React, { useContext, useState, useEffect } from "react";
// @ts-ignore
import { Modal } from 'bootstrap';

// import main_palete_theme from '../style.lib/PalleteStyles';

// import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';

import { StateDataManager } from "../stateProvider/DataManager";
import * as api from "../services/StorageService";

import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";




const Admin = (props) => {

    const {
        products_list,
        set_products_list,
    } = useContext(StateDataManager);





    useEffect(() => {

       console.log('useEffect products_list', products_list);
    }, [products_list, products_list.length]);



    const addProduct= async () => {
        // try {
        //     const res = await fetch("http://localhost:4000/product/empty-cart", {
        //         method: "DELETE",
        //     });

        //     await res.json();
        //     fetchCart();
        //     props.history.push("/");

        // } catch (err) {
        //     console.log(err);
        // }

        // set_cart_list([]);
    }


        const deleteProduct=  (id) => {
        // try {
        //     const res = await fetch("http://localhost:4000/cart/empty-cart", {
        //         method: "DELETE",
        //     });

        //     await res.json();
        //     fetchCart();
        //     props.history.push("/");

        // } catch (err) {
        //     console.log(err);
        // }

        let new_products_list = products_list;


        const idx = new_products_list.findIndex(el => el.id === id);
        new_products_list.splice(idx, 1);

        set_products_list( [...new_products_list ] );

    }

    const openEditModal = (ev, item) => {


          // window.addEventListener('DOMContentLoaded', (event) => {
          //     const selector = '[data-auto-open]';
          //     const modalElement = document.querySelector(selector);

          //     if (!modalElement) {
          //         return;
          //     }

          //     const mode = modalElement.dataset.autoOpen;
          //     const fade = modalElement.classList.contains('fade');

          //     if (fade && mode === 'instant') {
          //         modalElement.classList.remove('fade');
          //     }

          //     const modal = new Modal(modalElement, {});

          //     if (fade && mode === 'instant') {
                  // There's currently a bug in the backdrop when the fade class
                  // will be added directly after the modal was opened to have the
                  // close animation
                  // modalElement.addEventListener('shown.bs.modal', function (event) {
          //         modalElement.addEventListener('hidden.bs.modal', function (event) {
          //             modalElement.classList.add('fade');
          //         }, {once : true});
          //     }

          //     modal.show();
          // }, {once : true});

        //  var myModal = new Modal(document.getElementById("productEditModal"), {});

        //  var myModalEl = document.querySelector('#productEditModal')
        //   var modal = Modal.getOrCreateInstance(myModalEl) // Returns a Bootstrap modal instance
        //   modal.show(item);




    }


    // console.log('products_list', products_list);


  return (

    <div className="container-fluid no-gutters d-flex flex-row flex-wrap w-100" >

      <div className="container-fluid d-flex justify-content-end align-items-center align-self-end m-1 mb-2 w-100">
        <button

            className="btn btn-sm btn btn-primary m-0 mb-3"
            data-bs-toggle="modal" data-bs-target="#productAddModal"
            style={ btnStyle }
        >
        Add
        </button>
        <AddProductModal/>
      </div>


      <div className="container-fluid w-100">

        <div className="row">
          <div className="col-5" style={headerStyle} > <span> Title </span></div>
          <div className="col-3" style={headerStyle} > <span> Price </span></div>
          <div className="col-4" style={headerStyle} > <span> Options </span></div>
        </div>



        { products_list.map(item => (


          <div className="row" key={item.id}>
            <div className="col-5" style={cellStyle} > <span> {item.title} </span></div>

            <div className="col-3 text-success" style={cellStyle} >
                <span> {item.price} $ </span>
            </div>

            <div className="col-4 p-2" style={cellStyle} >
              <div className="d-flex justify-content-between w-100" >

                <div className=" m-auto "  >
                  <EditProductModal idx={item.id} />
                </div>


                <button
                  onClick={(e) => deleteProduct(item.id)}
                  className="btn btn-primary m-auto d-flex"
                  style={ btnStyle }
                >
                  Delete
                </button>

              </div>
            </div>


          </div>
        ))
        }

      </div>


      {/* <EditProductModal /> */}


    </div>

  );
};

export default Admin;

const btnStyle = {

  height: '2rem',
  width: '0.01rem',
  minWidth: 'calc(3rem + 2vw)',

  fontSize: '0.9rem',
  textAlign: 'center',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const cellStyle = {
  border:'1px solid white',
  height: '4rem',
  textAlign: 'center',
  fontSize: '0.9rem',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',

};

const headerStyle = {
   border:'1px solid white',
   backgroundColor:'cyan',
   color: 'black',
   height: '4rem',

   textAlign: 'center',
   fontSize: '1.1rem',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',

};