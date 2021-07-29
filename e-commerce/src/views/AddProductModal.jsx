import React, { useContext, useState, useEffect } from "react";

// import main_palete_theme from '../style.lib/PalleteStyles';

// import styled from "styled-components";
import { makeStyles, styled } from '@material-ui/core/styles';

import { StateDataManager } from "../stateProvider/DataManager";
import * as api from "../services/StorageService";

const AddProductModal = () => {

    const {
        products_list,
        set_products_list,
        selected_product,
        update_selected_product,
    } = useContext(StateDataManager);

    const [new_product, set_new_product] = useState(
      {
          id: products_list.length + 1,
          title: `Product ${products_list.length + 1}`,
          price: 0,
          description: '',
          image: "https://bulma.io/images/placeholders/128x128.png",
      },
    );

   const [valid_flag, set_valid_flag] = useState(false);



    useEffect(() => {

      const addModalEl = document.getElementById('productAddModal');

      addModalEl.addEventListener('show.bs.modal',  (event) => {

        console.log('Add show.bs.modal');

       update_selected_product( {
          id: products_list.length + 1,
          title: `Product ${products_list.length + 1}`,
          price: 0,
          description: '',
          image: "https://bulma.io/images/placeholders/128x128.png",
        });

        set_new_product( {
          id: products_list.length + 1,
          title: `Poduct ${products_list.length + 1}`,
          price: 0,
          description: '',
          image: "https://bulma.io/images/placeholders/128x128.png",
        });
      });


      validateProduct();

    }, []);




    const validateProduct = () => {


        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
          Array.prototype.slice.call(forms)
            .forEach( (form) => {
              form.addEventListener('submit', (event) => {

                if (!form.checkValidity()) {
                  // form.classList.add('was-validated');
                  event.preventDefault();
                  event.stopPropagation();
                  set_valid_flag(false);
                }
                else {
                  set_valid_flag(true);
                }

                form.classList.add('was-validated');


              }, false);
              // }, true);

            });


      };





    const handleSubmit = async (event) => {



      // if ( valid_flag ) {

       update_selected_product({...new_product});

       let new_products_list = products_list;

        new_products_list.push({
          id: products_list.length + 1 ,
          title: new_product.title,
          price: new_product.price,
          description: new_product.description,
          image: new_product.image,
        });

        set_products_list( [...new_products_list ] );

        storeData('products_list', new_products_list);

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

      //  }

        set_new_product( {
          id: products_list.length + 1,
          title: ``,
          price: 0,
          description: '',
          image: "https://bulma.io/images/placeholders/128x128.png",
        });

      event.preventDefault();

      console.log('products_list', products_list);

    }



    const storeData = async (list_name, list) => {
      try {
        await api.storeListLS(list_name, list);

      } catch (err) {
        console.log(err.message);
      }
    }

  // Validating input after every change
    const handleChange = event => {

      try {
        const { name, value } = event.target; // destructure properties
        let ev_value = value;

        // do not disable it or u wont see any thing on screen and on related field
        // if ( (name !== 'image') || (name === 'image' && value !== null && value !== '') ) {

            let found = false, valid = true;

            if (name === 'title') {

                // find if title exists in locations list

                let exists = (element) => {

                  // checks whether an element is even
                  return element.title === value;
                };

                found = products_list.some(exists);


                if ( found ) {
                  //do not disable it
                  // set_new_product(({ ...new_product, [name]: '', }));
                  event.target.value = '';
                  ev_value = '';

                   valid = false;
                }

            }

            if ((name === 'price') &&  (value < 0) ) {
              event.target.value = 0;
              ev_value = 0;

              // valid = false;
            }


              // if (name === 'image') {
              //   let url;

              //   try {
              //     url = new URL(value);
              //     ev_value = value;
              //   } catch(TypeError) {
              //     ev_value =  "https://bulma.io/images/placeholders/128x128.png";
              //     // event.target.value ="https://bulma.io/images/placeholders/128x128.png";
              //      valid = false;
              //   }

              //   // valid = false;

              // }


            if ( !found && valid ) {
                // do not disable it
              set_new_product(({ ...new_product, [name]: ev_value, }));

            }


        // }


      } catch (err) {
        console.log(`handleChange caugt exception: ${err.message}`);
      }


    };


    //      Handle exit from field
    //------------------------------------
    const handleBlur = event => {



      try {
        let error_msg = '';

        const { name, value } = event.target; // destructure properties
        let ev_value = value;

        console.log(`handleBlur 1 event.target ${name} = ${ev_value}`);

        let validValue = ((ev_value !== ``) && (ev_value !== 'undefined')
                          && (ev_value !== null) && ev_value < 0 );

        let found = false;


        // handlse name validation
        if (validValue && (name === 'title')) {


          // find if title exists in locations list


          let exists = (element) => {

            // checks whether an element is even
            return element.title === ev_value;
          };

          found = products_list.some(exists);


          if (found) {
            // set_new_product(({ ...new_product, [name]: ``, }));
            event.target.value = '';
            ev_value = '';
          }

        }

        if (name === 'image') {
          let url;

          try {
            url = new URL(value);
          } catch(TypeError) {
            ev_value =  "https://bulma.io/images/placeholders/128x128.png";
             set_new_product(({ ...new_product, [name]: ev_value, }));
            // validValue = false;
          }

        }

        // if (!validValue) {

        //   console.log(`error_msg ${error_msg} `);
        // }


        if (!found && validValue) {

          // if ( (name !== 'image') || (name === 'image' && ev_value !== null && ev_value !== '') ) {
              // do not disable it
              set_new_product(({ ...new_product, [name]: ev_value, }));
          // }

        }

      } catch (err) {
        console.log(`handleCBlur caugt exception: ${err.message}`);
      }


    };



    return (


      <div className="modal fade" id="productAddModal" tabIndex="-1"
          data-bs-backdrop="static" data-bs-keyboard="false"
          aria-labelledby="productAddModalLabel" aria-hidden="true"
      >
        <div className="modal-dialog modal-lg pl-3">

          <div className="modal-content  ">

            <div className="modal-header">


              <h5 className="modal-title text-primary" id="productAddModalLabel">
                Add a new product
              </h5>
              <button type="button" className="btn-close"
                    data-bs-dismiss="modal" aria-label="Close">
              </button>

            </div>
  {/* onSubmit={handleSubmit} */}
            <div className=" container mr-auto ml-auto">

              <form className="row g-2 g-lg-3 g-xl-3 needs-validation mr-auto ml-auto" noValidate
                onSubmit={handleSubmit}
              >

                <div className="modal-body ml-5" style={formBodyStyle}>


                    <div className="row g-2 g-lg-3 g-xl-3 align-items-center mb-2 ">

                      <div className="col-3 col-xl-2 col-lg-2 text-dark" >
                        <label htmlFor="productTitle" className="col-form-label">Title</label>
                      </div>

                      <div className="col-6">
                        <input type="text" id="productTitle" className="form-control" required
                              name = "title"
                              value={new_product.title}
                              aria-describedby="productTitleHelpInline"
                              onChange={handleChange}
                              onBlur={handleBlur}
                        />

                        {/* <div class="valid-feedback">  Looks good!</div> */}
                        <div className="invalid-feedback">
                            Please provide a valid product title, that dosen't exist already.
                        </div>
                      </div>

                      <div className="col-auto">
                        <span id="productTitleHelpInline" className="form-text">
                          e.g. product 1.
                        </span>
                      </div>

                    </div>

                    <div className="row g-2 g-lg-3 g-xl-3 align-items-center mb-2">

                      <div className="col-3 col-xl-2 col-lg-2 text-dark" >
                        <label htmlFor="productPrice" className="col-form-label">Price</label>
                      </div>

                      <div className="col-6">
                        <input type="number" id="productPrice" className="form-control" required
                                name = "price"
                                value={new_product.price}
                                aria-describedby="productPriceHelpInline"
                                onChange={handleChange}
                                onBlur={handleBlur}
                        />
                        {/* <div class="valid-feedback">  Looks good!</div> */}
                          <div className="invalid-feedback">Please provide product price.</div>
                      </div>

                      <div className="col-auto">
                        <span id="productPriceHelpInline" className="form-text">
                          ( USD $ ).
                        </span>
                      </div>

                    </div>

                    <div className="row g-2 g-lg-3 g-xl-3 align-items-center mb-2">

                      <div className="col-3 col-xl-2 col-lg-2  text-dark" >
                        <label htmlFor="productDescription" className="col-form-label">Description</label>
                      </div>

                      <div className="col-6">
                        <textarea id="productDescription" className="form-control" rows="3"
                                  name = "description"
                                  value={new_product.description}
                                  maxLength="50"  aria-describedby="productDescriptionHelpInline"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                        />
                      </div>

                      <div className="col-auto">
                        <span id="productDescriptionHelpInline" className="form-text">
                          (50 chars max).
                        </span>
                      </div>

                    </div>


                    <div className="row g-2 g-lg-3 g-xl-3 align-items-center mb-2">

                      <div className="col-3 col-xl-2 col-lg-2  text-dark" >
                        <label htmlFor="productImage" className="col-form-label">Image URL</label>
                      </div>

                      <div className="col-6">
                        <input type="url" id="productImage" className="form-control" required
                              name = "image"
                              value={new_product.image}
                              aria-describedby="productImageHelpInline"
                              placeholder="https://example.com"
                              onChange={handleChange}
                              onBlur={handleBlur}
                        />
                      </div>

                      <div className="col-3 pr-auto mr-auto" >
                        <span id="productImageHelpInline" className="form-text"
                                style={{wordWrap: 'break-word',}}
                        >
                          Valid url: http://example.com
                        </span>
                      </div>
                      <div className="invalid-feedback">
                            Please provide a valid url.
                        </div>
                    </div>


                </div>



                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>

                  <button type="submit" className="btn btn-primary"

                  >
                        Save changes</button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>


  //  onClick={(e) => addTheProduct({...new_product})}
  // onClick={(e) => handleSubmit(e)}
    );

};

export default AddProductModal;

 const formBodyStyle = {
  //  display: 'flex',
  //  flex: '0 0 100%',
  //  width: '100%',
  //  justifyContent: 'center',
  //  alignItems: 'center',

   fontSize: '1.0rem',

  };

 const btnStyle = {
  width:'60%',
 };
