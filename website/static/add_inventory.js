function deleteInputRow() {
    console.log("DELETE!");
}

function createInputRow() {

    // Create the row
    const row = document.createElement("div");
    row.setAttribute("class", "row g-3 my-2 align-items-start");

    // Create the SKU div and attach the label
    const sku = document.createElement("div");
    sku.setAttribute("class", "col-md-1 justify-content-center");
    const labelSku = document.createElement("label");
    labelSku.setAttribute("class", "col-md-1 col-form-label");
    labelSku.textContent = "New"
    sku.appendChild(labelSku);
    row.appendChild(sku);

    // Create the QTY div and attach the label
    const qty = document.createElement("div");
    qty.setAttribute("class", "col-md-1 justify-content-center border-right");
    const labelQty = document.createElement("label");
    labelQty.setAttribute("class", "col-md-1 col-form-label");
    labelQty.textContent = "-"
    qty.appendChild(labelQty);
    row.appendChild(qty);

    // Create the item name div and attached label
    const name = document.createElement("div");
    name.setAttribute("class", "col");
    const labelName = document.createElement("input");
    labelName.setAttribute("class", "form-control");
    name.appendChild(labelName);
    row.appendChild(name);

    // Create the cost input
    const cost = document.createElement("div");
    cost.setAttribute("class", "col-md-1");
    cost.setAttribute("style", "min-width: 94px;");
    const labelCost = document.createElement("input");
    labelCost.setAttribute("class", "form-control");
    cost.appendChild(labelCost);
    row.appendChild(cost);

    // TODO: This needs to be differentiated from the "qty" variable
    // Create the quantity input
    const quantity = document.createElement("div");
    quantity.setAttribute("class", "col-md-1");
    quantity.setAttribute("style", "min-width: 94px;");
    const labelQuantity = document.createElement("input");
    labelQuantity.setAttribute("class", "form-control");
    quantity.appendChild(labelQuantity);
    row.appendChild(quantity);

    // Create link input
    const link = document.createElement("div");
    link.setAttribute("class", "col-md-2");
    const labelLink = document.createElement("input");
    labelLink.setAttribute("class", "form-control");
    link.appendChild(labelLink);
    row.appendChild(link);

    // Create source input
    const source = document.createElement("div");
    source.setAttribute("class", "col-md-2");
    const labelSource = document.createElement("input");
    labelSource.setAttribute("class", "form-control");
    source.appendChild(labelSource);
    row.appendChild(source);

    // Create the little bar/expand icon
    const expand = document.createElement("div");
    expand.setAttribute("class", "col-auto p-0");
    const labelExpand = document.createElement("button");
    labelExpand.setAttribute("class", "btn");
    const expandImage = document.createElement("i");
    expandImage.setAttribute("class", "fa fa-bars");
    labelExpand.appendChild(expandImage);
    expand.appendChild(labelExpand);
    row.appendChild(expand);

     // Create the delete icon
    const remove = document.createElement("div");
    remove.setAttribute("class", "col-auto p-0");
    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "btn");
    btnRemove.setAttribute("type", "button");
    const removeImage = document.createElement("i");
    removeImage.setAttribute("class", "fa fa-trash");
    btnRemove.appendChild(removeImage);
    remove.appendChild(btnRemove);
    row.appendChild(remove);

    // Add functionality to delete
    btnRemove.onclick = function() {
        row.remove();
    };

	return row;
}


const btnAdd = document.querySelector('#btnAdd');
console.log("btnAdd");
var i = 0;

document.querySelector("#inputArea").appendChild(createInputRow())
btnAdd.onclick = function() {
	const addArea = document.querySelector('#inputArea');
	console.log(addArea);


	addArea.appendChild(createInputRow());
	i = i + 1;

};
