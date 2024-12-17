import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal";
import { Application, IProps } from "../../types";
import generatePDF from "../../utils/generatePdf";
import { useState } from "react";

export default function GenerateReportsModal({
  isOpen,
  onClose,
  applications,
}: IProps & {
  applications: Application[];
}) {
  const [status, setStatus] = useState("pending");

  const handleSubmit = () => {
    const filteredApplication = applications?.filter(
      (app) => app.status === status
    );

    generatePDF({
      columns: [
        "First Name",
        "Last Name",
        "Phone Number",
        // "email",
        "Service",
        "Date",
        "Status",
        "Offering Amount",
        "Mass Date",
      ],
      title: "Service Request Applications",
      data: filteredApplication?.map((app: Application) => [
        app?.christian?.user?.firstName,
        app?.christian?.user?.lastName,
        app?.christian?.user?.telephone,
        // app?.christian?.user?.email,
        app?.type,
        new Date(app?.createdAt).toLocaleDateString(),
        app?.status?.split("_").join(" "),
        app?.sacramentAmount ?? "N/A",
        app?.burialDate ? new Date(app?.createdAt).toLocaleDateString() : "N/A",
      ]),
    });
  };
  const { t } = useTranslation();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title={t("Generate report")}
        styles=" max-w-3xl"
      >
        <label htmlFor="">Choose Application Status</label> <br />
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="ml-auto bg-white border px-2 h-9 rounded-md text-xs md:text-sm text-gray-600 dark:text-dark-text-fill dark:bg-dark-bg outline-none"
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="REQUESTED_PAYMENT">Requested Payment</option>
          <option value="PAYMENT_COMPLETED">Payment Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </Modal>
    </>
  );
}
