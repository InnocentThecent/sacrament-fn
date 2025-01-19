import { IProps, User } from "../../types";
import Avatar from "../../assets/avatar.png";
import Modal from "../../components/Modal";
import { useTranslation } from "react-i18next";

export default function ViewMember({
  isOpen,
  onClose,
  user,
}: IProps & {
  user: User;
}) {
  const { t } = useTranslation();

  return (
    <Modal
      title="View Church Member"
      isOpen={isOpen}
      onClose={onClose}
      styles=" max-w-3xl"
    >
      <div className="grid">
        <div className="shadow-sm border flex gap-6 py-1 px-6 justify-around bg-white mb-4">
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
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
                {t("Full Name")}
              </label>
              {(user?.firstName && user?.firstName) +
                " " +
                (user?.lastName && user?.lastName)}
            </div>
            <div className="text-base flex flex-col mt-3">
              <label htmlFor="full-name" className="font-semibold ">
                {t("Email")}
              </label>

              {user?.email ?? "No email"}
            </div>
          </div>
          <div>
            <div className="text-base flex flex-col">
              <label htmlFor="full-name" className="font-semibold ">
                {t("Phone Number")}
              </label>
              {user?.telephone ?? "No phone number"}
            </div>
            <div className="text-base flex flex-col mt-3">
              <label htmlFor="full-name" className="font-semibold ">
                {t("Date of Birth")}
              </label>
              {user?.createdAt
                ? new Date(user?.christian!.dob).toDateString()
                : "2/1/1999"}
            </div>
          </div>
        </div>

        {/* PARENT' INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="  mt-2 text-base flex flex-col">
            <label htmlFor="" className="font-semibold">
              {t("Father Name")}
            </label>
            <span>{user?.christian?.fatherName}</span>
          </div>
          <div className="  mt-2 text-base  flex flex-col">
            <label htmlFor="" className="font-semibold">
              {t("Mother Name")}
            </label>
            <span>{user?.christian?.motherName}</span>
          </div>
          <div className="  mt-2 text-base  flex flex-col">
            <label htmlFor="" className="font-semibold">
              {t("God Parent")}
            </label>
            <span>{user?.christian?.godParent ?? "No God Parent"}</span>
          </div>
        </div>

        {/* SACRAMENTS */}

        <div className="grid grid-cols-1 mt-3 md:grid-cols-3 gap-2">
          <div className="  mt-2 text-base flex flex-col">
            <label htmlFor="" className="font-semibold">
              {t("Sacraments")}
            </label>
            <div className="flex gap-2">
              {user?.christian?.christianSacraments?.length
                ? user?.christian?.christianSacraments?.map((cs: any) => (
                    <span className="px-3 rounded-sm bg-blue-200 text-primary">
                      {cs?.sacrament?.name}
                    </span>
                  ))
                : t("No sacraments")}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
