import html2pdf from "html2pdf.js";

const DownloadPDF = (htmlData, filename) => {
    const cleanedHtml = htmlData.replace(/<\/?html>/gi, "");
    html2pdf()
        .from(cleanedHtml)
        .set({
            filename: filename + ".pdf",
            html2canvas: {
                scale: 4,
            },
            jsPDF: {
                unit: "mm",
                format: "a4",

                orientation: "landscape",
            },
        })
        .toPdf()
        .get("pdf")
        .then((pdf) => {
            pdf.save(filename + ".pdf");
        });
};
export default DownloadPDF;
