import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import Table from "../../components/Table";
import { userFields } from "../../constants/formFields";
import { Application, fields } from "../../types";
import { fetchApiData, updateApiData } from "../../redux/features";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import RemoveModal from "../../components/RemoveModal";
import Spinner from "../../components/Spinner";
import { Column } from "react-table";
import { useTranslation } from "react-i18next";
import {
  CloudArrowDownIcon,
  EyeIcon,
  PlusCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Tooltip from "../../components/ToolTip";
import NewApplication from "./new-application";
import { FaFileAlt } from "react-icons/fa";
import ApproveApplication from "./approve-application";
import generatePDF from "../../utils/generatePdf";
import { GiTakeMyMoney } from "react-icons/gi";

import PaymentModal from "./payment";
import generateCard from "../../utils/generateCard";
import GenerateReportsModal from "./generate-reports";
import ViewApplication from "./view-application";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Applications() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  let [apply, setApply] = useState(false);
  let [approve, setApprove] = useState(false);
  let [reject, setReject] = useState(false);
  let [cancel, setCancel] = useState(false);
  let [pay, setPay] = useState(false);
  let [generateReport, setGenerateReport] = useState(false);
  let [view, setView] = useState(false);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const user = JSON.parse(localStorage.getItem("auth") as never);
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);
  let isLoading = false;

  useEffect(() => {
    dispatch(fetchApiData("/christian/application"));
    dispatch(fetchApiData("/users/parishInfo"));
  }, [dispatch]);

  const generateData = () => {
    return data?.application;
  };

  const generateSacramentCard = async (application: Application) => {
    const parishInfo = data?.parishInfo && data?.parishInfo[0];
    isLoading = true;
    await generateCard(
      application!,
      parishInfo?.diocese,
      parishInfo?.parishName,
      parishInfo?.signature
    );
    isLoading = false;
  };

  const generateColumns = () => {
    const columns: Column[] = [
      {
        Header: `${t("First Name")}`,
        accessor: "christian.user.firstName",
      },

      {
        Header: `${t("Last Name")}`,
        accessor: "christian.user.lastName",
      },
      {
        Header: `${t("Phone Number")}`,
        accessor: "christian.user.telephone",
        Cell: ({ row }: any) => (
          <span>{row.original?.christian?.user?.telephone ?? "N/A"}</span>
        ),
      },
      {
        Header: `${t("email")}`,
        accessor: "christian.user.email",
      },
      {
        Header: `${t("Service")}`,
        accessor: "type",
      },
      {
        Header: `${t("Date")}`,
        accessor: "",
        Cell: ({ row }: any) => (
          <span>{new Date(row.original?.createdAt).toLocaleDateString()}</span>
        ),
      },
      {
        Header: `${t("Service Amount")}`,
        accessor: "",
        Cell: ({ row }: any) => (
          <span>{row.original?.sacramentAmount} Rwf</span>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }: any) => {
          const status = row.original?.status;
          switch (status) {
            case "PENDING":
              return <span className="text-yellow-500">{t("Pending")}</span>;
            case "APPROVED":
            case "PAYMENT_COMPLETED":
              return <span className="text-green-500">{t("Approved")}</span>;
            case "REJECTED":
            case "CANCELLED":
              return <span className="text-red-500">{t(status)}</span>;
            case "REQUESTED_PAYMENT":
              return (
                <span className="text-blue-500">{t("Payment Requested")}</span>
              );
          }
        },
      },
    ];

    switch (user?.role) {
      case "CHRISTIAN":
        columns.push({
          Header: `${t("Action")}`,
          accessor: "",
          Cell: ({ row }: any) => {
            const approved =
              row.original?.status === "APPROVED" ||
              row.original?.status === "PAYEMENT_COMPLETED";
            const rejected =
              row.original?.status === "REJECTED" ||
              row.original?.status === "CANCELLED";

            return (
              <div className="flex justify-evenly">
                <div
                  className={"flex ml-6" + (approved ? "" : " hidden")}
                  onClick={() => {
                    setSelectedApplication(row.original?.id);
                    setView(true);
                  }}
                >
                  <Tooltip message={t(`View Application`)}>
                    <EyeIcon className="w-5  text-blue-500 cursor-pointer" />
                  </Tooltip>
                </div>
                <div
                  className="flex ml-6"
                  onClick={() => {
                    !isLoading && generateSacramentCard(row?.original);
                  }}
                >
                  <Tooltip message={t(`Download`)} visible={approved}>
                    <CloudArrowDownIcon
                      className={`w-5 ${
                        approved &&
                        row.original?.type !== "Mass" &&
                        row.original?.type !== "Misa"
                          ? isLoading
                            ? "text-blue-300 cursor-not-allowed"
                            : " text-blue-500 cursor-pointer"
                          : "hidden"
                      }`}
                    />
                  </Tooltip>
                </div>
                <div
                  className="flex ml-6"
                  onClick={() => {
                    setSelectedApplication(row.original);
                    setPay(true);
                  }}
                >
                  <Tooltip message={t(`Complete Payment`)} visible={approved}>
                    <GiTakeMyMoney
                      className={`w-6 h-6 ${
                        row.original?.status === "REQUESTED_PAYMENT"
                          ? " text-blue-500 cursor-pointer"
                          : "hidden"
                      }`}
                    />
                  </Tooltip>
                </div>
                <div
                  className="flex ml-6"
                  onClick={() => {
                    setSelectedApplication(row.original?.id);
                    setCancel(true);
                  }}
                >
                  <Tooltip message={t(`Cancel Request`)} visible={approved}>
                    <XCircleIcon
                      className={`w-6 h-6 ${
                        !approved && !rejected
                          ? " text-red-500 cursor-pointer"
                          : "hidden"
                      }`}
                    />
                  </Tooltip>
                </div>
              </div>
            );
          },
        });
        break;
      case "CLERGY":
        columns.push({
          Header: `${t("Action")}`,
          accessor: "",
          Cell: ({ row }: any) => (
            <div className="flex justify-evenly">
              <div
                className="flex ml-6"
                onClick={() => {
                  setSelectedApplication(row.original);
                  setApprove(true);
                }}
              >
                <Tooltip message={t(`View Application`)}>
                  <EyeIcon className="w-5  text-blue-500 cursor-pointer" />
                </Tooltip>
              </div>
              <div
                className={` ml-6 ${
                  row.original?.status === "PENDING" ? "flex" : "hidden"
                }`}
                onClick={() => {
                  setSelectedApplication(row.original?.id);
                  setReject(true);
                }}
              >
                <Tooltip message={t(`Reject request`)}>
                  <XMarkIcon className="w-5  text-red-500 cursor-pointer" />
                </Tooltip>
              </div>
            </div>
          ),
        });
        break;
    }
    return columns;
  };

  return (
    <div className="mt-28">
      {selectedApplication && (
        <>
          <RemoveModal
            title={t("Reject Service Request")}
            onClose={() => setReject(false)}
            isOpen={reject}
            entity={{
              body: {},
              url: `/christian/application/${selectedApplication}/reject`,
            }}
            onDelete={updateApiData}
            onFetch={fetchApiData("/christian/application")}
          />
          <RemoveModal
            title={t("Cancel Service Request")}
            onClose={() => setCancel(false)}
            isOpen={cancel}
            entity={{
              body: {},
              url: `/christian/application/${selectedApplication}/cancel`,
            }}
            onDelete={updateApiData}
            onFetch={fetchApiData("/christian/application")}
          />
          <ApproveApplication
            isOpen={approve}
            onClose={() => setApprove(false)}
            application={selectedApplication}
          />
          <PaymentModal
            isOpen={pay}
            onClose={() => setPay(false)}
            application={selectedApplication}
          />
          <ViewApplication
            isOpen={view}
            onClose={() => setView(false)}
            application={selectedApplication}
          />
        </>
      )}
      <GenerateReportsModal
        isOpen={generateReport}
        onClose={() => setGenerateReport(false)}
        applications={data?.application}
      />
      <NewApplication
        isOpen={apply}
        onClose={() => setApply(false)}
        applications={data?.application}
      />

      <div className="md:ml-24">
        {/* BREADCRUMB */}
        <div className="md:ml-64 flex mb-4 gap-2">
          <div className="text-primary cursor-pointer">
            <Link to="/dashboard">{t("Home")}</Link>
          </div>
          <span>/</span>
          <div>{t("Applications")}</div>
        </div>

        <div className="md:ml-56 mb-2 flex justify-between mr-20"></div>
        <div className="md:ml-56 mb-2 flex justify-between mr-20">
          {user?.role === "CHRISTIAN" && (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={() => setApply(true)}
                style=" p-2 flex rounded-sm text-white ml-10 border bg-primary text-white hover:border-primary hover:bg-white hover:text-primary shadow-sm 
               duration-300 ease-in-out transition-all"
              >
                <PlusCircleIcon className="mt-[2px] w-6 h-5 mr-1" />
                {t("New Application")}
              </Button>
            </>
          )}
          {user?.role === "CLERGY" && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setGenerateReport(true)}
              style=" p-2 flex ml-auto rounded-sm text-white ml-10 border bg-primary text-white hover:border-primary hover:bg-white hover:text-primary shadow-sm 
             duration-300 ease-in-out transition-all"
            >
              <FaFileAlt className="mt-[2px] w-6 h-5 mr-1" />
              {t("Generate Report")}
            </Button>
          )}
        </div>
        {/* Applications TABLE */}
        <div className="flex flex-col  lg:ml-48">
          {loading ? (
            <Spinner />
          ) : (
            <Table
              data={generateData() ?? []}
              columns={generateColumns()}
              title="Applications"
              placeholder={t(`Find by  name,  email`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
