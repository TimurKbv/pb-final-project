/* 
    Dies ist die haupt Javascript Datei, die im HTML eingebunden ist.
    Hierin sollten alle Nutzer-Interaktionen geregelt werden.

    Hierin sollten möglichst keine Datenstrukturdaten gespeichert werden, 
    dafür sind die beiden Klassen 'Fridge' und 'Product' vorgesehen.
    Die nötigen Dateien für die Fridge- und Productklasse sind bereits eingebunden,
    so dass von hier aus von ihnen Gebrauch gemacht werden kann.

    Es empfiehlt sich das Befüllen bzw. Erzeugen der dynamischen GUI Elemente
    in einer größeren Methode zu definieren, die sich an den in der Datenstruktur hinterlegten Daten orientiert.
    So kann man diese Methode bei jeder Änderung der Daten immer wieder aufrufen 
    und muss sich nicht um das Hinzufügen, Ändern oder Entfernen einzelner HTML-Elemente kümmern.

    Die Datei enthält bereits eine Methode zum Erzeugen von Product-Cards.
    Sie liefert das fertige und mit Daten befüllte HTML-Element zurück.

    Außerdem hat Datei einige nötige Referenzen auf HTML-Elemente der GUI.
    Diese können bereits genutzt werden.
    Weitere nötige Referenzen auf HTML-Elemente der GUI können nach demselben Muster per ID-Zugriff gemacht werden.
*/

// Imports der Kühlschrank Klasse aus der externen Datei
import Fridge from "./fridge.js";
// Imports der Produkt Klasse aus der externen Datei
import Product from "./product.js";

/* ----------- HILFSVARIABLEN ----------- */
// Konstante für einen Tag in Millisekunden
const ONE_DAY = 1000*60*60*24;
/* -------------------------------------- */

/* ----------- GUI REFERENZEN ----------- */

// Referenz auf Produkte-Container
const fridgeProductsContainer = document.querySelector('#fridge-products-container');

// Referenz auf Input für Name des neuen Produkts
const addProductNameInput = document.querySelector('#form-add-product-name');
// Referenz auf Input für Volumen des neuen Produkts
const addProductVolInput = document.querySelector('#form-add-product-volume');
// Referenz auf Input für Ablaufdatum des neuen Produkts
const addProductExpDateInput = document.querySelector('#form-add-product-exp-date');
// Referenz auf Button für Bestätigung des neuen Produkts
const addProductSubmitBtn = document.querySelector('#btn-add-product');
// Clean BUTTON
const cleanButton = document.querySelector('#clean-fridge-btn');
// Defrost BUTTON
const defrostButton = document.querySelector('#remove-all-products-btn');
// SORT BUTTON
const sortButton = document.querySelector('#sort-products-by-exp-date-btn');
// Fridge Capacity
const fridgeCapacity = document.querySelector('#fridge-capacity-span');
// Amount Products
const amountProducts = document.querySelector('#products-amount-span');
// Free capacity
const freeCapacity = document.querySelector('#fridge-free-capacity-span');
// Until tomorrow
const untilTomorrow = document.querySelector('#products-until-tomorrow-span');
// Expired Products
const expiredProducts = document.querySelector('#products-until-tomorrow-span');
// Smallest product
const smallestProduct = document.querySelector('#smallest-product-span');
// Biggest Product
const biggestProduct = document.querySelector('#biggest-product-span');

/* -------------------------------------- */


