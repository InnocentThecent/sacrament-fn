import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal";
import { Application, IProps } from "../../types";
import generatePDF from "../../utils/generatePdf";
import { useState } from "react";

export default function ViewApplication({
  isOpen,
  onClose,
  application,
}: IProps & {
  application: Application;
}) {
  const [status, setStatus] = useState("pending");

  //   const handleSubmit = () => {
  //     generatePDF({
  //       columns: [
  //         "First Name",
  //         "Last Name",
  //         "Phone Number",
  //         // "email",
  //         "Service",
  //         "Date",
  //         "Status",
  //         "Offering Amount",
  //         "Mass Date",
  //       ],
  //       title: "Service Request Applications",
  //       data: filteredApplication?.map((app: Application) => [
  //         app?.christian?.user?.firstName,
  //         app?.christian?.user?.lastName,
  //         app?.christian?.user?.telephone,
  //         // app?.christian?.user?.email,
  //         app?.type,
  //         new Date(app?.createdAt).toLocaleDateString(),
  //         app?.status?.split("_").join(" "),
  //         app?.sacramentAmount ?? "N/A",
  //         app?.burialDate ? new Date(app?.createdAt).toLocaleDateString() : "N/A",
  //       ]),
  //     });
  //   };
  const { t } = useTranslation();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t("View Application ")}
        styles=" max-w-3xl"
      >
        application contents
      </Modal>
    </>
  );
}
