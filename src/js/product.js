/* 
    Diese Klasse repräsentiert die Datenstruktur eines im Kühlschrank eingelagerten Produkts.
    Sie sollte per Konstruktor einige nötige Produktdaten entgegen nehmen und in der Produkt-Instanz hinterlegen:
    - Den Namen des Produkts als Zeichenkette (String)
    - Das Produktvolumen als Ganzzahl (Integer)
    - Das Ablaufsdatum des Produkts als Datum (Date)
*/
// Erstelle neue Class Produkt
class Product {
    constructor(name, volume, expirationDate){
        this.name = name;
        this.volume = volume;
        this.expirationDate = expirationDate;
    }
}

export default Product;

