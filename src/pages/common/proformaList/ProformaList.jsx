import React from "react";
import Layout from "../../../components/Layout/Layout";
import html2pdf from "html2pdf.js";

function ProformaList() {
  const handleDownload = () => {
    const element = document.getElementById("download-pdf");
    const opt = {
      margin: 10,
      filename: "proforma.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a4", // You can try different formats like 'letter', 'legal', etc.
        orientation: "portrait", // 'portrait' or 'landscape'
        fontSize: 10, // Set the font size for the PDF content
      },
    };
    html2pdf().from(element).set(opt).save();
  };
  return (
    <Layout className="">
      <div id="download-pdf" className="">
        <div className="">
          <h1>Proforma</h1>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut autem
            amet totam quae consequuntur aperiam, velit esse fugit blanditiis
            nulla recusandae cumque non, minus error laboriosam eos ipsam? In,
            perspiciatis?
          </p>
        </div>
        <button className="bg-slate-500" onClick={handleDownload}>
          Download PDF
        </button>
      </div>
    </Layout>
  );
}

export default ProformaList;
