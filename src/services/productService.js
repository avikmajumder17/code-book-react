export async function getProductList(searchTerm) {
    const URL = `${process.env.REACT_APP_HOST}/444/products?name_like=${searchTerm ? searchTerm : ""}`;
    const response = await fetch(URL);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}

export async function getProduct(id) {
    const response = await fetch(`${process.env.REACT_APP_HOST}/444/products/${id}`);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}

export async function getFeaturedProduct() {
    const URL = `${process.env.REACT_APP_HOST}/444/featured_products`;
    const response = await fetch(URL);
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();

    return data;
}