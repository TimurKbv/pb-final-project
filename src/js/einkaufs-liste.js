
const ONE_DAY = 1000 * 60 * 60 * 24;
let today = new Date().getTime();
/* ------------------------------------------------------------------------ */
// Erstelle neue Klasse mit Datenbank als Array
class Shoplist {
    list = [];
    // Produkte mit erneuter Datum kaufen
    addProducts(product){
        product.expirationDate = new Date(today + ONE_DAY * 7);
        this.list.push(product);
    }
    // Produkte löschen
    removeProduct(productIndex){
        this.list.splice(productIndex, 1)
    }
}


export default Shoplist;