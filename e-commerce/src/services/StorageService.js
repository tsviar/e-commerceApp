//const data_url = "https://api.myjson.com/bins/yt3d9";
//const data_url = "https://api.myjson.com/bins/wzf3c";

//export async function fetchAllProfiles3() {
async function fetchAllProfiles3(data_url) {
  const response = await fetch(data_url);
  if (!response.ok)
    throw new Error(`Api fetchAllProfiles3 failed: ${response.error.message}`);
  return await response.json();
}


  async function fetchProducts() {
    // const response = await fetch("http://localhost:4000/products");
    // if (!response.ok)
    // throw new Error(`Api fetchProducts failed: ${response.error.message}`);
    // return await response.json();
  }

    async function fetchCartItems() {
    // const response = await fetch("http://localhost:4000/cart");
    // if (!response.ok)
    // throw new Error(`Api fetchCart failed: ${response.error.message}`);
    // return await response.json();
  }


//////////////////////////////////////////////////////////////////////////////
//                   Local Storage handlres
//////////////////////////////////////////////////////////////////////////////

//export async function fetchListLS(list_name) {
  const fetchListLS = async (list_name) => {
    let ls_list;

    try{
      const ls_list_Json = window.localStorage.getItem(list_name);
      ls_list = JSON.parse(ls_list_Json);

      const is_list_ok = (  typeof ls_list != "undefined"
                            && ls_list != null
                            && Array.isArray(ls_list)
                            && ls_list.length != null
                            && ls_list.length > 0 );
      if(!is_list_ok)
        throw new Error(`Api fetchListLS returned an empty list: ${ls_list_Json}`);
    } catch (err) {
      throw new Error(`Api fetchListLS: ${err}`);
    }

    return ls_list;
  }

//export async function storeListLS(list_name) {
  const storeListLS = async (list_name, list) => {

    console.log(`LOCAL STORAGE storeListLS GOT input list: `, list);

  try{
    const is_list_ok = ( typeof list != "undefined"
                        && list != null
                        && Array.isArray(list)
                        && list.length != null
                        && list.length > 0 );

    const list_name_ok = ( typeof list_name != "undefined"
                          && list_name != null
                          && list_name.length != null
                          && list_name.length > 0 );


    if(!is_list_ok && list_name_ok)
          throw new Error(`Api LOCAL STORAGE  storeListLS received empty list or list_name: ${list_name}`);

    const ls_list_json = JSON.stringify(list);
    window.localStorage.setItem(list_name, ls_list_json);

    console.log(`LOCAL STORAGE storeListLS stored list: `, storeListLS);

  } catch (err) {
    throw new Error(`Api LOCAL STORAGE storeListLS: ${err}`);
  }

}


export { fetchProducts, fetchCartItems, fetchAllProfiles3, fetchListLS, storeListLS };
