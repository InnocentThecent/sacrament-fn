import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { Application, IProps } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { createApiData, fetchApiData } from "../../redux/features";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../../components/Input";

const PaymentModal = ({
  isOpen,
  onClose,
  application,
}: IProps & {
  application: Application;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [telephone, setTelephone] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        createApiData({
          url: `/christian/application/${application?.id}/pay`,
          body: {
            telephone,
            sacramentAmount: application?.sacramentAmount,
          },
        })
      ).unwrap();

      toast.success(t("Payment made successfully"));
      onClose();

      dispatch(fetchApiData("/christian/application"));
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
      title={t("Pay for service")}
      styles=" max-w-3xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid ">
          <div className={`grid grid-cols-1  md:grid-cols-2 gap-2 `}>
            <div className="mb-4 ">
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
              />{" "}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;
