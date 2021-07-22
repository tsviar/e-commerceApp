import React, { useContext, useState, useEffect } from "react";

// import main_palete_theme from '../../style.lib/PalleteStyles';

import { StateDataManager } from "../stateProvider/DataManager";


const Cart = (props) => {

   const {
        cart_list,
        set_cart_list,
    } = useContext(StateDataManager);

   const [total_sum, set_total_sum] = useState(0);

    useEffect(() => {
        // fetchCart();

    }, []);

    useEffect(() => {
        let tmpList = cart_list;
        const totalSum = tmpList.reduce((accumulator, currentItem) => accumulator + currentItem.price , 0);
        set_total_sum(totalSum);

    //    console.log('total_sum', total_sum) ;

    }, [cart_list, cart_list.length]);



    const fetchCart = async () => {

        // const res = await fetch("http://localhost:4000/cart");
        //     res
        //     .json()
        //     .then((res) => {
        //         console.log(res.data.items);
        //         set_cart_list(res.data.items);
        //         // setPayloader(res.data);
        //     })
        //     .catch((error) => {
        //         // setError(error);
        //     });
    }

    const emptyCart= async () => {
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

        set_cart_list([]);
    }

    const create_list_ui = (items) =>

        items.map(item => (

            <div key={item.id} className="row"  style={{width: '100%',}} >
                <div className="col-8"><p className="d-flex mr-5">{item.title} </p></div>
                <div className="col-4"><p className="d-flex ml-5"> {item.price}$</p></div>
            </div>

        ));


  return (
    <div className="container no-gutters d-flex flex-row flex-wrap justify-content-center w-100"
     style={ itemStyle } >

      { (cart_list.length > 0) ?
        (
           <div className="container-fluid no-gutters m-0 p-0 " >
                <div className="ml-0 pl-0 w-100">
                    {create_list_ui(cart_list) }
                </div>

                <div className="ml-0 pl-0 w-100" style={{marginTop: '3rem', color: 'green',}}>
                    <div className="row mt-6 pt-6"  style={{width: '100%',}} >
                        <div className="col-8"><p className="d-flex mr-5">Total </p></div>
                        <div className="col-4"><p className="d-flex ml-5"> {total_sum}$</p></div>
                    </div>
                </div>
            </div>
        )


        : (<h6>Shopping cart is empty</h6>)


      }

      { (cart_list.length > 0) ?
        (
        <div className="container-fluid d-flex justify-content-center align-items-center align-self-end w-100 m-1 mb-2 ">
            <button
                onClick={(e) => emptyCart()}
                className="btn btn-sm btn-info m-0"
                style={ btnStyle }
            >
            Pay
            </button>
        </div>
      )  : (<h6></h6>)
     }

    </div>
  );
};



export default Cart;


 const itemStyle = {
   color:'white',
};

 const btnStyle = {
   minWidth:'4rem',
   width:'100%',
 };