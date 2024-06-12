import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoImage from "../assets/logo.png";

interface Props<T> {
  title: string;
  columns: string[];
  data: T[];
}

export default function generatePDF<T>({ title, columns, data }: Props<T>) {
  const unit = "pt";
  const size = "A4";
  const orientation = "portrait";
  const doc = new jsPDF(orientation, unit, size);

  doc.text(title, 60, 60);

  // Add the image to the document
  const imgWidth = 100;
  const imgHeight = 50;
  const xPos = 450;
  const yPos = 30;

  doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

  autoTable(doc, {
    head: [columns],
    body: [...(data as never)],
    startY: 100,
  });

  doc.save(`${title.toLocaleLowerCase()}_report.pdf`);
}
