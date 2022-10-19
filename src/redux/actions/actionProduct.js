import { get, put, deleteMethod } from '../../utilities/https';

export const getAllProducts = () => {
    const url = '/products';
    return new Promise((resolve, reject) => {
    const promise = get(url)
       promise.then((response)=> {
            resolve({
                type: 'SAVE_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

export const addProduct = (body) =>{
    const url = 'products/add';
    return new Promise((resolve, reject) => {
        const promise = put(url, body);
        promise.then((response)=> {
            resolve({
                type: 'SAVE_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

export const deleteProduct = (productId) =>{
    const url = `products/delete/${productId}`;
    return new Promise((resolve, reject) => {
        const promise = deleteMethod(url);
        promise.then((response)=> {
            resolve({
                type: 'SAVE_PRODUCT_LIST',
                payload: response
            })
        }).catch((error) => {
            reject(error);
        })
    })
}