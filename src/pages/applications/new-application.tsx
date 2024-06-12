import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { Application, IProps, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { massApplicationFields } from "../../constants/formFields";
import Input from "../../components/Input";
import { createApiData, fetchApiData } from "../../redux/features";
import { useTranslation } from "react-i18next";
import List from "../../components/List";
import "react-datepicker/dist/react-datepicker.css";

const fieldState: fields = {};
massApplicationFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const NewApplication = ({
  isOpen,
  onClose,
  applications,
}: IProps & {
  applications: Application[];
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [service, setService] = useState("");
  const [relationship, setRelationship] = useState("");

  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const checkApplication = () => {
    const sacramentApplication: Application[] = applications?.filter(
      (app: Application) => app.type !== "Mass"
    );
    if (!sacramentApplication.length) return true;
    const lastApplication =
      sacramentApplication[sacramentApplication.length - 1];
    console.log(lastApplication?.status);
    if (lastApplication?.status === "PENDING") {
      toast.error(t("You have a pending application"));
      return false;
    }
    const christianSacraments =
      sacramentApplication[0].christian?.christianSacraments;

    if (sacramentApplication.length && !christianSacraments.length) {
      console.log("error");
      toast.error(
        t("You haven't received any sacrament since your last application")
      );
      return false;
    }

    const lastSacrament = christianSacraments[christianSacraments.length - 1];

    if (
      new Date(lastSacrament.createdAt) >
      new Date(sacramentApplication[sacramentApplication?.length - 1].createdAt)
    ) {
      toast.error(
        "You haven't received any sacrament since your last application or you have a pending application"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (service !== "Mass") {
      if (checkApplication() == false) return;
    }
    if (
      service === "Mass" &&
      (!relationship ||
        !createFieldState?.uniqueCode ||
        !createFieldState?.massDate)
    ) {
      toast.error(t("Please fill all fields"));
      return;
    }

    if (new Date(createFieldState?.massDate) < new Date()) {
      toast.error(t("Mass date cannot be in the past"));
      return
    }

    const formData = {
      ...createFieldState,
      type: service,
      relationship:
        relationship == "Other" ? createFieldState.other : relationship,
    };

    try {
      await dispatch(
        createApiData({
          url: "/christian/application",
          body: formData,
        })
      ).unwrap();

      toast.success(t("Application made successfully"));
      onClose();
      setCreateFieldState(fieldState);
      setService("");
      setRelationship("");
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
      title={t("Apply for Service")}
      styles=" max-w-3xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid ">
          <div className={`grid grid-cols-1  md:grid-cols-2 gap-2 `}>
            <div className="mb-4 ">
              <List
                items={[`${t("Sacraments Card")}`, `${t("Mass")}`]}
                selectedItem={service}
                onChange={setService}
                label={t("Service")}
                required={true}
              />
            </div>
            <div className={`${service == "Mass" ? "block" : "hidden"}`}>
              <List
                items={[
                  `${t("Mother")}`,
                  `${t("Father")}`,
                  `${"Guardian"}`,
                  `${t("Child")}`,
                  `${t("Spouse")}`,
                  `${t("Sibling")}`,
                  `${t("Other")}`,
                ]}
                selectedItem={relationship}
                onChange={setRelationship}
                label={t("Relationship")}
                required={true}
              />
            </div>

            {/* {service === "Mass" && */}
            <div
              className={`${
                service === "Mass" ? "grid" : "hidden"
              } col-span-2 grid-cols-1  md:grid-cols-2 gap-2 `}
            >
              {massApplicationFields.map((field) => (
                <Input
                  key={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  labelFor={field.labelFor}
                  labelText={field.labelText}
                  handleChange={handleFormChange}
                  isRequired={field.isRequired}
                  id={field.id}
                  defaultValue={fieldState[field.id as keyof typeof fieldState]}
                  name={field.name}
                  customClass=""
                />
              ))}
              {relationship === "Other" && (
                <Input
                  key="other"
                  type="text"
                  placeholder={t("Enter the relationship")}
                  labelFor="other"
                  labelText="Other"
                  handleChange={handleFormChange}
                  isRequired={true}
                  id="other"
                  defaultValue=""
                  name="other"
                  customClass=""
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewApplication;
