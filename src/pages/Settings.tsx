import { useContext, useRef, useEffect } from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import getLanguage from "../utils/getLanguage";

function Settings() {
  const { user } = useContext(UserContext);

  const { t } = useTranslation();
  const lanRef = useRef<any>();
  const lan = getLanguage();
  const userLang = window.navigator.language;
  const handleLanChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    i18next.changeLanguage(value);
  };

  useEffect(() => {
    if (lanRef.current) {
      lanRef.current.value = lan;
    }
  }, []);
  
  return (
    <div className="lg:ml-40 flex border-2 flex-col grow bg-gray-100 dark:bg-dark-frame-bg mt-12">
      <div className="md:ml-56  flex mt-16 -mb-6 gap-2">
        <div className="text-primary cursor-pointer">
          <Link to="/dashboard">{t("Home")}</Link>
        </div>
        <span>/</span>
        <div> {t("Settings")}</div>
      </div>
      <div className="flex flex-row mr-10 justify-center pt-[8vh]">
        <div className="rounded-lg border w-[90%] lg:w-80vh lg:ml-[32vh] lg:mr-[2vh] lg:mb-10 p-6 bg-white dark:bg-dark-bg">
          <h1 className="mb-4 font-bold text-xl dark:text-dark-text-fill">
            {t("Settings")}
          </h1>
          <div>
            <li className="flex items-center border-b pt-2 pb-1 mt-10">
              <div className="w-[33vh]">
                <h1 className="font-bold dark:text-dark-text-fill">
                  {t("Profile")}
                </h1>
                <p className="text-sm text-gray-600 dark:text-dark-text-fill">
                  {t("Edit profile, export account data, ...")}
                </p>
              </div>
              <Link
                className="ml-auto text-gray-600 text-xs md:text-base dark:text-dark-text-fill"
                to="#link"
              >
                <h4 className="hover:text-primary">
                  <Link to={`/dashboard/profile/${user.id}`}>
                    {t("Change")}
                  </Link>
                </h4>
              </Link>
            </li>
            <li className="flex items-center border-b py-4">
              <div className="w-[33vh]">
                <h1 className="font-bold dark:text-dark-text-fill">
                  {t("Language")}
                </h1>
                <p className="text-sm text-gray-600 dark:text-dark-text-fill">
                  {t("Language preferences")}
                </p>
              </div>
              <select
                defaultValue={userLang}
                data-testid="lanChange"
                ref={lanRef}
                onChange={(e) => handleLanChange(e)}
                className="ml-auto bg-white border px-2 h-9 rounded-md text-xs md:text-sm text-gray-600 dark:text-dark-text-fill dark:bg-dark-bg outline-none"
              >
                <option value="en">English</option>
                <option value="kn">Ikinyarwanda</option>
              </select>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
