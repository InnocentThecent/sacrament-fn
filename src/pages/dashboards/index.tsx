import { useEffect, useContext } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hook";

import Card from "../../components/Card";
import { UserContext } from "../../hooks/useAuth";

import { fetchApiData } from "../../redux/features";
import DoctorDashboard from "./high-priest-dashboard";
import { BsHospital } from "react-icons/bs";
import { GiNurseFemale } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import ChristianDashboard from "./christian-dashboard";
import HighPriestDashboard from "./high-priest-dashboard";

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const d = useAppSelector((state) => state.api);

  const { user } = useContext(UserContext);

  const data = [
    {
      title: `${t("Members")}`,
      subtitle: `${d?.users?.length ?? 0}`,
      description: `${t("Number of Christians")}`,
      Icon: <GiNurseFemale />,
    },
    {
      title: `${t("Applications")}`,
      subtitle: `${d?.application?.length ?? 0}`,
      description: `${t("Number of Applications")}`,
      Icon: <BsHospital />,
    },
  ];

  useEffect(() => {
    dispatch(fetchApiData("/christian/application"));
    dispatch(fetchApiData("/users"));
  }, [dispatch]);

  let DashboardComponent;
  switch (user?.role) {
    case "CLERGY":
      DashboardComponent = (
        <div className="ml-6 md:ml-80 mt-24 flex flex-wrap">
          {data.map((item, index) => {
            return (
              <Card
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                customClass="md:ml-4 mr-2 md:mr-0 border"
              />
            );
          })}
        </div>
      );
      break;
    case "CHRISTIAN":
      DashboardComponent = <ChristianDashboard />;
      break;
    case "HIGH_PRIEST":
      DashboardComponent = <HighPriestDashboard />;
      break;
  }

  return DashboardComponent;
}