/* 
    Funktion zum Erstellen einer Produktcard für den Kühlschrank.
    Sie erhält als Parameter
    - Den Namen des Produkts (productName)
    - Das Volumen des Produkts (productVolume), also den Platz, den es innerhalb des Kühlschranks einnimmt
    - Das Ablaufdatum des Produkts (productExpDate)
    - Ein boole'scher Indikator dafür, ob das Produkt abgelaufen ist (isExpired)
    - Eine Callback-Funktion für Behandlung des Klicks auf den Löschknopf der jeweiligen Card (deleteCallback)
        Sollte dieses Callback keiner Funktion entsprechen (oder nicht mitgeliefert werden) erscheint eine Fehlermeldung in der Konsole.

    Als Rückgabewert (return) liefert sie das fertige HTML-Element mit allen übergebenen Informationen.
*/
function createNewProductCard(productName, productVolume, productExpDate, isExpired, deleteCallback) {
    // Erstelle äußeres Card-div
    let card = document.createElement('div');
    // Hänge Bootstrap card-Klasse an
    card.classList.add('card');

    // Erstelle inneres Card-Body-div
    let cardBody = document.createElement('div');
    // Hänge Bootstrap card-body-Klasse an
    cardBody.classList.add('card-body');

    // Erstelle Card Titel
    let cardTitle = document.createElement('h5');
    // Hänge Bootstrap card-title Klasse an
    cardTitle.classList.add('card-title');
    // Fülle Card Titel mit übergebenem Produktnamen
    cardTitle.innerText = productName + ' ';

    // Erstelle Knopf zum Löschen des Produktes
    let deleteCardBtn = document.createElement('button');
    // Setze button-type
    deleteCardBtn.type = 'button';
    // Hänge Bootrap Button Klassen an abhängig davon, ob Produkt bereits abgelaufen oder nicht
    deleteCardBtn.classList.add('btn', 'btn-sm', (isExpired ? 'btn-outline-danger' : 'btn-outline-primary'));

    // Prüfe, ob übergebenes Callback für den Löschknopf gültig ist
    if (typeof deleteCallback === 'function') {
        // Hänge übergebenes Callback auf das onClick-Event des Löschknopfs an
        deleteCardBtn.addEventListener('click', evt => {
            deleteCallback();
        });

    } else {
        // Gebe aus, dass übergebenes Callback ungültig ist
        console.log('%cDas mitgelieferte Callback zum Löschen des Produkts ist keine Funktion oder nicht vorhanden.', 'color: red;');
    }

    // Erstelle icon-Element für Löschknopf
    let deleteCardBtnIcon = document.createElement('i');
    // Hänge dem icon-Element abhängig von Ablaufszustand die entsprechende Bootstrap Klasse an
    deleteCardBtnIcon.classList.add('fa-solid', (isExpired ? 'fa-trash' : 'fa-utensils'));

    // Erstelle Untertitel Element
    let cardSubTitle = document.createElement('h6');
    // Hänge Bootstrap card-subtitle Klasse an Untertitel Element an
    cardSubTitle.classList.add('card-subtitle', 'mb-2', 'text-muted');

    // Wenn abgelaufen, ersetze Bootstrap Klasse für Textfarbe
    if (isExpired) cardSubTitle.classList.replace('text-muted', 'text-danger');
    // Wenn kurz vor Ablauf, ersetze Bootstrap Klasse für Textfarbe
    else if (new Date(productExpDate) - new Date() < ONE_DAY) cardSubTitle.classList.replace('text-muted', 'text-warning');
    // Befülle Untertitel Element mit übergebenem Ablaufsdatum
    cardSubTitle.innerText = productExpDate;

    // Erstelle Text-Element für Produkt-Volumen
    let cardText = document.createElement('p');
    // Hänge Bootstrap card-text Klasse an Text-Element an
    cardText.classList.add('card-text');
    
    // Befülle Text-Element mit übergebenem Produktvolumen
    cardText.innerText = productVolume + " VU";

    // Hänge Lösch-Icon an Löschknopf an
    deleteCardBtn.appendChild(deleteCardBtnIcon);
    // Hänge Löschknopf an Card Titel an
    cardTitle.appendChild(deleteCardBtn);

    // Hänge Card Titel an Card-Body an
    cardBody.appendChild(cardTitle);
    // Hänge Card Untertiel an Card-Body an
    cardBody.appendChild(cardSubTitle);
    // Hänge Card Text an Card-Body an
    cardBody.appendChild(cardText);
    
    // Hänge Card-Body an Card-div an
    card.appendChild(cardBody);

    // Gebe fertige Klasse zurück
    return card;
}

