<div align="center">
  <img src="assets/image/Logo/logowebo.png" alt="Webcomms Global Logo" width="200"/>
  <h1>📄 Webcomms Global Invoice Generator</h1>
  <p><strong>A professional, real-time invoice generation and PDF export tool built for Webcomms Global (Pvt) Ltd.</strong></p>
</div>

<br/>

## ✨ Features

- **⚡ Real-Time Preview:** See exactly what your invoice looks like as you type—no refreshing needed!
- **➕ Dynamic Line Items:** Easily add rows with Ref No, Description, Quantity, and Unit Price.
- **🧮 Auto-Calculations:** Instantly computes the total amount in LKR as you adjust quantities or prices.
- **📄 High-Quality PDF Export:** One-click generation of beautifully formatted, print-ready A4 PDFs using `html2pdf.js`.
- **🎨 Brand Identical:** Custom-tailored to represent the Webcomms Global brand identity, complete with the official logo, brand colors, and company details.
- **📱 Responsive UI:** Built with an intuitive sidebar for input and a large, scrollable A4 canvas area for preview.

## 🛠️ Technology Stack

- **HTML5:** Semantic structure for robust layouts.
- **Tailwind CSS (via CDN):** Rapid, utility-first styling tailored with custom config for Webcomms Global brand colors (`#e36121`).
- **Vanilla JavaScript:** DOM manipulation, dynamic row insertion, and real-time total updates.
- **html2pdf.js:** Client-side library to convert the HTML invoice preview seamlessly into a downloadable PDF.

## 📂 Project Structure

```text
invoice_generator/
├── index.html            # Main application layout and interface
├── README.md             # Project documentation
└── assets/
    ├── css/
    │   └── styles.css    # Custom styles overriding or complementing Tailwind
    ├── js/
    │   └── script.js     # Logic for row adding, calculation, and PDF export
    └── image/
        └── Logo/         # Contains the Webcomms Global brand assets
```

## 🚀 How to Use

1. **Open the App:** Simply open `index.html` in any modern web browser.
2. **Fill in Details:** Use the left sidebar to enter the Invoice Number, Issued Date, and Client Details.
3. **Add Items:** Click `+ Add Item` to insert billing rows. Fill out the description, quantity, and unit price. The total calculates automatically.
4. **Generate PDF:** Review the A4 preview on the right. Once satisfied, click the **Download PDF** button at the bottom of the sidebar to save your invoice locally.

## 🏦 Pre-Configured Details

This generator is pre-configured with Webcomms Global's business parameters to save time:
- **Company Address:** No: D 263/2, Magammana, Dehiovita.
- **Bank Information:** Bank of Ceylon (BOC), Karawanella Branch
- **Registration No:** PV 127819
- **Contact Setup:** Pre-filled phone numbers, email, and website link on the invoice footer.

---

<div align="center">
  <i>Built with ❤️ for Webcomms Global</i>
</div>