import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import Table from "../../components/Table";
import { userFields } from "../../constants/formFields";
import { Application, fields } from "../../types";
import { fetchApiData } from "../../redux/features";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { Column } from "react-table";
import { useTranslation } from "react-i18next";
import { CalculatorIcon } from "@heroicons/react/20/solid";

import CalculateOfferings from "./calculate-offerings";
import { BiDonateHeart } from "react-icons/bi";
import PayOfferings from "./pay-offerings";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function Offerings() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  let [calculate, setCalculate] = useState(false);
  let [giveOffering, setGiveOffering] = useState(false);

  const user = JSON.parse(localStorage.getItem("auth") as never);
  const { loading } = useAppSelector((state) => state.api);
  const data = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData("/users/parishInfo"));
    dispatch(fetchApiData("/users/offerings"));
  }, [dispatch]);

  const generateData = () => {
    return data?.offerings;
  };

  const generateColumns = () => {
    const columns: Column[] = [
      {
        Header: `${t("Date")}`,
        accessor: "",
        Cell: ({ row }: any) => (
          <span>{new Date(row.original?.createdAt).toLocaleDateString()}</span>
        ),
      },
      {
        Header: `${t("Offering Amount")}`,
        accessor: "",
        Cell: ({ row }: any) => <span>{row.original?.amount} Rwf</span>,
      },
      {
        Header: `${t("Status")}`,
        Cell: ({ row }: any) => (
          <span
            className={`${
              row.original?.status === "PENDING"
                ? "text-yellow-500"
                : row.original?.status === "APPROVED"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {row.original?.status}
          </span>
        ),
      },
    ];

    return columns;
  };

  return (
    <div className="mt-28">
      <CalculateOfferings
        isOpen={calculate}
        onClose={() => setCalculate(false)}
      />
      <PayOfferings
        isOpen={giveOffering}
        onClose={() => setGiveOffering(false)}
      />

      <div className="md:ml-24">
        {/* BREADCRUMB */}
        <div className="md:ml-64 flex mb-4 gap-2">
          <div className="text-primary cursor-pointer">
            <Link to="/dashboard">{t("Home")}</Link>
          </div>
          <span>/</span>
          <div>{t("Offerings")}</div>
        </div>

        <div className="md:ml-56 mb-2 flex justify-start mr-20">
          {user?.role === "CHRISTIAN" && (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={() => setCalculate(true)}
                style=" p-2 flex rounded-sm text-white ml-10 border bg-primary text-white hover:border-primary hover:bg-white hover:text-primary shadow-sm 
               duration-300 ease-in-out transition-all"
              >
                <CalculatorIcon className="mt-[2px] w-6 h-5 mr-1" />
                {t("Calculate Offerings")}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setGiveOffering(true)}
                style=" p-2 flex  text-white ml-10 border bg-white text-primary border-primary hover:border-primary hover:bg-white hover:text-primary shadow-sm 
               duration-300 ease-in-out transition-all"
              >
                <BiDonateHeart className="mt-[2px] w-6 h-5 mr-1" />
                {t("Give Offerings")}
              </Button>
            </>
          )}
        </div>
        {/* Offerings TABLE */}
        <div className="flex flex-col  lg:ml-48">
          {loading ? (
            <Spinner />
          ) : (
            <Table
              data={generateData() ?? []}
              columns={generateColumns()}
              title="Offerings"
              placeholder={t(`Find by  date`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
