import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import Table from "../../components/Table";

import { userFields } from "../../constants/formFields";
import { fields } from "../../types";
import {
  deleteApiData,
  fetchApiData,
  updateApiData,
} from "../../redux/features";
import { Link, useNavigate } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/20/solid";

import RemoveModal from "../../components/RemoveModal";
import Spinner from "../../components/Spinner";
import { Column } from "react-table";
import Tooltip from "../../components/ToolTip";
import { useTranslation } from "react-i18next";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Sacraments() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let [isRemoveOpen, setIsRemoveOpen] = useState(false);
  let [approve, setApprove] = useState(false);
  let [reject, setReject] = useState(false);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const [selectedSacrament, setSelectedSacrament] = useState<any>(fieldState);

  const user = JSON.parse(localStorage.getItem("auth") as never);
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  const handleDeleteModal = () => {
    setIsRemoveOpen(!isRemoveOpen);
  };

  const handleEditModal = () => {
    setEdit(!edit);
  };

  const handleApproveModal = () => {
    setApprove(!approve);
  };

  const handleRejectModal = () => {
    setReject(!reject);
  };

  const handleAddModal = () => {
    setAdd(!add);
  };
  useEffect(() => {
    dispatch(fetchApiData("/christian/sacraments"));
  }, [dispatch]);

  const generateData = () => {
    return data?.sacraments;
  };

  const generateColumns = () => {
    const columns: Column[] = [
      {
        Header: `${t("Sacrament Name")}`,
        accessor: "",
        Cell: ({ row }: any) => <span>{t(row.original?.name)}</span>,
      },

      {
        Header: `${t("Description")}`,
        accessor: "description",
        Cell: ({ row }: any) => (
          <span className="text-ellipsis">
            {row.original?.description ?? "N/A"}
          </span>
        ),
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
                className="flex"
                onClick={() => {
                  navigate(`/dashboard/appointments/${row.original.id}`);
                }}
              >
                <Tooltip message="Edit Sacrament">
                  <PencilIcon className="  text-primary cursor-pointer" />
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
      {/* Remove project modal */}
      {selectedSacrament && (
        <RemoveModal
          title="Delete doctor"
          onClose={handleDeleteModal}
          isOpen={isRemoveOpen}
          entity={`/doctors/${selectedSacrament}`}
          onDelete={deleteApiData}
          onFetch={fetchApiData("/doctors")}
        />
      )}
      {/* Remove user modal
      
       {/* APPROVE PROJECT */}
      {selectedSacrament && (
        <RemoveModal
          title="Approve project"
          onClose={handleApproveModal}
          isOpen={approve}
          entity={{
            url: `/correspondent/project/${selectedSacrament.id}/approve`,
            body: { status: "Approved" },
          }}
          onDelete={updateApiData}
          onFetch={fetchApiData("/correspondent/project")}
        />
      )}

      {/* REJECT PROJECT */}
      {selectedSacrament && (
        <RemoveModal
          title="Reject project"
          onClose={handleRejectModal}
          isOpen={reject}
          entity={{
            url: `/correspondent/project/${selectedSacrament.id}/reject`,
            body: { status: "rejected" },
          }}
          onDelete={updateApiData}
          onFetch={fetchApiData("/correspondent/project")}
        />
      )}

      <div className="md:ml-24">
        {/* BREADCRUMB */}
        <div className="md:ml-64 flex mb-5 gap-2">
          <div className="text-primary cursor-pointer">
            <Link to="/dashboard">{t("Home")}</Link>
          </div>
          <span>/</span>
          <div>{t("Sacraments")}</div>
        </div>

        <div className="md:ml-[17rem] -mb-10 flex "></div>

        {/* SACRAMENTS TABLE */}
        <div className="flex flex-col lg:ml-52 mt-8">
          {loading ? (
            <Spinner />
          ) : (
            <Table
              data={generateData() ?? []}
              columns={generateColumns()}
              title="Sacraments"
              placeholder={t("Find by  name")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
