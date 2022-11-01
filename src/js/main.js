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
// Shop-List "Modal Fenster"
import Shoplist from "./einkaufs-liste.js";

/* ----------- HILFSVARIABLEN ----------- */
// Konstante für einen Tag in Millisekunden
const ONE_DAY = 1000 * 60 * 60 * 24;
/* -------------------------------------- */

/* ----------- GUI REFERENZEN ----------- */

// Referenz auf Produkte-Container
const fridgeProductsContainer = document.querySelector(
  "#fridge-products-container"
);

// Referenz auf Input für Name des neuen Produkts
const addProductNameInput = document.querySelector("#form-add-product-name");
// Referenz auf Input für Volumen des neuen Produkts
const addProductVolInput = document.querySelector("#form-add-product-volume");
// Referenz auf Input für Ablaufdatum des neuen Produkts
const addProductExpDateInput = document.querySelector(
  "#form-add-product-exp-date"
);
// Referenz auf Button für Bestätigung des neuen Produkts
const addProductSubmitBtn = document.querySelector("#btn-add-product");
// Clean BUTTON
const cleanButton = document.querySelector("#clean-fridge-btn");
// Defrost BUTTON
const defrostButton = document.querySelector("#remove-all-products-btn");
// SORT BUTTON
const sortButton = document.querySelector("#sort-products-by-exp-date-btn");
// Fridge Capacity
const fridgeCapacity = document.querySelector("#fridge-capacity-span");
// Amount Products
const amountProducts = document.querySelector("#products-amount-span");
// Free capacity
const freeCapacity = document.querySelector("#fridge-free-capacity-span");
// Until tomorrow
const untilTomorrow = document.querySelector("#products-until-tomorrow-span");
// Expired Products
const expiredProducts = document.querySelector("#products-expired-span");
// Smallest product
const smallestProduct = document.querySelector("#smallest-product-span");
// Biggest Product
const biggestProduct = document.querySelector("#biggest-product-span");
// PRESETS
//Preset-1
const preset1 = document.querySelector("#add-product-preset1-btn");
//Preset-2
const preset2 = document.querySelector("#add-product-preset2-btn");
//Preset-3
const preset3 = document.querySelector("#add-product-preset3-btn");
/* -------------------------------------- */
// ------------------Modal Fenster ----------------------

// BESTELL BUTTON (ADD BUTTON)
const bestellButton = document.querySelector("#bestell-btn");
// LIST CONTAINER für die Produkte, die wieder gekauft werden müssen
const shopListContainer = document.querySelector(".list-group");
// Heutige Datumvariable
let today = new Date().getTime();


