
import React, { useContext, useState, useEffect } from "react";

// import main_palete_theme from '../style.lib/PalleteStyles';

// import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';

import { StateDataManager } from "../stateProvider/DataManager";
import  Cart from "./Cart";


const Stats = () => {

  const {
    top_5_sold, set_top_5_sold,
    top_5_uniq, set_top_5_uniq,
    sales_5_days, set_sales_5_days,
  } = useContext(StateDataManager);

  const create_list_ui = (items, rMark) => items.map( (item, index ) => (

      <div key={index} className="row g-3 "  style={{width: '100%', }} >
          <div className="col-8"><p className="d-flex mr-5">{item.title} - </p></div>
          <div className="col-4"><p className="d-flex ml-5"> {item.sold}{rMark}</p></div>
      </div>

  ));


  const create_stats_card = (items, title, rMark) =>  (
      <div className="card border-1 d-flex flex-column justify-content-start m-2 p-2 pb-3"
          style={ cardStyle }
      >
          <h5 className="card-title text-primary d-flex">{title}</h5>

          <div className="card-body d-flex"  style={ cardBodyStyle }>
            <div className="ml-0 pl-0 w-100">
              {create_list_ui(items, rMark) }
            </div>
          </div>
      </div>

  );

  return (


    <div className="container-fluid no-gutters d-flex flex-row flex-wrap justify-content-between "
          style={ viewStyle }
    >
      {/* <Cart/> */}

      <div  className=" row mt-3 g-3"  style={statsListing} >


            {/* <div className="container-fluid no-gutters m-0 p-0 h-100 w-30 bg-success" > */}
            <div className="col-auto m-0 mb-3"  style={{cardStyle}} >
              {/* <div className="ml-0 pl-0 w-100" style={{cardStyle}} > */}
                {create_stats_card(top_5_sold, 'Top 5 Sales', '') }
              {/* </div> */}
            </div>

            {/* <div className="container-fluid no-gutters m-0 p-0 h-100 bg-success" > */}

            <div className="col-auto m-0 mb-3" style={{cardStyle}}  >
              {/* <div className=" ml-0 pl-0 w-100" style={{cardStyle}} > */}
                  {create_stats_card(top_5_uniq, 'Top 5 Unique sold', '') }
              {/* </div> */}
            </div>


            {/* <div className="container-fluid no-gutters m-0 p-0 h-100 bg-success" > */}
            <div className="col-auto m-0 mb-3 " style={{cardStyle}} >
              {/* <div className="ml-0 pl-0 w-100" style={{cardStyle}} > */}
                 {create_stats_card(sales_5_days, 'Top 5 Days', '$') }
              {/* </div> */}
            </div>

      </div>
    </div>
  );
};

export default Stats;

 const viewStyle = {
   height: '100%',
   minHeight: '60vh',
   width: '100%',
   minWidth: '90vw',
  //  color:'white',
  //  backgroundColor:'cyan',
};

const statsListing= {
  height: '100%',
  // minHeight: '60vh',
  width: '100%',
  minWidth: '90vw',
};

 const cardStyle = {
  margin: '2rem 0.1rem 0 2rem',
  width: '15rem',
  height: '15rem',

  backgroundColor:'cyan',
  color: 'black',
  cursor: 'pointer',

};

const cardBodyStyle = {
  flex: '0 0 90%',
  height: '90%',
  width:'100%',
  fontSize: '1.1rem',
  lineHeight: '1.15rem',

  border:'1px solid blue',
  backgroundColor:'cyan',
  color: 'black',
};