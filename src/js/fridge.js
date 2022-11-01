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
const ONE_DAY = 1000*60*60*24;
let today = new Date().getTime();
let tomorrow = today + (ONE_DAY); 

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
        return this.capacity - this.usedCapacity();
    }
    // Benutzte Platz
    usedCapacity(){
        return this.storage.reduce((usedCapacity, product) => usedCapacity+=product.volume, 0);
    }
    // Anzahl der Produkte
    totalProducts(){
        return this.storage.length;
    }
    // Produkt mit kleinstem Volumen
    smallestVU(){
        if (this.storage.length === 0) {
            return '-'
        }
         return  [...this.storage].sort((a, b) => a.volume - b.volume)[0].name;
    }
    // Produkt  mit größtem Volumen
    biggestVU(){
        if (this.storage.length === 0) {
            return '-'
        }
        return [...this.storage].sort((a, b) => b.volume - a.volume)[0].name;
    }
    // Produkte zufügen
    addProduct(product){
        if (this.freeCapacity() >= product.volume) {
            this.storage.push(product);
        } else return `Not enougth capacity`;
    }
    // Produkt löschen
    deleteProduct(productIndex){
        this.storage.splice(productIndex, 1);
        return `Product deleted!`
    }
    // Alle Produkte löschen
    deleteAllProducts(){
        this.storage.splice(0);
        return `All Products removed`
    }
    // Alle abgelaufene Produkte löschen
    deleteExpProducts(){
        let today = new Date();
        this.storage = this.storage.filter(produkt => produkt.expirationDate >= today);
        return `ExpProducts removed!`
    }
    // Sortiere Produkte
    sortProducts(){
        this.storage.sort((a, b) => a.expirationDate - b.expirationDate);
        return `Sorted!`
    }
    // Produkte die bis morgen noch ok sind
    untilTomorrow(){
        return this.storage.filter(prod => {
            if (prod.expirationDate <  tomorrow && prod.expirationDate > today) {
                return prod;
            }
        }).length
    }
    // Schlechte Produkte
    expProducts(){
        return this.storage.filter(prod => {
            if (prod.expirationDate <  today) {
                return prod;
            }
        }).length
    }
}


export default Fridge;