function formatURLSource(source) {
    const text = source.replace("www.", "")
        .replace(".com", "");

    return text.charAt(0).toUpperCase() + text.slice(1);
}

class FlaskDataManager{

	static load(flask_names, flask_quantity) {
		this.names = flask_names;
		this.quantity = flask_quantity;
		console.log("Loaded data");
	}

	static get_names() {
		return this.names;
	}
}

class Entry {

	constructor(index) {

		// Save this object
		const that = this;

		// By default, the entries are invalid
		this.valid = false;

		// Create the row
		this.row = document.createElement("div");
		this.row.setAttribute("class", "row g-3 my-2 align-items-start");

		// Create the SKU div and attach the label
		const sku = document.createElement("div");
		sku.setAttribute("class", "col-md-1 justify-content-center");
		this.labelSku = document.createElement("label");
		this.labelSku.setAttribute("class", "col-md-1 col-form-label");
		this.labelSku.textContent = 'New'
		sku.appendChild(this.labelSku);
		this.row.appendChild(sku);

		// Create the QTY div and attach the label
		const qty = document.createElement("div");
		qty.setAttribute("class", "col-md-1 justify-content-center border-right");
		this.labelQty = document.createElement("label");
		this.labelQty.setAttribute("class", "col-md-1 col-form-label");
		this.labelQty.textContent = "-"
		qty.appendChild(this.labelQty);
		this.row.appendChild(qty);

		// Create the item name div and attached label
		const name = document.createElement("div");
		name.setAttribute("class", "col");
		this.inpName = document.createElement("input");
		this.inpName.setAttribute("class", "form-control");
		this.inpName.setAttribute("name", "name_"+index);
		name.appendChild(this.inpName);
		this.row.appendChild(name);

		// Link functionality to the name input
		this.inpName.onpaste = this.inpName.onkeyup = function() {
			that.onNameModified();
			that.onAnyModified();
		}

		// Create the cost input
		const cost = document.createElement("div");
		cost.setAttribute("class", "col-md-1");
		cost.setAttribute("style", "min-width: 94px;");
		this.inpCost = document.createElement("input");
		this.inpCost.setAttribute("class", "form-control");
		this.inpCost.setAttribute("name", "cost_"+index)
		cost.appendChild(this.inpCost);
		this.row.appendChild(cost);

		// Link functionality to the cost input
		this.inpCost.onpaste = this.inpCost.onkeyup = function() {
			that.onCostModified();
			that.onAnyModified();
		}

		// TODO: This needs to be differentiated from the "qty" variable
		// Create the quantity input
		const quantity = document.createElement("div");
		quantity.setAttribute("class", "col-md-1");
		quantity.setAttribute("style", "min-width: 94px;");
		this.inpQuantity = document.createElement("input");
		this.inpQuantity.setAttribute("class", "form-control");
		this.inpQuantity.setAttribute("name", "quantity_"+index)
		quantity.appendChild(this.inpQuantity);
		this.row.appendChild(quantity);

		// Link functionality to the quantity input
		this.inpQuantity.onkeyup = this.inpQuantity.onpaste = function() {
			that.onQtyModified();
			that.onAnyModified();
		}

		// Create link input
		const link = document.createElement("div");
		link.setAttribute("class", "col-md-2");
		this.inpLink = document.createElement("input");
		this.inpLink.setAttribute("class", "form-control");
		this.inpLink.setAttribute("name", "link_"+index)
		link.appendChild(this.inpLink);
		this.row.appendChild(link);

		// Link functionality to the link input
		this.inpLink.onkeyup = this.inpLink.onpaste = function() {
			that.onLinkModified();
			that.onAnyModified();
		}

		// Create source input
		const source = document.createElement("div");
		source.setAttribute("class", "col-md-2");
		this.inpSource = document.createElement("input");
		this.inpSource.setAttribute("class", "form-control");
		this.inpSource.setAttribute("name", "source_"+index)
		source.appendChild(this.inpSource);
		this.row.appendChild(source);

		// Link any functionality to the source input
		this.inpSource.onkeyup = this.inpSource.onpaste = function() {
			that.onSourceModified();
			that.onAnyModified();
		}

		// Create the checkmark icon
		const validator = document.createElement("div");
		validator.setAttribute("class", "col-auto p-0");
		const buttonValidator = document.createElement("button");
		buttonValidator.setAttribute("class", "btn");
		this.validatorImage = document.createElement("i");
		this.validatorImage.setAttribute("class", "fa fa-times-circle");
		buttonValidator.appendChild(this.validatorImage);
		validator.appendChild(buttonValidator);
		this.row.appendChild(validator);

		// Create the little bar/expand icon
		const expand = document.createElement("div");
		expand.setAttribute("class", "col-auto p-0");
		const labelExpand = document.createElement("button");
		labelExpand.setAttribute("class", "btn");
		const expandImage = document.createElement("i");
		expandImage.setAttribute("class", "fa fa-bars");
		labelExpand.appendChild(expandImage);
		expand.appendChild(labelExpand);
		this.row.appendChild(expand);

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
		this.row.appendChild(remove);

		// Add functionality to delete a row
		btnRemove.onclick = function() {
			this.row.remove();
		};

	}

