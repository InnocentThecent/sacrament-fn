import { PhoneIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast } from "react-toastify";

import Input from "../components/Input";
import { parishInfoFields, passwordFields } from "../constants/formFields";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { AiFillMail, AiOutlineUpload } from "react-icons/ai";
import { createApiData, updateApiData } from "../redux/features";
import { fields } from "../types";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const fieldState: fields = {};

passwordFields.forEach((field) => {
  fieldState[field.id as keyof typeof fieldState] = "";
});

export function EditPassword({ user }: { user: any }) {
  const { loading } = useAppSelector((state) => state.api);

  const dispatch = useAppDispatch();

  const [passwordFieldState, setPasswordField] = useState<fields>(fieldState);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(
        updateApiData({
          body: {
            oldPassword: passwordFieldState.currentPassword,
            newPassword: passwordFieldState.newPassword,
            userId: user.id,
          },
          url: "/auth/change-password",
        })
      ).unwrap();
      setPasswordField(fieldState);
      toast.success("Password changed successfully");
      // history.go(0);
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
    <div className="bg-light-bg dark:bg-dark-frame-bg min-h-screen ">
      <div className="border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[60%] h-[56vh] md:h-[60vh] lg:h-[60vh] mx-4 mb-6 lg:-ml-8 rounded-lg">
        <div className="px-4">
          <form className="mt-12 grid grid-cols-1 gap-4" onSubmit={onSubmit}>
            {passwordFields.map((field) => (
              <Input
                key={field.id}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={`${field.placeholder}`}
                customClass="dark:bg-dark-bg"
                defaultValue={fieldState.id}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordField({
                    ...passwordFieldState,
                    [field.id]: e.target.value,
                  });
                }}
              />
            ))}

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
              {loading ? "Loading..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ProfileTabs({ data }: any) {
  const { t } = useTranslation();
  const appData = useAppSelector((state) => state.api);

  const parishInfo = appData?.parishInfo && appData?.parishInfo[0];
  const fieldState: fields = {};

  parishInfoFields.forEach((field) => {
    fieldState[field.id as keyof typeof fieldState] = parishInfo ? parishInfo[field?.id]: "";
  });

  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("auth") as string);

  const [openTab, setOpenTab] = useState("About");
  const [signature, setSignature] = useState<File | null>(null);
  const [parishInfoFieldState, setParishInfoField] =
    useState<fields>(fieldState);
  const { loading } = useAppSelector((state) => state.api);

  let tabs: Array<string> = ["About", "Account"];
  user?.role === "HIGH_PRIEST" && tabs.push("Parish Info");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!signature) {
      return toast.error(t("Please upload a signature"));
    }

    if (!parishInfoFieldState?.parishName || !parishInfoFieldState?.diocese) {
      toast.error(t("Please fill all fields"));
    }

    const formData = new FormData();
    formData.append("parishName", parishInfoFieldState?.parishName as string);
    formData.append("diocese", parishInfoFieldState?.diocese as string);
    formData.append("signature", signature as File);
    formData.append("offeringAmount",Number(parishInfoFieldState?.offeringAmount) as any)

    try {
      await dispatch(
        createApiData({ body: formData, url: "/users/parish-info" })
      ).unwrap();

      setParishInfoField(fieldState);
      setSignature(null);
      toast.success("Parish info updated successfully");
    } catch (error: any) {
      if (error.message) {
        // console.log("Error:", error.message);
        if (error.message === "Validation failed") {
          console.log(error);
          return toast.error(error?.data[0]?.message);
        }
        toast.error(error.message);
      } else {
        console.log("Unknown error:", error);
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];

    if (
      uploadedFile?.type !== "image/png" &&
      uploadedFile?.type !== "image/jpg" &&
      uploadedFile?.type !== "image/jpeg"
    )
      return toast.error(t("Please select an image file"));
    if (uploadedFile.size > 10485760)
      return toast.error(t("File size must be less than 10mb"));

    setSignature(uploadedFile);
  };

  return (
    <div className="flex flex-wrap lg:ml-72 lg:mr-8">
      <>
        <div className="lg:w-[40vw]">
          {/* Profile tabs option start */}
          <ul
            className="flex border-2 mb-0 list-none flex-wrap  flex-row text-black dark:text-dark-text-fill"
            role="tablist"
          >
            {tabs.map((tab) => (
              <li
                key={tab}
                className="-mb-px mr-2 last:mr-0 flex-auto text-center"
              >
                <a
                  className={`text-xs font-bold border-b-4 uppercase px-3 md:px-5 py-3 shadow-sm  block leading-normal ${
                    openTab === `${tab}`
                      ? "bg-white dark:bg-dark-bg border-b-4 border-b-primary "
                      : "border-b-gray-50 "
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(`${tab}`);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                  data-testid="tab-link"
                >
                  {t(tab)}
                </a>
              </li>
            ))}
          </ul>
          {/* Profile tabs option end */}
        </div>
        <div className="relative flex flex-col min-w-0 break-words text-light-text dark:text-dark-text-fill  w-full rounded">
          <div className="py-2 flex-auto">
            <div className="tab-content tab-space">
              {/* About section start */}
              <div
                className={openTab === "About" ? "block" : "hidden"}
                id="link1"
              >
                <div className="grid md:grid-cols-5 gap-4 md:gap-6 ">
                  <div className="p-2 border flex flex-col md:col-span-2 justify-start items-start bg-white  dark:bg-dark-bg shadow ">
                    <h3 className="text-2xl font-bold m-2  mb-4">
                      {data?.firstname ?? data?.username} {data?.lastname}
                    </h3>
                    <div className="py-4 flex  justify-center">
                      <AiFillMail className="w-6 mr-2 mt-1 dark:text-dark-text-fill" />
                      {data?.email}
                    </div>
                    <div className="flex">
                      <PhoneIcon className="w-6 mr-2 dark:text-dark-text-fill" />
                      {data?.telephone ? data.telephone : "N/A"}
                    </div>
                  </div>
                  <div className="p-2 border md:col-span-3 bg-white  dark:bg-dark-bg shadow">
                    <h2 className="text-xl font-bold m-2  mb-4">Summary</h2>
                    <div className="py-4 flex justify-start">
                      <UserIcon className="w-6 mr-2 dark:text-dark-text-fill" />
                      <span className="font-bold text-gray-800 dark:text-dark-text-fill">
                        {t("Role")}
                      </span>
                      :
                      <span className="px-3 bg-primary text-white ml-3 rounded-full">
                        {data?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* About section end */}

              {/* Change password  start */}
              <div
                className={openTab === "Account" ? "block" : "hidden"}
                id="link2"
              >
                <EditPassword user={data} />
              </div>
              {/* Change password  end */}

              <div className={openTab == "Parish Info" ? "block" : "hidden"}>
                <div className="border bg-white dark:border-dark-bg  dark:bg-dark-bg dark:text-white w-[94vw] md:w-[96vw] lg:w-[60%] h-[56vh] md:h-[60vh] lg:h-[60vh] mx-4 mb-6 lg:-ml-8 rounded-lg">
                  <div className="px-4">
                    <form
                      className="mt-12 grid grid-cols-1 gap-4"
                      onSubmit={handleSubmit}
                    >
                      {parishInfoFields.map((field) => (
                        <Input
                          key={field.id}
                          labelText={field.labelText}
                          labelFor={field.labelFor}
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          isRequired={field.isRequired}
                          placeholder={`${field.placeholder}`}
                          customClass="dark:bg-dark-bg"
                          defaultValue={parishInfo ? parishInfo[field?.id] : ''}
                          handleChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setParishInfoField({
                              ...parishInfoFieldState,
                              [field.id]: e.target.value,
                            });
                            console.log(e.target.value,parishInfoFieldState)

                          }}
                        />
                      ))}
                      <div className="py-2 mb-4">
                        <label htmlFor="" className="font-semibold">
                          {t("Signature")}
                        </label>

                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => {}}
                          style=" p-1  flex rounded-sm text-white text-base border border-primary shadow-sm hover:bg-primary hover:text-white "
                        >
                          <label
                            htmlFor="panoramic-upload"
                            className="cursor-pointer flex items-center"
                          >
                            <AiOutlineUpload className=" w-6 h-5" />
                            <span className="ml-2">
                              {t("Upload signature photo")}
                            </span>
                          </label>
                        </Button>
                        <input
                          type="file"
                          id="panoramic-upload"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        {signature && (
                          <p className="mt-2 text-sm">
                            {t("Selected file")}: {signature.name}
                          </p>
                        )}
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
                        {loading ? t("Loading...") : t("Edit Info")}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
