import { useTranslation, Trans } from "react-i18next";
import Sidebar from "../components/Sidebar/Sidebar";

export default function HomePage() {
  const { t } = useTranslation();
  const headstyle = {
    display: "flex",
    flexdirection: "row",
    height: "100vh" /* Adjust the height as needed */,
  };
  const pagestyle = {
    flexgrow: 1,
    backgroundcolor: "lightgray",
    transition: "width 0.5s" /* Optional transition effect */,
  };

  return (
    <div>
      <Sidebar />
    </div>
  );
}
