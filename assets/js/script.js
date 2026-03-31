document.addEventListener('DOMContentLoaded', () => {
    // ==== Element Selection ====
    
    // Form Inputs
    const invoiceNumInput = document.getElementById('invoiceNumInput');
    const invoiceDateInput = document.getElementById('invoiceDateInput');
    const clientNameInput = document.getElementById('clientNameInput');
    const clientAddressInput = document.getElementById('clientAddressInput');
    
    // Preview Elements
    const previewInvoiceNum = document.getElementById('previewInvoiceNum');
    const previewInvoiceDate = document.getElementById('previewInvoiceDate');
    const previewClientName = document.getElementById('previewClientName');
    const previewClientAddress = document.getElementById('previewClientAddress');
    const previewTotal = document.getElementById('previewTotal');
    const sidebarTotal = document.getElementById('sidebarTotal');
    const previewTableBody = document.getElementById('previewTableBody');
    
    // Container & Buttons
    const itemsContainer = document.getElementById('itemsContainer');
    const addRowBtn = document.getElementById('addRowBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    
    // State to hold items
    let lineItems = [
        { id: Date.now(), description: 'Web Development Services', qty: 1, cost: 150000.00 },
        { id: Date.now() + 1, description: 'Domain Registration (1 Yr)', qty: 1, cost: 5000.00 }
    ];

    // ==== Initialization ====
    
    // Pre-fill date to today
    const today = new Date().toISOString().split('T')[0];
    invoiceDateInput.value = today;
    updateDatePreview();
    
    renderSidebarItems();
    renderPreviewItems();

    // ==== Event Listeners ====
    
    // Input syncing
    invoiceNumInput.addEventListener('input', (e) => {
        previewInvoiceNum.textContent = e.target.value.trim() || 'INV-000';
    });
    
    invoiceDateInput.addEventListener('input', updateDatePreview);
    
    clientNameInput.addEventListener('input', (e) => {
        previewClientName.textContent = e.target.value.trim() || 'Client Name';
    });
    
    clientAddressInput.addEventListener('input', (e) => {
        previewClientAddress.textContent = e.target.value.trim() || 'Client Address';
    });

    // Add Row Button
    addRowBtn.addEventListener('click', () => {
        lineItems.push({ id: Date.now(), description: '', qty: 1, cost: 0.00 });
        renderSidebarItems();
        renderPreviewItems();
    });

    // Download PDF Button
    downloadPdfBtn.addEventListener('click', () => {
        const element = document.getElementById('invoicePreview');
        const filename = `${invoiceNumInput.value.trim() || 'Invoice'}_Webcomms.pdf`;
        
        // Remove scale transform before print
        element.style.transform = 'scale(1)';
        
        const opt = {
            margin:       [0, 0, 0, 0], // Margin handled by CSS padding inside invoice-paper
            filename:     filename,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Output and then restore scale
        html2pdf().set(opt).from(element).save().then(() => {
            element.style.transform = ''; // Let CSS reapply original layout scale
        });
    });

    // ==== Helper Functions ====
    
    function updateDatePreview() {
        if(invoiceDateInput.value) {
            const dateObj = new Date(invoiceDateInput.value);
            // Format as DD/MM/YYYY
            const formatted = dateObj.toLocaleDateString('en-GB');
            previewInvoiceDate.textContent = formatted;
        } else {
            previewInvoiceDate.textContent = 'DD/MM/YYYY';
        }
    }

    function formatCurrency(amount) {
        return parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function updateItem(id, field, value) {
        const item = lineItems.find(i => i.id === id);
        if(item) {
            if(field === 'cost') {
                item[field] = parseFloat(value) || 0;
            } else {
                item[field] = value;
            }
            renderPreviewItems();
        }
    }

    function removeItem(id) {
        lineItems = lineItems.filter(i => i.id !== id);
        renderSidebarItems();
        renderPreviewItems();
    }

    function calculateTotal() {
        return lineItems.reduce((sum, item) => sum + ((parseFloat(item.cost) || 0) * (parseFloat(item.qty) || 0)), 0);
    }

    // Render left pane fields
    function renderSidebarItems() {
        itemsContainer.innerHTML = '';
        
        lineItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-3 relative group';
            
            // Delete abstract button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = 'Remove item';
            deleteBtn.onclick = () => removeItem(item.id);

            // Description input
            const descContainer = document.createElement('div');
            const descLabel = document.createElement('label');
            descLabel.className = 'block text-xs font-semibold mb-1 text-gray-500';
            descLabel.textContent = `Desc ${index + 1}`;
            
            const descInput = document.createElement('input');
            descInput.type = 'text';
            descInput.className = 'w-full text-sm border border-gray-300 rounded p-1.5 focus:ring-1 focus:ring-blue-500 outline-none';
            descInput.value = item.description;
            descInput.placeholder = 'Item description';
            descInput.addEventListener('input', (e) => updateItem(item.id, 'description', e.target.value));

            descContainer.appendChild(descLabel);
            descContainer.appendChild(descInput);

            // Qty and Cost grouping
            const qtyCostRow = document.createElement('div');
            qtyCostRow.className = 'flex gap-3';

            // Qty input
            const qtyContainer = document.createElement('div');
            qtyContainer.className = 'w-1/3';
            const qtyLabel = document.createElement('label');
            qtyLabel.className = 'block text-xs font-semibold mb-1 text-gray-500';
            qtyLabel.textContent = 'Qty';
            
            const qtyInput = document.createElement('input');
            qtyInput.type = 'number';
            qtyInput.min = '1';
            qtyInput.className = 'w-full text-sm border border-gray-300 rounded p-1.5 focus:ring-1 focus:ring-blue-500 outline-none';
            qtyInput.value = item.qty;
            qtyInput.addEventListener('input', (e) => updateItem(item.id, 'qty', e.target.value));

            qtyContainer.appendChild(qtyLabel);
            qtyContainer.appendChild(qtyInput);

            // Cost input
            const costContainer = document.createElement('div');
            costContainer.className = 'w-2/3';
            const costLabel = document.createElement('label');
            costLabel.className = 'block text-xs font-semibold mb-1 text-gray-500';
            costLabel.textContent = 'Unit Price (LKR)';
            
            const costInput = document.createElement('input');
            costInput.type = 'number';
            costInput.step = '0.01';
            costInput.min = '0';
            costInput.className = 'w-full text-sm border border-gray-300 rounded p-1.5 focus:ring-1 focus:ring-blue-500 outline-none';
            costInput.value = item.cost;
            costInput.addEventListener('input', (e) => updateItem(item.id, 'cost', e.target.value));

            costContainer.appendChild(costLabel);
            costContainer.appendChild(costInput);

            qtyCostRow.appendChild(qtyContainer);
            qtyCostRow.appendChild(costContainer);

            itemDiv.appendChild(deleteBtn);
            itemDiv.appendChild(descContainer);
            itemDiv.appendChild(qtyCostRow);
            
            itemsContainer.appendChild(itemDiv);
        });
    }

    // Render right pane table
    function renderPreviewItems() {
        previewTableBody.innerHTML = '';
        
        lineItems.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors duration-150';
            
            const tdRef = document.createElement('td');
            tdRef.className = 'py-3 px-4 font-medium text-sm text-center text-gray-500';
            tdRef.textContent = (index + 1).toString().padStart(2, '0');
            
            const tdDesc = document.createElement('td');
            tdDesc.className = 'py-3 px-4 text-sm text-gray-800';
            tdDesc.textContent = item.description || '-';

            const tdQty = document.createElement('td');
            tdQty.className = 'py-3 px-4 text-sm text-center font-medium text-gray-800';
            tdQty.textContent = parseFloat(item.qty) || 0;
            
            const tdCost = document.createElement('td');
            tdCost.className = 'py-3 px-4 text-sm text-right font-medium text-gray-800';
            tdCost.textContent = formatCurrency(item.cost);

            const tdAmount = document.createElement('td');
            tdAmount.className = 'py-3 px-4 text-sm text-right font-medium text-gray-800';
            tdAmount.textContent = formatCurrency((parseFloat(item.cost) || 0) * (parseFloat(item.qty) || 0));
            
            tr.appendChild(tdRef);
            tr.appendChild(tdDesc);
            tr.appendChild(tdQty);
            tr.appendChild(tdCost);
            tr.appendChild(tdAmount);
            
            previewTableBody.appendChild(tr);
        });

        // Update Totals
        const total = calculateTotal();
        const formattedTotal = formatCurrency(total);
        previewTotal.textContent = `LKR ${formattedTotal}`;
        sidebarTotal.textContent = formattedTotal;
    }
});
