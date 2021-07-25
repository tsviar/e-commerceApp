import React, { useState, useEffect } from "react";
//import robots_data from "../robots-data.json";

import * as api from "../services/StorageService";



const data_url = "https://api.myjson.com/bins/yt3d9";

const StateDataManager = React.createContext();
const { Provider } = StateDataManager;

const WrapperDataManager = ({ children }) => {
  console.log(`in WrapperDataManager`);

  // const [original_Locations_list, set_original_Locations_list] = useState([]);
  const [products_list, set_products_list] = useState([
    {
      id: 1,
      title: 'product 1',
      price: 3,
      description: 'bljglfkjeklfhlewk',
      image: "https://bulma.io/images/placeholders/128x128.png",
      // image: "https://via.placeholder.com/30/09f/fff.png",
    },
    {
      id: 2,
      title: 'product 2',
      price: 6,
      description: 'bljglfkjeklfhlewk',
      image: "https://bulma.io/images/placeholders/128x128.png",
    },
            {
      id: 3,
      title: 'product 3',
      price: 6,
      description: 'bljglfkjeklfhlewk',
      image: "https://bulma.io/images/placeholders/128x128.png",
    },
        {
      id: 4,
      title: 'product 4',
      price: 3,
      description: 'bljglfkjeklfhlewk',
      image: "https://bulma.io/images/placeholders/128x128.png",
      // image: "https://via.placeholder.com/30/09f/fff.png",
    },
    {
      id: 5,
      title: 'product 5',
      price: 6,
      description: 'bljglfkjeklfhlewk',
      image: "https://bulma.io/images/placeholders/128x128.png",
    },
            {
      id: 6,
      title: 'product 6',
      price: 6,
      description: 'bljglfkjeklfhlewk',
      image: "https://bulma.io/images/placeholders/128x128.png",
    },
  ]);

 const [cart_list, set_cart_list] = useState([
    // {
    //   id: 1,
    //   price: 3,

    // }
  ]);



  const [selected_product, update_selected_product] = useState(products_list[0]);
  //({});

  const [loading_lists, set_loading_lists] = useState(true);
  const [error_message, set_error_message] = useState(null);

  // const [original_list, set_original_list] = useState([]);
  // const [filtered_list, update_filtered_list] = useState([]);
  // const [selected_card, update_selected_card] = useState({});
  // const [loading_profiles, set_loading_profiles] = useState(true);


  const states = {
    products_list,
    cart_list,
    selected_product,
    loading_lists,
    error_message,

  };

  const actions = {
    set_products_list,
    set_cart_list,
    update_selected_product,
    set_loading_lists,
    set_error_message,

  };

  //================================================================================
  //    Use local storage
  //================================================================================

  const fetchDataFromLocalStorage = async () => {

    const lists_loaded_counter=0;



    try {
      const ls_products_list = await api.fetchListLS('products_list');
      set_products_list(ls_products_list);
      // update_selected_location(ls_original_Locations_list[0]);


    } catch (err) {
      set_error_message(err.message);
    }


    set_loading_lists(false);

  };


  // The effect hook called useEffect is used to fetch the data from the API
  // The promise resolving happens with async/await.

    async function fetchData() {
      try {
        const web_list = await api.fetchProducts();


        if (web_list) {
          console.log(`MANAGER fetchData weblist valid:`);

          set_products_list(web_list);
          update_selected_product(products_list[0]);

        } else {
          console.log(`MANAGER fetchData weblist NOT valid:`);
          set_error_message(`MANAGER fetchData weblist NOT valid:`);

        }
      } catch (err) {
        set_error_message(err.message);
      }
    }

    async function fetchCart() {
        try {
          const web_list = await api.fetchCartItems();


          if (web_list) {
            console.log(`MANAGER fetchCart weblist valid:`);

            set_products_list(cart_list);

          } else {
            console.log(`MANAGER fetchCart weblist NOT valid:`);
            set_error_message(`MANAGER fetchData weblist NOT valid:`);

          }
        } catch (err) {
          set_error_message(err.message);
        }
      }


  // We only want to fetch data when the component mounts.
  // That’s why you can provide an empty array as second argument
  // to the effect hook
  // to avoid activating it on component updates
  // but only for the mounting of the component.

  useEffect(() => {
    console.log(`useEffect calling fetchDataFromLocalStorage`);
    fetchDataFromLocalStorage();


  //  fetchData();
  //  fetchCart();

  //  console.log(`useEffect calling fetchData`);
  //   fetchData(data_url);

}, []);

  // WrapperDataManager adds a top Provider layer to ProfilesBrowser and all the tree ({children})
  return <Provider value={{ ...states, ...actions }}>{children}</Provider>;
};

export { WrapperDataManager, StateDataManager };
