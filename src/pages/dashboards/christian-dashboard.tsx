import { useEffect } from "react";
import Card from "../../components/Card";
import { fetchApiData } from "../../redux/features";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useTranslation } from "react-i18next";

export default function ChristianDashboard() {
  const dispatch = useAppDispatch();
  const {t} = useTranslation()

  const data = useAppSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData("/christian/application"));
  }, [dispatch]);

  return (
    <div className="ml-6 md:ml-80 mt-24 flex flex-wrap">
      <Card
        title={`${t("Applications")}`}
        subtitle={data?.application?.length ?? 0}
        description={`${t("Total applications")}`}
        customClass="md:ml-4 mr-2 md:mr-0 border"
      />
    </div>
  );
}
