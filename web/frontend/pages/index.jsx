import { useTranslation, Trans } from "react-i18next";
import Sidebar from "../components/Sidebar/Sidebar";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div>
      <Sidebar />
    </div>
  );
}
