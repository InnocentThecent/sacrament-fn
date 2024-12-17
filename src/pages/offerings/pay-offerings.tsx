import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { Application, IProps } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { createApiData, fetchApiData } from "../../redux/features";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../../components/Input";

const PayOfferings = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [telephone, setTelephone] = useState("");
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!telephone || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    if (amount < 100) {
      toast.error("Amount should be greater than 100");
      return;
    }
    if (telephone.length !== 10) {
      toast.error("Telephone should be 10 characters");
      return;
    }

    if (
      String(telephone).slice(0, 3) !== "078" &&
      String(telephone).slice(0, 3) !== "072" &&
      String(telephone).slice(0, 3) !== "073" &&
      String(telephone).slice(0, 3) !== "079"
    ) {
      toast.error("Telephone should start with 078, 072, 073 or 079");
      return;
    }

    if (year < 1900 || year > new Date().getFullYear()) {
      toast.error("Year should be between 1900 and current year");
      return;
    }
    try {
      await dispatch(
        createApiData({
          url: `/christian/give-offering`,
          body: {
            telephone,
            amount,
            year,
          },
        })
      ).unwrap();

      toast.success(t("Offerring given successfully"));
      onClose();

      dispatch(fetchApiData("/users/offerings"));
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
        toast.error(t("An unknown error occurred"));
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={t("Give Offerings")}
      styles=" max-w-3xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid ">
          <div className={`grid grid-cols-1  md:grid-cols-2 gap-2 `}>
            <Input
              key="telephone"
              type="number"
              placeholder={t("Enter telephone Number")}
              labelFor="telephone"
              labelText="Telephone"
              handleChange={(e) => {
                setTelephone(e.target.value);
              }}
              isRequired={true}
              id="telephone"
              defaultValue={telephone}
              name="telephone"
              customClass=""
            />
            <Input
              key="amount"
              type="number"
              placeholder={t("Enter offering amount")}
              labelFor="amount"
              labelText="Amount"
              handleChange={(e) => {
                setAmount(e.target.value as unknown as number);
              }}
              isRequired={true}
              id="amount"
              defaultValue={amount}
              name="amount"
              customClass=""
            />
            <Input
              key="year"
              type="number"
              placeholder={t("Enter Year")}
              labelFor="year"
              labelText="Year"
              handleChange={(e) => {
                setYear(e.target.value as unknown as number);
              }}
              isRequired={true}
              id="year"
              defaultValue={year}
              min={1900}
              max={new Date().getFullYear()}
              name="year"
              customClass=""
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PayOfferings;
