import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { IProps, User, fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { createApiData, fetchApiData } from "../../redux/features";
import { useTranslation } from "react-i18next";
import List from "../../components/List";
import "react-datepicker/dist/react-datepicker.css";

const AddNewMemberSacrament = ({
  isOpen,
  onClose,
  member,
}: IProps & {
  member: User;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  //   console.log(member?.christian?.christianSacraments)

  const memberSacraments = member?.christian?.christianSacraments?.map(
    (s: any) => s?.sacrament.name
  );

  const sacraments = [
    "Baptism",
    "Confirmation",
    "Marriage",
    "Eucharist",
  ].filter((sacrament) => !memberSacraments?.includes(sacrament));

  const [selected, setSelected] = useState("");
  const [createFieldState, setCreateFieldState] = useState<fields>({
    date: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected || !createFieldState?.date) {
      toast.error(t("Please select all fields"));
      return;
    }
    if (new Date(createFieldState?.date) > new Date()) {
      toast.error(t("Sacrament has to have been given, it can't be in future"));
    }

    const formData = {
      ...createFieldState,
      sacrament: selected,
    };

    try {
      await dispatch(
        createApiData({
          url: `/users/${member?.id}/add-new-sacrament`,
          body: formData,
        })
      ).unwrap();

      toast.success(t("New Parishioner Sacrament added successfully"));
      onClose();
      setCreateFieldState({
        date: "",
      });
      setSelected("");
      dispatch(fetchApiData("/users"));
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
      title={t("Add Parishioner Sacrament")}
      styles=" max-w-3xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid ">
          <div className={`grid grid-cols-1  md:grid-cols-2 gap-2 `}>
            <div className="mb-20">
              <List
                items={sacraments}
                selectedItem={selected}
                onChange={setSelected}
                label={t("Sacrament")}
                required
              />
            </div>

            <Input
              key="Date"
              type="date"
              placeholder={t("Enter your Sacrament Giving Date")}
              labelFor="date"
              labelText={t("Sacrament Date")}
              handleChange={handleFormChange}
              isRequired={true}
              id="date"
              defaultValue={createFieldState["date"]}
              name="date"
              customClass=" mt-2"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewMemberSacrament;
