import Product from "./product.js";

/* 
    Diese Klasse repräsentiert die Datenstruktur des Kühlschranks.
    Sie sollte per Konstruktor eine Kapazität als Ganzzahl übergeben bekommen. 
    Sollte beim Versuch ein neues Produkt hinzuzufügen das maximal zugelassene Volumen überschritten werden,
    sollte das neue Produkt nicht hinzugefügt werden.
    Zur Vereinfachung ist das Volumen in der imaginären Einheit VU (Volume-Unit) zu behandeln.

    Desweiteren sollte die Klasse über einen Speicher für im Kühlschrank eingelagerte Produkte verfügen.

    Der Kühlschrank-Klasse müssen noch Instanz-Methoden beigefügt werden.
    Folgende Methoden sollten auf jeden Fall enthalten sein:
    - Eine Methode zur Ermittlung der freien Kapazität
    - Eine Methode zur Ermittlung der bereits verbrauchten Kapazität
    - Eine Methode zur Ermittlung der Anzahl eingelagerter Produkte
    - Eine Methode zur Ermittlung des Produktes mit dem kleinsten Volumen
    - Eine Methode zur Ermittlung des Produktes mit dem größten Volumen
    - Eine Methode zum Hinzufügen neuer Produkte
    - Eine Methode zum Entfernen vorhandener Produkte
    - Eine Methode zum Entfernen aller vorhandenen Produkte
    - Eine Methode zum Entfernen aller abgelaufenen Produkte
    - Eine Methode zum Sortieren der Produkte nach Ablaufdatum
*/
class Fridge {
    // Datenbank
    storage = [
        
    ];

    constructor(capacity, name){
        // Capazität
        this.capacity = capacity;
    }
    // Freies Platz
    freeCapacity(){
        return this.capacity;
    }
    // Benutzte Platz
    usedCapacity(){
        return this.storage.reduce((totalCapacity, product) => totalCapacity+=product.volume, 0);
    }
    // Anzahl der Produkte
    totalProducts(){
        return this.storage.length;
    }
    // Produkt mit kleinstem Volumen
    smallestVU(){
         return  this.storage.sort((a, b) => a.volume - b.volume)[0].name;
    }
    // Produkt  mit größtem Volumen
    biggestVU(){
        return this.storage.sort((a, b) => b.volume - a.volume)[0].name;
    }
    // Produkte zufügen
    addProduct(product){
        if (this.capacity > product.volume) {

            this.storage.push(product);
            this.capacity -= product.volume;
        } else return `Not enougth capacity`;
    }

    deleteProduct(productIndex){
        this.storage.splice(productIndex, 1);
        return `Product deleted!`
    }

    deleteAllProducts(){
        this.storage.splice(0);
        return `All Products removed`
    }
    deleteExpProducts(){
        let today = new Date();
        this.storage = this.storage.filter(produkt => produkt.expirationDate >= today);
        return `ExpProducts removed!`
    }
    sortProducts(){
        this.storage.sort((a, b) => a.expirationDate - b.expirationDate);
        return `Sorted!`
    }
}






// let samsung = new Fridge(100, 'samsung');

// console.log(samsung.freeCapacity());

// let eier = new Product('eier', 10, new Date('2022-11-03'));

// let tomaten = new Product('Tomaten', 15, new Date('2022-11-05'));
// let joghurt = new Product('Joghurt', 5, new Date('2022-10-05'));
// samsung.addProduct(eier);

// samsung.addProduct(tomaten);



// console.log(samsung.totalProducts());

// console.log(samsung.storage);

// console.log(samsung.freeCapacity());

// console.log(samsung.usedCapacity());

// console.log(samsung.smallestVU());

// console.log(samsung.biggestVU());

// samsung.addProduct(joghurt);
// // console.log(samsung.deleteAllProducts());

// // console.log(samsung.storage);

// // console.log(samsung.deleteExpProducts());

// // console.log(samsung.storage);

// console.log(samsung.freeCapacity());

// console.log(samsung.totalProducts());


// console.log(samsung.storage);

// console.log(samsung.sortProducts());

// console.log(samsung.usedCapacity());

// console.log(samsung.capacity);


export default Fridge;