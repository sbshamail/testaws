import React from "react";
import jsPDF from "jspdf";
const PrintPage = () => {
  let generatePDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Get the current page content as a string (you can customize this to fit your content)
    const pageContent = document.getElementById("content-to-print").innerHTML;

    // Add the page content to the PDF
    doc.text(10, 10, pageContent);

    // Save or display the PDF (you can customize this part)
    doc.save("current_page.pdf");
  };
  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PrintPage;
