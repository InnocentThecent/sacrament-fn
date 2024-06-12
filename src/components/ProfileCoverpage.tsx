import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import Avatar from "../assets/avatar.png";
import Button from "./Button";
import { UserContext } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { updateApiData } from "../redux/features";
import { HiPencil } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
// import { updateMember } from '../api/member.api';

export default function ProfileCoverpage({
  currentPage,
  data,
}: {
  currentPage: string;
  data: any;
}) {
  const navigate = useNavigate();
  const {t} = useTranslation()
  const dispatch = useAppDispatch();

  const { user } = useContext(UserContext);
  const { loading } = useAppSelector((state) => state.api);
  const userData = user;

  const handleEdit = () => {
    navigate("/dashboard/profile/edit", {
      state: {
        profile: data,
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type !== "image/png" && file?.type !== "image/jpeg") {
      toast.error("Invalid file type. Only png and jpeg files are allowed");
      return;
    }
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("profilePicture", file!);
        await dispatch(
          updateApiData({
            url: "/users/update-profile-picture",
            body: formData,
          })
        ).unwrap();
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...userData,
            profilePicture: URL.createObjectURL(file),
          })
        );
        toast.success("Profile picture updated successfully");
        navigate("/login");
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
    }, 2000);
  };

  const isLoggedInUser = data?.id == userData?.id;

  return (
    <div className=" mt-[4.4rem] bg-[url('https://images.unsplash.com/photo-1483168527879-c66136b56105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3016&q=80')] bg-cover bg-no-repeat bg-center bg-fixed h-[28vh] md:h-[26vh] lg:ml-48 flex flex-row text-center  align-center items-center">
      <img
        src={userData?.profilePicture ?? Avatar}
        className="w-20 md:w-36 h-20 md:h-36  rounded-full relative ml-6 md:ml-24  mt-36 md:mt-12"
        alt="profile-avatar"
      />
      {isLoggedInUser && (
        <div className="flex h-full items-center justify-center bg-grey-lighter  -ml-10 md:-ml-12 mt-36 md:mt-20 z-0 mr-auto">
          <div role="button">
            <label
              className={`flex flex-row text-center ml-auto mr-4 rounded-lg focus:outline-none p-1 ${
                loading
                  ? "cursor-not-allowed bg-gray-500 text-white "
                  : "cursor-pointer bg-primary text-white hover:bg-[#1eaad6]"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8z"
                  ></path>
                </svg>
              ) : (
                <HiPencil className="w-6 mr-1 mt-1 dark:text-dark-text-fill" />
              )}
              <span className="text-lg md:text-sm dark:text-dark-text-fill">
                <span className="hidden md:block">
                  {loading ? t("Uploading...") : t("Edit")}
                </span>
              </span>
              <input
                type="file"
                className="hidden"
                disabled={loading}
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      )}
      {isLoggedInUser &&
        (currentPage !== "editProfile" ? (
          <Button
            onClick={() => handleEdit()}
            variant="default"
            size="md"
            style="text-center ml-auto mr-4 mt-40 md:mt-24  rounded-lg bg-primary text-white hover:bg-[#1eaad6] focus:outline-none p-1 md:p-2 flex flex-row"
          >
            <HiPencil className="w-6 mr-1 mt-1 dark:text-dark-text-fill " />
            <span className="hidden md:block"> {t("Edit Profile")} </span>
          </Button>
        ) : (
          <div></div>
        ))}
    </div>
  );
}
