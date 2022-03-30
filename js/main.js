const createElement = function (name, className, textContent, image) {
    const createdElement = document.createElement(name);
    createdElement.className = className;
    if (textContent) {
        createdElement.textContent = textContent;
    } else {
        createdElement.src = image;
    }
    return createdElement;
}
const addZero = function(number) {
    return number < 10 ? "0" + number : number
  }

const showDate = function(dateString) {
    const date = new Date(dateString);
  
    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  }
const list = document.querySelector("#product-list");

for (i = 0; i < products.length; i++) {
    currentProduct = products[i];

    const PRICE = Math.floor(products[i].price / 1000000).toFixed(0);
    const LEFT = Math.floor((products[i].price % 1000000) / 1000).toFixed(3);
    const SUM = `${PRICE}.${LEFT} so'm`;

    const productItem = createElement("li", "col-4 card", "", "");

    const productImg = createElement("img", "card-img-top", "", currentProduct.img);
    const productDiv = createElement("div", "card-body", "", "");

    const productTitle = createElement("h3", "card-title", currentProduct.title, "");
    const productTextOne = createElement("p", "text fw-bocardld", SUM, "");
    const productTextDel = createElement("s", "", " 2.000.000 so'm", "");
    const productTextTwo = createElement("p", "card-text", "", "");
    const productTextThree = createElement("p", "badge bg-success", currentProduct.model, "");
    const productTextDate = createElement("p", "card-text", showDate(currentProduct.addedDate), "");

    productTextTwo.append(productTextDel);

    productDiv.append(productTitle);
    productDiv.append(productTextOne);
    productDiv.append(productTextTwo);
    productDiv.append(productTextThree);
    productDiv.append(productTextDate);

    const productList = createElement("ul", "d-flex flex-wrap list-unstyled", "", "");

    for (j = 0; j < products[i].benefits.length; j++) {
        const currentBenefit = products[i].benefits[j];
        const productListItem = createElement("li", "badge bg-primary me-1 mb-1", currentBenefit, "");
        productList.append(productListItem);
    }

    const productButDiv = createElement("div","position-absolute top-0 end-0 d-flex","","");
    const productButMark =createElement("button","btn rounded-0 btn-secondary","","");
    const productButDel =createElement("button","btn rounded-0 btn-danger","","");
    const productButIMark =createElement("i","fa-solid fa-pen","","");
    const productButIDel =createElement("i","fa-solid fa-trash","","");

    productButMark.append(productButIMark);
    productButDel.append(productButIDel);
    productButDiv.append(productButMark);
    productButDiv.append(productButDel);

    productDiv.append(productList);
    productDiv.append(productButDiv);

    productItem.append(productImg);
    productItem.append(productDiv);

    list.prepend(productItem);
}