// Neue Kühlschrank
let samsung = new Fridge(100, 'samsung');
// FRIDGE CAPACITY
fridgeCapacity.innerText = samsung.capacity;

// Amount products





// Produkte erstellen
let eier = new Product('eier', 10, new Date('2022-11-03'));
let tomaten = new Product('Tomaten', 15, new Date('2022-11-05'));
let joghurt = new Product('Joghurt', 5, new Date('2022-10-05'));
let quark = new Product('Quark', 10, new Date('2022-10-26'));
// Produkte zufügen
samsung.addProduct(eier);
samsung.addProduct(joghurt)
samsung.addProduct(tomaten);
samsung.addProduct(quark);


// Kühlschrank befüllen
function fillFridge(fridge) {
    
    fridge.storage.forEach((prod) => {
    
        if (prod.expirationDate < new Date()) prod.isExpired = true;
    
        let date = prod.expirationDate.getDate() + '.' + prod.expirationDate.getMonth() + '.' + prod.expirationDate.getFullYear();
        // Die erste Buchstaben Groß machen
        let prodName = prod.name.charAt(0).toUpperCase() + prod.name.slice(1);
        //Neue Card im Kühlschrankk erstellen
        let newCard = createNewProductCard(prodName, prod.volume, date, prod.isExpired, function () {
            fridgeProductsContainer.removeChild(newCard);
        });
        // Neue Card dem Kühlschrank adden
        fridgeProductsContainer.appendChild(newCard);
    });
    
}





// Clean Fridge Expired Products
function cleanFridge(fridge) {
    fridge.deleteExpProducts()
}
// cleanFridge(samsung)
cleanButton.addEventListener('click', function (evt) {
    // Lösche alte cards 
    fridgeProductsContainer.replaceChildren();
    // Lösche abgelaufene Produkte
    cleanFridge(samsung);  
    // Neue Produkteliste zufügen
    fillFridge(samsung); 
});

// DEFROST Kühlschrank
defrostButton.addEventListener('click', function (evt) {
   // Lösche alte cards 
   fridgeProductsContainer.replaceChildren();
});


// SORTIERE

sortButton.addEventListener('click', function (evt) {
    fridgeProductsContainer.replaceChildren();
    samsung.sortProducts();
    fillFridge(samsung); 
});





// Button
// function checkInput() {
//     let inputCheck = false;

    
//     addProductNameInput.addEventListener('input', function (evt) {
//         console.log(this.value);
        
//         if (this.value.length > 0) {
//             inputCheck = true;
//         } else inputCheck = false;
//         console.log(inputCheck);
//     });

//     console.log(inputCheck);
//     if (inputCheck) {
//         return addProductSubmitBtn.disabled = false;
//     } else  return addProductSubmitBtn.disabled = true;
// }
// checkInput()


addProductSubmitBtn.disabled = true;

addProductNameInput.addEventListener('input', function (evt) {
    console.log(this.value);
    if (this.value.length > 0) {
        addProductSubmitBtn.disabled = false;
    } else addProductSubmitBtn.disabled = true;
});


addProductSubmitBtn.addEventListener('click', function (evt) {
    console.log(addProductExpDateInput.value);
    let isExpired = false;

    // DAtum von heute abgekürzt
    let today = new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear();
    
    // Wenn Produkt abgelaufen ist - wird true
    if (addProductExpDateInput.value < today) isExpired = true;
    console.log(isExpired);
    // Die erste Buchstaben Groß machen
    let prodName = addProductNameInput.value.charAt(0).toUpperCase() + addProductNameInput.value.slice(1);
    //Neue Card im Kühlschrankk erstellen
    let newCard = createNewProductCard(prodName, addProductVolInput.value, addProductExpDateInput.value, isExpired, function () {
        fridgeProductsContainer.removeChild(newCard);
    });
    // Neue Card dem Kühlschrank adden
    fridgeProductsContainer.appendChild(newCard);

    evt.target.disabled = true;
    addProductNameInput.value = '';
    addProductVolInput.value = '';
    addProductExpDateInput.value = '';
});







// BUTTON DISABLED / ENABLED



fillFridge(samsung);