	/* Loads flask user data into the entries for tracking sku/qty */
	static load_flask_data(flask_skus, flask_quantity) {
		Entry.skus = flask_skus;
		Entry.quantity = flask_quantity;
	}

	onNameModified() {

		// Check if we have a sku for this named item
		let name = this.inpName.value;
		if (typeof Entry.skus[name] !== typeof undefined) {

			// If so, populate that and quantity
			let sku = Entry.skus[name];
			this.labelSku.textContent = sku;
			this.labelQty.textContent = Entry.quantity[sku];

		}
		else {
			this.labelSku.textContent = "New";
			this.labelQty.textContent = "-"
		}
	}
	onCostModified() {}
	onQtyModified() {}

	onLinkModified() {


		// If there's less than 3 characters this is not going to be valid
		if (this.inpLink.value < 3) return

		// Otherwise, try to parse this URL
		try {
			// Try to convert this to a URL object
			let validURL = new URL(this.inpLink.value);
			this.inpSource.value = formatURLSource(validURL.hostname);
		} catch (_) { /* If it's not a valid URL just ignore it */ }
	}

	onSourceModified() {}

	onAnyModified() {


		// Assign the check/cross to indicate validity of entry
		let v = this.validate();
		if (this.valid !== v) {
			this.valid = v;
			if (v) {
				// If we changed to valid display the check-mark
				this.validatorImage.setAttribute("class", "fa fa-check-circle");
			}
			else {
				// Otherwise, display the cross to indicate this isn't a valid row entry
				this.validatorImage.setAttribute("class", "fa fa-times-circle");
			}
		}
	}


	validate() {

		// Validate the name
		const name = this.inpName.value;
		if (name == null) return false;			// Name must be non-null
		else if (name.length < 3) return false; // Name must be greater than 3 characters

		// Validate the cost
		const cost = this.inpCost.value;
		if (cost == null) return false;			// Not null
		else if (cost.length < 1) return false; // Not blank
		else if (isNaN(Number(cost))) return false; 	// Has to be a number

		// Validate the quantity
		const qty = this.inpQuantity.value;
		if (qty == null) return false; 	  	   // Not null
		else if (qty.length < 1) return false; // Not blank
		else if (isNaN(Number(qty))) return false;	   // Has to be a number

		// Validate the link
		const webLink = this.inpLink.value;
		if (webLink == null) return false;		 // Not null
		else if (webLink.length < 1) return false; // Not blank

		// Validate the source
		const source = this.inpSource.value;
		if (source == null) return false;			// Not null
		else if (source.length < 1) return false;	// Not blank

		// If we've passed all checks return true
		return true;

	}

}


// Track all entries generated
const allEntries = [];

const btnAdd = document.querySelector('#btnAdd');
btnAdd.onclick = function() {
	const addArea = document.querySelector('#inputArea');
	const entry = new Entry(allEntries.length);
	allEntries.push(entry);
	addArea.appendChild(entry.row);
};

const btnSubmit = document.querySelector('#btnSubmit');
btnSubmit.onclick = function() {

	// Check to make sure that each entry is filled correctly
	for (let i = 0; i < allEntries.length; i++) {
		if (!allEntries[i].validate()) {
			alert("Inventory missing fields. Fill in all information before submitting.");
			return;
		}
	}

	// Otherwise, Get the form
	const form = document.querySelector('#form');

	// Create a hidden input that will also submit the number of entries total
	let e = document.querySelector("#entries");
	if (e !== null) e.remove();
	let input = document.createElement("input")
	input.setAttribute("type", "hidden");
	input.setAttribute("name", "entries");
	input.value = String(allEntries.length)
	form.appendChild(input);

	// And submit it
	form.submit()


}




// Load variables from flask
function load_from_flask(flask_names, flask_quantity) {
	names = flask_names;
	quantity = flask_quantity;
	console.log("in method" + names[1]);
	console.log("in method" + quantity[1]);

}

btnAdd.onclick();