// -------------------------------------------------------

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
function createNewProductCard(
  productName,
  productVolume,
  productExpDate,
  isExpired,
  deleteCallback
) {
  // Erstelle äußeres Card-div
  let card = document.createElement("div");
  // Hänge Bootstrap card-Klasse an
  card.classList.add("card");

  // Erstelle inneres Card-Body-div
  let cardBody = document.createElement("div");
  // Hänge Bootstrap card-body-Klasse an
  cardBody.classList.add("card-body");

  // Erstelle Card Titel
  let cardTitle = document.createElement("h5");
  // Hänge Bootstrap card-title Klasse an
  cardTitle.classList.add("card-title");
  // Fülle Card Titel mit übergebenem Produktnamen
  cardTitle.innerText = productName + " ";

  // Erstelle Knopf zum Löschen des Produktes
  let deleteCardBtn = document.createElement("button");
  // Setze button-type
  deleteCardBtn.type = "button";
  // Hänge Bootrap Button Klassen an abhängig davon, ob Produkt bereits abgelaufen oder nicht
  deleteCardBtn.classList.add(
    "btn",
    "btn-sm",
    isExpired ? "btn-outline-danger" : "btn-outline-primary"
  );

  // Prüfe, ob übergebenes Callback für den Löschknopf gültig ist
  if (typeof deleteCallback === "function") {
    // Hänge übergebenes Callback auf das onClick-Event des Löschknopfs an
    deleteCardBtn.addEventListener("click", (evt) => {
      deleteCallback();
    });
  } else {
    // Gebe aus, dass übergebenes Callback ungültig ist
    console.log(
      "%cDas mitgelieferte Callback zum Löschen des Produkts ist keine Funktion oder nicht vorhanden.",
      "color: red;"
    );
  }

  // Erstelle icon-Element für Löschknopf
  let deleteCardBtnIcon = document.createElement("i");
  // Hänge dem icon-Element abhängig von Ablaufszustand die entsprechende Bootstrap Klasse an
  deleteCardBtnIcon.classList.add(
    "fa-solid",
    isExpired ? "fa-trash" : "fa-utensils"
  );

  // Erstelle Untertitel Element
  let cardSubTitle = document.createElement("h6");
  // Hänge Bootstrap card-subtitle Klasse an Untertitel Element an
  cardSubTitle.classList.add("card-subtitle", "mb-2", "text-muted");

  // Wenn abgelaufen, ersetze Bootstrap Klasse für Textfarbe
  if (isExpired) cardSubTitle.classList.replace("text-muted", "text-danger");
  // Wenn kurz vor Ablauf, ersetze Bootstrap Klasse für Textfarbe
  else if (new Date(productExpDate) - new Date() < ONE_DAY)
    cardSubTitle.classList.replace("text-muted", "text-warning");
  // Befülle Untertitel Element mit übergebenem Ablaufsdatum
  cardSubTitle.innerText = productExpDate.toLocaleDateString("de-DE");

  // Erstelle Text-Element für Produkt-Volumen
  let cardText = document.createElement("p");
  // Hänge Bootstrap card-text Klasse an Text-Element an
  cardText.classList.add("card-text");

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
//------------------------------------------NEUE KÜHLSCHRANK---------------------------------------------------------------
// Neue Kühlschrank
let samsung = new Fridge(100, "samsung");

/* ------------------------------------------EINKAUFSLISTE--------------------------------------------------------- */
// Erstelle die neue Einkaufsliste
let einkaufsliste = new Shoplist();
// ----------------------------------------Render Stautus ANZEIGE------------------------------------
function renderStatus(fridge) {
  // TOTAL CAPACITY
  fridgeCapacity.innerText = fridge.capacity;
  // Amount
  amountProducts.innerText = fridge.totalProducts();
  // FREE Capacity
  freeCapacity.innerText = fridge.freeCapacity();
  //Until Tomorrow
  untilTomorrow.innerText = fridge.untilTomorrow();
  // Eprired PRoducts
  expiredProducts.innerText = fridge.expProducts();
  //Smallest product
  smallestProduct.innerText = fridge.smallestVU();
  //Biggest product
  biggestProduct.innerText = fridge.biggestVU();
}

// Starte fillFridge,renderStatus & fillShopList
// FillFridge erstellt die Produkte im Kühlschrank
// Renderstatus ist für die Statusanzeigen verantwortlich
// FillShopList erstellt die Produkteliste in der Buy Again
function renderGui(fridge) {
  fillFridge(fridge);
  renderStatus(fridge);
  fillShopList(samsung);
}

// Produkte erstellen
let eier = new Product("eier", 10, new Date("2022-11-03"));
let tomaten = new Product("Tomaten", 15, new Date("2022-11-05"));
let joghurt = new Product("Joghurt", 5, new Date("2022-10-05"));
let quark = new Product("Quark", 10, new Date("2022-10-27"));
let bananen = new Product("Bananen", 5, new Date("2022-11-08"));
let milch = new Product("Milch", 2, new Date("2022-11-10"));
let kefir = new Product("Kefir", 3, new Date("2022-11-15"));
// Produkte zufügen
samsung.addProduct(eier);
samsung.addProduct(joghurt);
samsung.addProduct(tomaten);
samsung.addProduct(quark);
samsung.addProduct(bananen);
samsung.addProduct(milch);
samsung.addProduct(kefir);

renderGui(samsung);

// -----------------------------Kühlschrank befüllen-----------------------------
function fillFridge(fridge) {
  // clean container
  fridgeProductsContainer.replaceChildren();
  // Gehe über Kühlschrank datenmbank (ARRAY mit OBJECTS)
  fridge.storage.forEach((prod, index) => {
    // Erstelle eine Variable um zu prüfen ob Produkte abgelaufen sind
    let isExpired = false;
    if (prod.expirationDate < new Date()) isExpired = true;
 
    // Speichere Ablaufdatum des Produktes in einer Variable
    let date = prod.expirationDate;
    // Die erste Buchstaben Groß machen
    let prodName = prod.name.charAt(0).toUpperCase() + prod.name.slice(1);

    let deleteCallback = (fridge, index) => {
      // Entferne das Produkt anhand des Index aus dem Array in der Fridge-Instanz
      fridge.deleteProduct(index);
      einkaufsliste.addProducts(prod);
      // Rufe die allgemeine Render-Funktion auf, um neuen Zustand in der GUI darzustellen
      renderGui(fridge);
    };

    //Neue Card im Kühlschrankk erstellen
    let newCard = createNewProductCard(
      prodName,
      prod.volume,
      date,
      isExpired,
      function () {
        deleteCallback(fridge, index);
      }
    );
    // Neue Card dem Kühlschrank adden
    fridgeProductsContainer.appendChild(newCard);
  });
}

// --------------------------CONTROLS-----------------------------------

// cleanFridge bereinigt Kühlschrank von Abgelaufene Produkte und Speichert diese Produkte in 
// die Einkaufsliste
cleanButton.addEventListener("click", function (evt) {

  // Finde Produkte die Abgelaufen sind, entferne diese aus dem Kühlschrank und füge der Wiedereinkaufslistee zu
  samsung.storage.forEach(product => {
    if (product.expirationDate < today) {
      // Lösche abgelaufene Produkte
      samsung.deleteExpProducts();
      // Füge frische Produkte Einkaufsliste zu
      einkaufsliste.addProducts(product);
    }
  });
  // Neue Produkteliste zufügen
  renderGui(samsung);
});

// DEFROST Kühlschrank
defrostButton.addEventListener("click", function (evt) {
  // Lösche alle Produkte von Datenbank
  samsung.deleteAllProducts();
  // Kühlschrank neu laden
  renderGui(samsung);
});

// SORTIERE BUTTON
sortButton.addEventListener("click", function (evt) {
  samsung.sortProducts();
  renderGui(samsung);
});

// ----------------Prüfe ob alle inputs den Inhalt haben
addProductNameInput.addEventListener("input", function (evt) {
  handleSubmittButtonActivate();
});
addProductVolInput.addEventListener("input", function (evt) {
  handleSubmittButtonActivate();
});

addProductExpDateInput.addEventListener("input", function (evt) {
  handleSubmittButtonActivate();
});
// Wenn alle inputs den Inhalt haben, dann wird der button clickbar
function handleSubmittButtonActivate() {
  if (
    addProductNameInput.value.length > 0 &&
    addProductVolInput.value.length > 0 &&
    addProductExpDateInput.value.length > 0
  ) {
    addProductSubmitBtn.disabled = false;
  } else addProductSubmitBtn.disabled = true;
}

// ----------------------------------ADD PRODUCTS BUTTON--------------
addProductSubmitBtn.addEventListener("click", function (evt) {
  // Die erste Buchstaben Groß machen
  let prodName =
    addProductNameInput.value.charAt(0).toUpperCase() +
    addProductNameInput.value.slice(1);
// Erstelle neue Produkt
  let newProdukt = new Product(
    prodName,
    parseInt(addProductVolInput.value),
    new Date(addProductExpDateInput.value)
  );
  // Füge neue Produkt dem Datenbank zu
  samsung.addProduct(newProdukt);
  // GUI restart
  renderGui(samsung);

  // Button wieder unclickable machen
  evt.target.disabled = true;
  // Alle inputs leeren
  addProductNameInput.value = "";
  addProductVolInput.value = "";
  addProductExpDateInput.value = "";
});

// -------------------------PRESETS-------------------
preset1.addEventListener("click", function (evt) {
  let today = new Date().setHours(0, 0, 0, 0);
  let produktDate = new Date(today + ONE_DAY * 14);
  // Erstelle eier
  let newProdukt = new Product("Eier", 15, produktDate);
  samsung.addProduct(newProdukt);
  //GUI neustarten
  renderGui(samsung);
});

preset2.addEventListener("click", function (evt) {
  let today = new Date().setHours(0, 0, 0, 0);
  let produktDate = new Date(today + ONE_DAY * 7);
  // Erstelle Bananen
  let newProdukt = new Product("Bananen", 5, produktDate);
  samsung.addProduct(newProdukt);
  //GUI neustarten
  renderGui(samsung);
});

preset3.addEventListener("click", function (evt) {
  let today = new Date().setHours(0, 0, 0, 0);
  let produktDate = new Date(today + ONE_DAY * 20);
  // Erstelle Kefir
  let newProdukt = new Product("Kefir", 3, produktDate);
  samsung.addProduct(newProdukt);
  //GUI neustarten
  renderGui(samsung);
});

/* -------------------------SHop List-----BUY AGAIN---------------------------- */



// funktion um die Shop Liste zu befühlen
function fillShopList(fridge) {
  // Schoplist leeren
  shopListContainer.replaceChildren();
  // Durch einkaufsliste array 
  einkaufsliste.list.forEach((product) => {
    // Erstelle neue Button für die Liste
    let newShopButton = document.createElement("button");
    // Füge dem Button Attribut, classen und Name
    newShopButton.setAttribute("type", "button");
    newShopButton.classList.add("list-group-item", "list-group-item-action");
    newShopButton.innerText = product.name;
    // Füge button zu Modal Fenster Container
    shopListContainer.appendChild(newShopButton);

    // bei button-click wird classe active zugefügt
    newShopButton.addEventListener("click", function (evt) {
      evt.target.classList.toggle("active");
    });
    
  });
}

// Remove aus der Liste die bestellte Elemente und lösche die Buttons
function orderProducts(fridge) {
  // BUTTONS In der EINKAUFSLISTE
  const einkauslisteBtns = document.querySelectorAll(".list-group-item");
  // durch buttons-liste
  einkauslisteBtns.forEach((button) => {
    // Wenn button Aktiv ist dann wird der gelöscht und dem Kühlschrank zugefügt
    if (button.classList.contains("active")) {
      einkaufsliste.list.forEach((product, productIndex) => {

        if (button.innerHTML.toLowerCase() === product.name.toLowerCase()) {
          einkaufsliste.removeProduct(productIndex);
          fridge.addProduct(product);
        } 
      });
    }
  });
  // GUI Restart
  renderGui(fridge);
}

// BESTELL BUTTON
bestellButton.addEventListener("click", function (evt) {
  orderProducts(samsung);
});


