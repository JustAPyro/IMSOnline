function createInputRow() {

    // Create the row
    const row = document.createElement("div");
    row.setAttribute("class", "row g-3 my-2");

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
    name.setAttribute("class", "col-md-3");
    const labelName = document.createElement("input");
    labelName.setAttribute("class", "form-control");
    name.appendChild(labelName);
    row.appendChild(name);





	return row;
}


const btnAdd = document.querySelector('#btnAdd');
console.log("btnAdd");
var i = 0;

//document.querySelector("#inputArea").appendChild(createInputRow())
btnAdd.onclick = function() {
	const addArea = document.querySelector('#inputArea');
	console.log(addArea);


	addArea.appendChild(createInputRow());
	i = i + 1;

};
