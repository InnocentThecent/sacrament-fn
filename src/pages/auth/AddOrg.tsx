import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { Provinces, Districts, Sectors } from "rwanda";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addOrgFields } from "../../constants/formFields";
import Input from "../../components/Input";

import logo from "../../assets/logo.png";
import { fields } from "../../types";
import { createApiData } from "../../redux/features";
import { toast } from "react-toastify";
import List from "../../components/List";

const fieldState: fields = {};

addOrgFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export default function AddOrg() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState(fieldState);
  const { error } = useAppSelector((state) => state.api);
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");

  const { loading } = useAppSelector((state) => state.api);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginState.password !== loginState.confirmPassword)
      return toast.error(t("Password does not match"));

    const myFields = {
      email: loginState.email as string,
      username: loginState.username as string,
      password: loginState.password as string,
      gender,
      province,
      district,
      sector,
      type: type == "NGO" ? "NGO" : "COMMUNITY",
      telephone: loginState.telephone as string,
      orgName: loginState.orgName as string,
      address: loginState.address as string,
    };
    
    try {
      await dispatch(
        createApiData({
          body: myFields,
          url: "/auth/add-org",
        })
      ).unwrap();

      toast.success(t(`${type} created successfully`));
      setLoginState(fieldState);
      setSector("");
      setProvince("");
      setDistrict("");
      setGender("");
      navigate("/login");
    } catch (error: any) {
      if (error.message) {
        console.log("Error:", error.message);
        toast.error(t(error.message));
      } else {
        console.log("Unknown error:", error);
        toast.error(t("An unknown error occurred"));
      }
    }
  };

  const getSectors = () => {
    if (province && district) {
      try {
        return Sectors(province, district);
      } catch (error) {
        return [];
      }
    }
    return Sectors();
  };

  return (
    <div className="bg-gray-200 min-h-full overflow-scroll   h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-4xl  w-full space-y-4 border p-3 rounded shadow-md">
        <div className="flex flex-col justify-center items-center ">
          <h4 className="text-lg font-bold text-primary">
            {t("Safe Haven")}
          </h4>
          <div className="mx-auto flex  items-center justify-center  shadow-sm">
            <img src={logo} alt="" className="w-16" />
          </div>
        </div>
        <div
          className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2 ${
            error ? "flex" : "hidden"
          }`}
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>

        <form className=" space-y-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {addOrgFields.map((field) => (
              <Input
                key={field.id}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={t(field.placeholder)}
                customClass=" px-2 py-1"
                defaultValue={loginState[field.id as keyof typeof loginState]}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLoginState({
                    ...loginState,
                    [e.target.id]: e.target.value,
                  });
                }}
              />
            ))}

            <div>
              <label htmlFor="gender" className="font-semibold">
                {t("Gender")}
              </label>
              <div role="radiogroup" className="mx-auto pt-2 flex ">
                <div className="flex ">
                  <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                    <input
                      aria-labelledby="label1"
                      type="radio"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      value="Male"
                      required
                      className="checkbox appearance-none p-2 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
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
                      onChange={(e) => setGender(e.target.value)}
                      value="Female"
                      required
                      className="checkbox appearance-none p-2 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
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

            <div>
              <List
                selectedItem={type}
                onChange={setType}
                label="Organization Type"
                items={["NGO", "Orphanage"]}
              />
            </div>
            <div className="grid col-span-2 grid-cols-1 md:grid-cols-3 gap-3">
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
              <div className="">
                <List
                  items={getSectors()}
                  selectedItem={sector}
                  onChange={setSector}
                  label={t("Sector")}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start ">
            <div className="text-sm w-full flex justify-between">
              <div className="">
                {t("Already have an account?")}
                <Link
                  to="/login"
                  className="font-medium ml-1 text-primary hover:primaryHover"
                >
                  {t("Login")}
                </Link>
              </div>
            </div>

            <div className="text-sm mr-8 w-full flex justify-between">
              <div className="">
                {t("Want to add NGO or an Orphanage?")}
                <Link
                  to="/add-org"
                  className="font-medium ml-1 text-primary hover:primaryHover"
                >
                  {t("Click here")}
                </Link>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
            ${
              loading
                ? "bg-gray-300 text-gray-500 border-gray-400 focus:ring-gray-200  hover:bg-gray-400 hover:text-white"
                : "bg-primary text-white border-primary focus:ring-primary  hover:bg-primaryHover hover:text-white "
            }

           focus:outline-none focus:ring-2 focus:ring-offset-2  `}
          >
            {loading ? "Loading..." : t("Submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
