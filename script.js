// Sample product database (in a real app, this would be more extensive)
const products = {
    '001': { name: 'Item 1', price: 10.99 },
    '002': { name: 'Item 2', price: 15.99 },
    '003': { name: 'Item 3', price: 7.50 },
    '004': { name: 'Item 4', price: 12.75 },
    '005': { name: 'Item 5', price: 9.99 }
};

// Current transaction items
let currentItems = [];
const taxRate = 0.08; // 8% tax

function addItem() {
    const productId = document.getElementById('product-id').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (!productId || isNaN(quantity) ){
        alert('Please enter a valid product ID and quantity');
        return;
    }
    
    const product = products[productId];
    if (!product) {
        alert('Product not found');
        return;
    }
    
    // Check if item already exists in cart
    const existingItemIndex = currentItems.findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
        // Update quantity if item exists
        currentItems[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        currentItems.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }
    
    updateReceipt();
    document.getElementById('product-id').value = '';
    document.getElementById('product-id').focus();
}

function removeItem(index) {
    currentItems.splice(index, 1);
    updateReceipt();
}

function updateReceipt() {
    const receiptItems = document.getElementById('receipt-items');
    receiptItems.innerHTML = '';
    
    let subtotal = 0;
    
    currentItems.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
        `;
        
        receiptItems.appendChild(row);
    });
    
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function completeSale() {
    if (currentItems.length === 0) {
        alert('No items in the transaction');
        return;
    }
    
    // In a real app, you might save this transaction to a database
    alert(`Sale completed! Total: $${document.getElementById('total').textContent}`);
    
    // Reset for next sale
    currentItems = [];
    updateReceipt();
}

// Focus on product ID field when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('product-id').focus();
});