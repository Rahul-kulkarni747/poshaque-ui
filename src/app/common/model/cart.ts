export class cart{
    products = [];
    totalAmount = 0;

    addProduct(prod,price){
        this.totalAmount += price;
        this.products.push(prod);
    }
}