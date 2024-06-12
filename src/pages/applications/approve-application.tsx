import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Application, IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { offeringAmountFields } from "../../constants/formFields";
import { fetchApiData, updateApiData } from "../../redux/features";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import Avatar from "../../assets/avatar.png";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import Input from "../../components/Input";

const fieldState: fields = {};
offeringAmountFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const ApproveApplication = ({
  isOpen,
  onClose,
  application,
}: IProps & {
  application: Application;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [calculate, setCalculate] = useState(false);
  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);

  const christian = application?.christian;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      calculate &&
      (!createFieldState?.years || !createFieldState?.offeringAmount)
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (Number(createFieldState?.years) > 75) {
      toast.error("Years should be less than 75");
    }

    try {
      await dispatch(
        updateApiData({
          url: `/christian/application/${application?.id}/${
            !calculate ? "approve" : "request-payment"
          }`,
          body: {
            sacramentAmount:
              (createFieldState?.offeringAmount as number) *
              (createFieldState?.years as number),
          },
        })
      ).unwrap();

      toast.success(
        t(
          !calculate
            ? "Application approved successfully"
            : "Payment request sent successfully"
        )
      );

      onClose();
      setCreateFieldState(fieldState);
      setCalculate(false);
      dispatch(fetchApiData("/christian/application"));
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
        toast.error("An unknown error occurred");
      }
    }
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const approved =
    application?.status === "APPROVED" ||
    application?.status === "PAYMENT_COMPLETED";
  const rejected =
    application?.status === "REJECTED" || application?.status == "CANCELLED";
  const status = application?.status;

  useEffect(() => {
    dispatch(fetchApiData("/users/parishInfo"));
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title={t("Approve Application")}
        styles=" max-w-3xl"
      >
        <form method="POST" onSubmit={handleSubmit}>
          <div className="grid ">
            <div className="shadow-sm border flex gap-6 py-1 px-6 justify-around bg-white mb-4">
              {christian?.user?.profilePicture ? (
                <img
                  src={christian?.user?.profilePicture}
                  className="w-20 md:w-28 h-20 md:h-28  rounded-full relative "
                  alt="profile-avatar"
                />
              ) : (
                <img
                  src={Avatar}
                  className="w-20 md:w-28 h-20 md:h-28  rounded-full relative "
                  alt="profile-avatar"
                />
              )}

              <div>
                <div className="text-base flex flex-col">
                  <label htmlFor="full-name" className="font-semibold ">
                    ({t("Full Name")})
                  </label>
                  {(christian?.user?.firstName && christian?.user?.firstName) +
                    " " +
                    (christian?.user?.lastName && christian?.user?.lastName)}
                </div>
                <div className="text-base flex flex-col mt-3">
                  <label htmlFor="full-name" className="font-semibold ">
                    {t("Email")}
                  </label>

                  {christian?.user?.email ?? t("No email")}
                </div>
              </div>
              <div>
                <div className="text-base flex flex-col">
                  <label htmlFor="full-name" className="font-semibold ">
                    {t("Phone Number")}
                  </label>
                  {christian?.user?.telephone ?? "No phone number"}
                </div>
                <div className="text-base flex flex-col mt-3">
                  <label htmlFor="full-name" className="font-semibold ">
                    {t("Date of Birth")}
                  </label>
                  {christian?.user?.createdAt
                    ? new Date(christian?.dob).toDateString()
                    : t("No date of birth info")}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="  mt-2 text-base">
                <label htmlFor="" className="font-semibold mr-4">
                  {t("Service Type")}:
                </label>
                {application?.type == "Mass" ? "Mass" : "Sacrament Card"}
              </div>
              <div className="  mt-2 text-base">
                <label htmlFor="" className="font-semibold mr-4">
                  {t("Status")}:
                </label>

                <span
                  className={`border px-2 py-1 rounded-full ${
                    approved
                      ? "bg-green-100 text-green-600"
                      : rejected
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  } `}
                >
                  {status?.split("_").join(" ")}
                </span>
              </div>
              <div className="  mt-2 text-base">
                <label htmlFor="" className="font-semibold mr-4">
                  {t("Christian Offerings")}:
                </label>
                {application?.christian?.offerings
                  ? application?.christian?.offerings?.reduce(
                      (a, b) => a + b.amount,
                      0
                    )
                  : 0} Rwf
              </div>
            </div>
            {application?.type === "Mass" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="  mt-2 text-base flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    {t("Requesting Mass For")}
                  </label>
                  <span>
                    {application?.massRequester?.user?.firstName}{" "}
                    {application?.massRequester?.user?.lastName}
                  </span>
                </div>
                <div className="  mt-2 text-base  flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    {t("Mass Date")}
                  </label>
                  <span>
                    {new Date(application?.burialDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="  mt-2 text-base  flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    {t("Relationship")}
                  </label>
                  <span>{application?.relationship}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="  mt-2 text-base col-span-2">
                {!approved &&
                  !rejected &&
                  application?.status !== "REQUESTED_PAYMENT" && (
                    <button
                      type="button"
                      onClick={() => setCalculate(true)}
                      className="px-3 flex shadow-sm py-1 border bg-primary text-white hover:border-primary hover:bg-white hover:text-primary"
                    >
                      <CalculatorIcon className="w-5 mr-1" />
                      {t("Calculate Offerings")}
                    </button>
                  )}
              </div>
              {calculate &&
                offeringAmountFields.map((field) => (
                  <Input
                    id={field.id}
                    key={field.id}
                    handleChange={handleFormChange}
                    labelFor={field.labelFor}
                    labelText={t(field.labelText)}
                    type={field.type}
                    name={field.name}
                    defaultValue={
                      createFieldState[
                        field.id as keyof typeof createFieldState
                      ]
                    }
                    isRequired={field.isRequired}
                    placeholder={t(field.placeholder)}
                  />
                ))}
              {calculate && (
                <div>
                  <label className="font-semibold">{t("Offering Total")}</label>
                  <span className="px-2 text-lg w-fit justify-center items-center flex text-center bg-gray-200">
                    {(createFieldState?.offeringAmount as number) *
                      (createFieldState?.years as number)}{" "}
                    Rwf
                  </span>
                </div>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ApproveApplication;
