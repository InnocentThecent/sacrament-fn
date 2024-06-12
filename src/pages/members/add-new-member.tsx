import { useState } from "react";
import { useAppDispatch } from "../../redux/hook";
import { fields } from "../../types";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import { memberSacramentsFields, userFields } from "../../constants/formFields";
import Input from "../../components/Input";
import { createApiData, fetchApiData } from "../../redux/features";
import { useTranslation } from "react-i18next";
import { Districts, Provinces } from "rwanda";
import List from "../../components/List";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const fieldState: fields = {};
userFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

memberSacramentsFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

const AddMember = ({ d, onClose }: any) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [createFieldState, setCreateFieldState] = useState<fields>(fieldState);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFieldState({
      ...createFieldState,
      [e.target.id]: e.target.value,
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 3));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const validate = () => {
    if (currentPage == 1) {
      for (let key of userFields) {
        if (key.isRequired && !createFieldState[key.id]) {
          toast.error(`${key.labelText} is required`);
          return false;
        }
      }
      return true;
    } else if (currentPage == 2) {
      for (let key of memberSacramentsFields) {
        if (key.isRequired && !createFieldState[key.id]) {
          toast.error(`${key.labelText} is required`);
          return false;
        }
        const date = new Date(createFieldState[key.id]);

        if (date > new Date()) {
          toast.error(`${key.labelText} can't be in the future`);
          return false;
        }
      }
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(province, district, createFieldState?.homeAddress);
    if (!province || !district || !createFieldState?.home) {
      toast.error(t("Please select all fields"));
      return;
    }

    const formData = {
      ...createFieldState,
      gender,
      province,
      district,
    };

    try {
      await dispatch(
        createApiData({
          url: "/christian",
          body: formData,
        })
      ).unwrap();

      toast.success(t("New Member added successfully"));
      onClose();
      setCreateFieldState(fieldState);
      setGender("");
      setProvince("");
      setDistrict("");
      setCurrentPage(1);
      dispatch(fetchApiData("/users"));
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

  return (
    <Modal
      isOpen={d}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={t("Add New Member")}
      styles=" max-w-3xl"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="grid ">
          {/* PERSONAL INFORMATION */}
          <div
            className={` grid-cols-1  md:grid-cols-2 gap-2 ${
              currentPage == 1 ? "grid" : "hidden"
            }`}
          >
            <div className="my-3 col-span-2 flex items-center">
              <hr className="w-1/3 border mr-auto" />
              <h3 className="text-lg  font-bold">
                {t("Personal Information")}
              </h3>
              <hr className="w-1/3 border ml-auto" />
            </div>
            {userFields.map((field) => (
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
            <div>
              <label htmlFor="gender" className="font-semibold">
                {t("Gender")}
              </label>
              <div role="radiogroup" className="mx-auto pt-2 flex ">
                <div className="flex ">
                  <div className="  rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                    <input
                      aria-labelledby="label1"
                      type="radio"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      value="Male"
                      required
                      className={`checkbox appearance-none p-2 focus:opacity-100 focus:ring-2 focus:ring-offset-2
                       focus:ring-indigo-700  focus:outline-none border 
                      rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none 
                      ${gender === "Male" && "bg-red-400"}`}
                    />
                    <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1"></div>
                  </div>
                  <label
                    id="label1"
                    className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100"
                  >
                    {t("Male")}
                  </label>
                </div>
                <div className="flex items-center ml-6">
                  <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                    <input
                      aria-labelledby="label1"
                      type="radio"
                      name="gender"
                      onChange={(e) => {
                        e.preventDefault();
                        setGender(e.target.value);
                      }}
                      value="Female"
                      required
                      className={`checkbox appearance-none p-2 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 
                    focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none
                    ${gender === "Female" && "bg-red-400"}`}
                    />
                    <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1"></div>
                  </div>
                  <label
                    id="label1"
                    className="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100"
                  >
                    {t("Female")}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SACRAMENT INFORMATION */}
          <div
            className={` grid-cols-1  md:grid-cols-2 gap-2 ${
              currentPage == 2 ? "grid" : "hidden"
            }`}
          >
            <div className="my-3 col-span-2 flex items-center">
              <hr className="w-1/3 border mr-auto" />
              <h3 className="text-lg  font-bold">{t("Sacraments")}</h3>
              <hr className="w-1/3 border ml-auto" />
            </div>
            {memberSacramentsFields.map((field) => (
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
          </div>
          {/* LOCATION INFORMATION */}
          <div
            className={` grid-cols-1  md:grid-cols-2 gap-2 ${
              currentPage == 3 ? "grid" : "hidden"
            }`}
          >
            <div className="my-3 col-span-2 flex items-center">
              <hr className="w-1/3 border mr-auto" />
              <h3 className="text-lg  font-bold">
                {t("Location Information")}
              </h3>
              <hr className="w-1/3 border ml-auto" />
            </div>

            <div className=" ">
              <List
                items={Provinces()}
                selectedItem={province}
                onChange={setProvince}
                label={t("Province")}
                required
              />
            </div>

            <div className="">
              <List
                items={province ? Districts(province) : Districts()}
                selectedItem={district}
                onChange={setDistrict}
                label={t("District")}
                required
              />
            </div>
            <Input
              key="home"
              type="text"
              placeholder={t("Enter your Home Address")}
              labelFor="home"
              labelText="Home Address"
              handleChange={handleFormChange}
              isRequired={true}
              id="home"
              defaultValue={fieldState["home"]}
              name="home"
              customClass=""
            />
          </div>
          <div className="flex my-2">
            <button
              type="button"
              className={`flex border border-primary mr-auto mt-1 bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                currentPage === 1 ? "hidden" : "block"
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <AiOutlineArrowLeft className="mt-[2px] w-6 h-5" />
              {t("Previous")}
            </button>
            <button
              type="button"
              className={`flex border  border-primary ml-auto bg-white px-4 py-2 mt-1 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                currentPage === 3 ? "hidden" : "block"
              }`}
              onClick={() => {
                if (validate()) {
                  handleNextPage();
                }
              }}
            >
              <AiOutlineArrowRight className="mt-[2px] w-6 h-5" />
              {t("Next")}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddMember;
