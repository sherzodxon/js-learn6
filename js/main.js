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
const addZero = function (number) {
    return number < 10 ? "0" + number : number
}

const showDate = function (dateString) {
    const date = new Date(dateString);

    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
}
const list = document.querySelector("#product-list");

const renderProduct = function (product) {
    const {
        id,
        title,
        img,
        price,
        model,
        addedDate,
        benefits
    } = product

    currentProduct = product;

    const PRICE = Math.floor(price / 1000000).toFixed(0);
    const LEFT = Math.floor((price % 1000000) / 1000).toFixed(3);
    const SUM = `${PRICE}.${LEFT} so'm`;

    const productItem = createElement("li", "col-4", "", "");

    const productCard = createElement("div", "card")

    const productImg = createElement("img", "card-img-top", "", img);
    const productDiv = createElement("div", "card-body", "", "");

    const productTitle = createElement("h3", "card-title", title, "");
    const productTextOne = createElement("p", "text fw-bocardld", SUM, "");
    const productTextDel = createElement("s", "", " 2.000.000 so'm", "");
    const productTextTwo = createElement("p", "card-text", "", "");
    const productTextThree = createElement("p", "badge bg-success", model, "");
    const productTextDate = createElement("p", "card-text", showDate(addedDate), "");

    productTextTwo.append(productTextDel);

    productDiv.append(productTitle);
    productDiv.append(productTextOne);
    productDiv.append(productTextTwo);
    productDiv.append(productTextThree);
    productDiv.append(productTextDate);

    const productList = createElement("ul", "d-flex flex-wrap list-unstyled", "", "");

    for (j = 0; j < benefits.length; j++) {
        const currentBenefit = benefits[j];
        const productListItem = createElement("li", "badge bg-primary me-1 mb-1", currentBenefit, "");
        productList.append(productListItem);
    }

    const productButDiv = createElement("div", "position-absolute top-0 end-0 d-flex", "", "");
    const productButMark = createElement("button", "btn rounded-0 btn-secondary", "", "");
    productButMark.setAttribute("data-editing", id);
    productButMark.setAttribute("data-bs-toggle", "modal");
    productButMark.setAttribute("data-bs-target", "#edit-product-modal");
    const productButDel = createElement("button", "btn rounded-0 btn-danger", "", "");
    productButDel.setAttribute("data-delete", id);
    const productButIMark = createElement("i", "fa-solid fa-pen", "", "");
    productButIMark.style.pointerEvents = "none";
    const productButIDel = createElement("i", "fa-solid fa-trash", "", "");
    productButIDel.style.pointerEvents = "none";

    productButMark.append(productButIMark);
    productButDel.append(productButIDel);
    productButDiv.append(productButMark);
    productButDiv.append(productButDel);

    productDiv.append(productList);
    productDiv.append(productButDiv);

    productCard.append(productImg);
    productCard.append(productDiv)
    productItem.append(productCard);
    list.append(productItem)

    return productItem;
}
for (let i = 0; i < products.length; i++) {
    const currentProduct = products[i];

    const productItem = renderProduct(currentProduct);

    list.append(productItem);
}
const remainingProduct = function () {
    list.innerHTML = "";

    products.forEach(function (findingProduct) {

        const productItem = renderProduct(findingProduct);
        list.append(productItem);
    });
}
const addForm = document.querySelector("#modal-form");
const formSelect = document.querySelector("#product-manufacturer");
const formEditSelect = document.querySelector("#edit-product-manufacturer")
const addProductModalEl = document.querySelector("#edit-student-modal");
const addProductModal = new bootstrap.Modal(addProductModalEl);

for (let i = 0; i < manufacturers.length; i++) {
    const formOption = createElement("option", "", manufacturers[i].name, "");
    formSelect.append(formOption);
}
for (let i = 0; i < manufacturers.length; i++) {
    const formOption = createElement("option", "", manufacturers[i].name, "");
    formEditSelect.append(formOption);
}
const nameEdit = document.querySelector("#edit-product-title")
const priceEdit = document.querySelector("#edit-price");
const manufacterEdit = document.querySelector("#edit-product-manufacturer");
const benefitEdit = document.querySelector("#edit-benefits");

const editForm = document.querySelector("#edit-modal-form");
const editProductModalEl = document.querySelector("#edit-product-modal");
const editProductModal = new bootstrap.Modal(editProductModalEl);


list.addEventListener('click', function (evt) {
    if (evt.target.matches(".btn-danger")) {
        const clickedBtnDel = +evt.target.dataset.delete;

        const clickedBtnDelIndex = products.findIndex(function (findedProductIndex) {
            return findedProductIndex.id == clickedBtnDel;
        })
        products.splice(clickedBtnDelIndex, 1);

        remainingProduct();
    } else if (evt.target.matches(".btn-secondary")) {
        const clickedBtnEdit = +evt.target.dataset.editing;

        const clickedBtnEditIndex = products.find(function (findedProductIndex) {
            return findedProductIndex.id == clickedBtnEdit;
        })
        nameEdit.value = clickedBtnEditIndex.title;
        priceEdit.value = clickedBtnEditIndex.price;
        manufacterEdit.value = clickedBtnEditIndex.manufacturers;
        benefitEdit.value = clickedBtnEditIndex.benefits;

        editForm.setAttribute("data-editing-id", clickedBtnEditIndex.id);
    }
})

addForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const elements = evt.target.elements;

    const nameValue = elements["product-title"].value;
    const priceValue = elements.price.value;
    const manufacterValue = elements["product-manufacturer"].value;
    const benefitValue = elements.benefits.value.split(" ");

    const product = {
        id: Math.floor(Math.random() * 1000),
        title: nameValue,
        img: "https://picsum.photos/300/200",
        price: priceValue,
        model: manufacterValue,
        addedDate: new Date().toISOString(),
        benefits: benefitValue
    }
    products.push(product);
    addForm.reset();
    addProductModal.hide();

    renderProduct(product)

});

editForm.addEventListener('submit', function (evt) {
    evt.preventDefault()
    const editingId = +evt.target.dataset.editingId

    const nameValue = nameEdit.value;
    const priceValue = priceEdit.value;
    const benefitValue = benefitEdit.value.split(" ");
    const manufacterValue = manufacterEdit.value;

    const product = {
        id: Math.floor(Math.random() * 1000),
        title: nameValue,
        img: "https://picsum.photos/300/200",
        price: priceValue,
        model: manufacterValue,
        addedDate: new Date().toISOString(),
        benefits: benefitValue
    }
    const editingProductIndex = products.findIndex(function (findProducts) {
        return findProducts.id == editingId;
    })

    products.splice(editingProductIndex, 1, product);

    editForm.reset();
    editProductModal.hide();
    remainingProduct();
})

const input = document.querySelector("#benefits");
const inputList = document.querySelector("#split-list");
const inputBenefits = [];

const splitingInput = function () {
    inputList.innerHTML = "";
}

input.addEventListener("input", function () {

    const splittedValue = input.value.trim().split(" ");
    if (splittedValue.length == 2) {
        inputBenefits.push(splittedValue[0]);
        input.value = "";
    }

    splitingInput();
    
    for (let i = 0; i < inputBenefits.length; i++) {
        const createdBtn = createElement("button", "btn btn-sm badge rounded-pill btn-danger", inputBenefits[i], "");
        const inputItem = createElement("li", "me-1 mb-1", "", "");
        inputItem.append(createdBtn);
        inputList.append(inputItem);
    }

})
