export class Cart{
    id= 0;
    products = {};
    productIndexes = [];
    totalAmount = 0;

    addProduct(index,prod,price,size="",gender = ""){
        this.totalAmount += price;
        if(typeof this.products[index] === "undefined"){
            prod.quantity = 1;
            this.products[index] = {
                id: prod.id, 
                name: prod.name,
                quantity: prod.quantity, 
                categoryId: prod.categoryId,
                size: size,
                gender: gender,
                price: price,
                isGenderSpecific: prod.isGenderSpecific,
                hasSizes: prod.hasSizes
            };
            this.productIndexes.push(index);
        }else{
            this.products[index].quantity++;
        }
    }

    hasProduct(index){
        return !(typeof this.products[index] === "undefined");
    }

    removeProductFromIndex(str){
        let i = this.productIndexes.indexOf(str);
        this.totalAmount -= (this.products[str].quantity * this.products[str].price);
        this.productIndexes.splice(i,1);
        delete this.products[str];
    }

    fromString(str:string){
        const cart = JSON.parse(str);
        this.products = cart.products;
        this.productIndexes = cart.productIndexes;
        this.totalAmount = cart.totalAmount;
    }
}