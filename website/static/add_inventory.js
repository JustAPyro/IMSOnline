function formatURLSource(source) {
    const text = source.replace("www.", "")
        .replace(".com", "");

    return text.charAt(0).toUpperCase() + text.slice(1);
}

class Entry {
	
	constructor() {
		
		// Save this object
		var that = this;
		
		// By default the entries are invalid
		this.valid = false;
		
		// Create the row
		this.row = document.createElement("div");
		this.row.setAttribute("class", "row g-3 my-2 align-items-start");

		// Create the SKU div and attach the label
		const sku = document.createElement("div");
		sku.setAttribute("class", "col-md-1 justify-content-center");
		const labelSku = document.createElement("label");
		labelSku.setAttribute("class", "col-md-1 col-form-label");
		labelSku.textContent = "New"
		sku.appendChild(labelSku);
		this.row.appendChild(sku);

		// Create the QTY div and attach the label
		const qty = document.createElement("div");
		qty.setAttribute("class", "col-md-1 justify-content-center border-right");
		const labelQty = document.createElement("label");
		labelQty.setAttribute("class", "col-md-1 col-form-label");
		labelQty.textContent = "-"
		qty.appendChild(labelQty);
		this.row.appendChild(qty);

		// Create the item name div and attached label
		const name = document.createElement("div");
		name.setAttribute("class", "col");
		this.inpName = document.createElement("input");
		this.inpName.setAttribute("class", "form-control");
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
			row.remove();
		};
		
	}
	
	onNameModified() {}
	onCostModified() {}
	onQtyModified() {}

	onLinkModified() {
		
		
		// If there's less than 3 characters this is not going to be valid
		if (this.inpLink.value < 3) return
		
		// Otherwise try to parse this URL
		try {
			// Try to convert this to a URL object
			let validURL = new URL(this.inpLink.value);
			inpSource.value = formatURLSource(validURL.hostname);
		} catch (_) { /* If it's not a valid URL just ignore it */ }
	}
	
	onSourceModified() {}
	
	onAnyModified() { 
		let v = this.validate();
		if (this.valid != v) {
			this.valid = v;
			if (v) {
				// If we changed to valid display the check-mark
				this.validatorImage.setAttribute("class", "fa fa-check-circle");
			}
			else {
				// Otherwise display the cross to indicate this isn't a valid row entry
				this.validatorImage.setAttribute("class", "fa fa-times-circle");
			}
		}
	}
	
	
	validate() {
		
		// Validate the name
		var name = this.inpName.value;
		if (name == null) return false;			// Name must be non-null
		else if (name.length < 3) return false; // Name must be greater then 3 characters
		
		// Validate the cost
		var cost = this.inpCost.value;
		if (cost == null) return false;			// Not null
		else if (cost.length < 1) return false; // Not blank
		else if (isNaN(cost)) return false; 	// Has to be a number
		
		// Validate the quantity
		var qty = this.inpQuantity.value;
		if (qty == null) return false; 	  	   // Not null
		else if (qty.length < 1) return false; // Not blank
		else if (isNaN(qty)) return false;	   // Has to be a number
		
		// Validate the link
		var linke = this.inpLink.value;
		if (linke == null) return false;		 // Not null
		else if (linke.length < 1) return false; // Not blank
		
		// Validate the source
		var source = this.inpSource.value;
		if (source == null) return false;			// Not null
		else if (source.length < 1) return false;	// Not blank
		
		// If we've passed all checks return true
		return true;
		
	}
	
}



const btnAdd = document.querySelector('#btnAdd');
btnAdd.onclick = function() {
	const addArea = document.querySelector('#inputArea');
	const entry = new Entry();
	addArea.appendChild(entry.row);
};
