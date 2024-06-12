import jsPDF from "jspdf";
import { Application } from "../types";
import logoImage from "../assets/logo.png";
import axios from "axios";

export default async function generateCard(
  application: Application,
  parishName: string,
  diocese: string,
  signature?: string
) {
  const unit = "pt";
  const size = "A5";
  const orientation = "portrait";
  const doc = new jsPDF(orientation, unit, size);
  doc.setFillColor(255, 255, 255); //  light gray
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  );
  // doc.setTextColor(88, 125, 255);
  doc.setFont("helvetica", "bold");

  doc.text("Sacrament Card", 150, 70);
  doc.setFont("helvetica", "normal");

  doc.setTextColor(0, 0, 0);

  const imgWidth = 100;
  const imgHeight = 50;
  const xPos = 157;
  const yPos = 0;

  const christian = application?.christian;

  const user = christian?.user;
  const dots =
    ".......................................................................";

  doc.addImage(logoImage, "PNG", xPos, yPos, imgWidth, imgHeight);

  doc.setFontSize(12);

  doc.text("DIOCESE:", 40, 110);
  doc.text(diocese, 160, 110);
  doc.text(dots, 160, 112);

  doc.text("Paroisse de:", 40, 130);
  doc.text(parishName, 160, 130);
  doc.text(dots, 160, 132);

  doc.text("Prénom:", 40, 150);
  doc.text(user?.firstName ?? "N/A", 160, 150);
  doc.text(dots, 160, 152);

  doc.text("Nomen:", 40, 170);
  doc.text(user?.lastName ?? "N/A", 160, 170);
  doc.text(dots, 160, 172);

  doc.text("N. Patris:", 40, 190);
  doc.text(christian?.fatherName ?? "N/A", 160, 190);
  doc.text(dots, 160, 192);

  doc.text("N. Matris:", 40, 210);
  doc.text(christian?.motherName ?? "N/A", 160, 210);
  doc.text(dots, 160, 212);

  doc.text("Par Vel Matr", 40, 230);
  doc.text(christian?.godParent ?? "Not Baptized", 160, 230);
  doc.text(dots, 160, 232);

  doc.text("Domicilium vico", 40, 250);
  doc.text(christian?.homeAddress ?? "No Residence Info", 160, 250);
  doc.text(dots, 160, 252);

  doc.text("Prov", 40, 270);
  doc.text(christian?.province ?? "N/A", 160, 270);
  doc.text(dots.slice(0, dots.length / 3), 160, 272);

  doc.text("District", 250, 270);
  doc.text(christian?.district ?? "N/A", 290, 270);
  doc.text(dots.slice(0, dots.length / 3) + "........", 290, 272);

  doc.text("Nat. die", 40, 290);
  doc.text(
    christian?.dob ? new Date(christian.dob).toLocaleDateString() : "N/A",
    160,
    290
  );
  doc.text(dots, 160, 292);

  doc.text("Bapt. die", 40, 310);
  doc.text(
    christian?.baptismDate
      ? new Date(christian.baptismDate).toLocaleDateString()
      : "N/A",
    160,
    310
  );
  doc.text(dots, 160, 312);

  // doc.text("Nus", 40, 350);
  // doc.text(data.baptismNumber, 50, 350);

  doc.text("Confir. de", 40, 330);
  doc.text(
    christian?.confirmationDate
      ? new Date(christian.confirmationDate).toLocaleDateString()
      : "N/A",
    160,
    330
  );
  doc.text(dots, 160, 332);

  // doc.text("Nus", 40, 370);
  // doc.text(data.confirmationNumber, 50, 370);

  doc.text("Eucharist. recep.", 40, 350);
  doc.text(
    christian?.euchristDate
      ? new Date(christian.euchristDate).toLocaleDateString()
      : "N/A",
    160,
    350
  );
  doc.text(dots, 160, 352);

  doc.text("Sign:", 40, 410);
  await addCloudinaryImageToPDF(signature!);
  async function addCloudinaryImageToPDF(imageURL: string) {
    try {
      const img = await axios.get(imageURL, { responseType: "blob" });
      const imageDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read image data.'));
          }
        };
        reader.readAsDataURL(img.data);
      });
  
      // Add image to the PDF and save it
      doc.addImage(imageDataUrl, "PNG", 70, 380, imgWidth, imgHeight);
      doc.save(
        `${application?.christian?.user?.firstName ??
          application?.christian?.user?.email}_report.pdf`
      );
    } catch (error) {
      console.error("Error adding image to PDF:", error);
    }
  }
  
}
