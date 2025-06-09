import { createContext, useContext, useReducer } from "react";
import { filterReducers } from "../reducers/filterReducers";

const filterInitialState = {
    productList: [],
    sortBy: null,
    rating: null,
    bestSellerOnly: false,
    inStockOnly: false
}

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(filterReducers, filterInitialState);

    function initialProductList(products) {
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                products: products
            }
        })
    }

    function sort(products) {
        if (state.sortBy === "lowtohigh") {
            return products.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (state.sortBy === "hightolow") {
            return products.sort((a, b) => Number(b.price) - Number(a.price));
        } else {
            return products;
        }
    }

    function rating(products) {
        if (state.rating === "4STARSABOVE") {
            return products.filter(product => product.rating >= 4);
        } else if (state.rating === "3STARSABOVE") {
            return products.filter(product => product.rating >= 3);
        } else if (state.rating === "2STARSABOVE") {
            return products.filter(product => product.rating >= 2);
        } else if (state.rating === "1STARSABOVE") {
            return products.filter(product => product.rating >= 1);
        } else {
            return products;
        }
    }

    function bestSeller(products) {
        return state.bestSellerOnly ? products.filter(product => product.best_seller === true) : products;
    }

    function inStock(products) {
        return state.inStockOnly ? products.filter(product => product.in_stock === true) : products;
    }

    const filteredProductList = inStock(bestSeller(rating(sort(state.productList))));

    const value = {
        state,
        dispatch,
        products: filteredProductList,
        initialProductList
    }

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    const context = useContext(FilterContext);

    return context;
}