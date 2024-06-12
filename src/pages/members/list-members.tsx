import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { FaFileAlt } from "react-icons/fa";
import Table from "../../components/Table";
import { User } from "../../types";
import { deleteApiData, fetchApiData } from "../../redux/features";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import RemoveModal from "../../components/RemoveModal";
import Spinner from "../../components/Spinner";
import { Column } from "react-table";
import { useTranslation } from "react-i18next";
import { EyeIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import Tooltip from "../../components/ToolTip";
import AddMember from "./add-new-member";
import generatePDF from "../../utils/generatePdf";
import AddNewMemberSacrament from "./add-member-sacrament";
import ViewMember from "./view-member";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Members() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  let [remove, setRemove] = useState(false);

  const [add, setAdd] = useState(false);
  const [addSacrament, setAddSacrament] = useState(false);
  const [view, setView] = useState(false);

  const [selectedMember, setSelectedMember] = useState<User | null>();

  const user = JSON.parse(localStorage.getItem("auth") as never);
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleDeleteModal = () => {
    setRemove(!remove);
  };

  useEffect(() => {
    dispatch(fetchApiData("/users"));
  }, [dispatch]);

  const generateData = () => {
    return data?.users;
  };

  const generateReport = () => {
    generatePDF({
      columns: [
        "First Name",
        "Last Name",
        "Father Name",
        "Mother Name",
        "Phone Number",
        "Email",
        "Unique Code",
        "Applications",
      ],
      title: "Parishioners",
      data: data?.users?.map((user: User) => [
        user.firstName,
        user.lastName,
        user?.christian?.fatherName,
        user?.christian?.motherName,
        user.telephone,
        user.email,
        user?.christian?.uniqueCode,
        user?.christian?.sacramentApplication?.length,
      ]),
    });
  };

  const generateColumns = () => {
    const columns: Column[] = [
      {
        Header: `${t("First Name")}`,
        accessor: "firstName",
      },

      {
        Header: `${t("Last Name")}`,
        accessor: "lastName",
      },
      {
        Header: `${t("Phone Number")}`,
        accessor: "telephone",
        Cell: ({ row }: any) => <span>{row.original?.telephone ?? "N/A"}</span>,
      },
      {
        Header: `${t("email")}`,
        accessor: "email",
      },
      {
        Header: `${t("Unique Code")}`,
        accessor: "christian.uniqueCode",
      },
      {
        Header: `${t("Offerings")}`,
        accessor: "",
        Cell: ({ row }: any) => {
          const user = row.original as User;
          return (
            <span>{user?.christian?.offerings?.reduce((a, b) => a + b.amount, 0)
            } Rwf</span>
          );
        }
      },
      {
        Header: `${t("Applications")}`,
        accessor: "",
        Cell: ({ row }: any) => {
          const user = row.original as User;
          return (
            <span>{user?.christian?.sacramentApplication?.length ?? 0}</span>
          );
        },
      },
    ];
    switch (user?.role) {
      case "CLERGY":
        columns.push({
          Header: `${t("Action")}`,
          accessor: "",
          Cell: ({ row }: any) => (
            <div className="flex justify-evenly">
              <div
                className="flex ml-6"
                onClick={() => {
                  setSelectedMember(row.original);
                  setView(true);
                }}
              >
                <Tooltip message={t(`View Christian's Sacraments`)}>
                  <EyeIcon className="w-5  text-blue-500 cursor-pointer" />
                </Tooltip>
              </div>
              <div
                className="flex ml-6"
                onClick={() => {
                  setSelectedMember(row.original);
                  row.original?.christian?.christianSacraments?.length < 4 &&
                    setAddSacrament(true);
                }}
              >
                <Tooltip message={t(`Add Sacrament`)}>
                  <PlusIcon
                    className={`w-5  ${
                      row.original?.christian?.christianSacraments?.length < 4
                        ? "text-blue-500 cursor-pointer"
                        : " text-blue-300 cursor-not-allowed"
                    } `}
                  />
                </Tooltip>
              </div>
              <div
                className="flex ml-6"
                onClick={() => {
                  setSelectedMember(row.original);
                  setRemove(true);
                }}
              >
                <Tooltip message={t(`Delete Parishioner`)}>
                  <XMarkIcon
                    className={`w-5  ${"text-red-500 cursor-pointer"} `}
                  />
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
      <AddMember d={add} onClose={() => setAdd(false)} />

      {selectedMember && (
        <>
          <RemoveModal
            title={t("Delete parishioner")}
            onClose={handleDeleteModal}
            isOpen={remove}
            entity={`/christian/${selectedMember?.id}`}
            onDelete={deleteApiData}
            onFetch={fetchApiData("/users")}
          />
          <AddNewMemberSacrament
            isOpen={addSacrament}
            onClose={() => setAddSacrament(false)}
            member={selectedMember}
          />
          <ViewMember
            isOpen={view}
            onClose={() => setView(false)}
            user={selectedMember}
          />
        </>
      )}

      <div className="md:ml-24">
        {/* BREADCRUMB */}
        <div className="md:ml-64 flex mb-5 gap-2">
          <div className="text-primary cursor-pointer">
            <Link to="/dashboard">{t("Home")}</Link>
          </div>
          <span>/</span>
          <div>{t("Parishioners")}</div>
        </div>

        <div className="md:ml-56 mb-2 flex justify-between mr-20">
          {user?.role === "CLERGY" && (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={() => setAdd(true)}
                style=" p-2 flex rounded-sm text-white ml-10 border bg-primary text-white hover:border-primary hover:bg-white hover:text-primary shadow-sm 
               duration-300 ease-in-out transition-all"
              >
                <PlusCircleIcon className="mt-[2px] w-6 h-5 mr-1" />
                {t("Add New Parishioner")}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={generateReport}
                style=" p-2 flex rounded-sm text-white border bg-primary text-white hover:border-primary hover:bg-white hover:text-primary shadow-sm 
             duration-300 ease-in-out transition-all"
              >
                <FaFileAlt className="mt-[2px] w-6 h-5 mr-1" />
                {t("Generate Report")}
              </Button>
            </>
          )}
        </div>

        {/* Members TABLE */}
        <div className="flex flex-col  lg:ml-48">
          {loading ? (
            <Spinner />
          ) : (
            <Table
              data={generateData() ?? []}
              columns={generateColumns()}
              title={t("Parishioners")}
              placeholder={t(`Find by  name,  email`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
