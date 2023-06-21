import { AppProvider, Frame, Navigation } from "@shopify/polaris";
import {
  ProfileMajor,
  BuyButtonVerticalLayoutMajor,
  BillingStatementDollarMajor,
  ButtonMinor,
  SettingsMajor,
  EmailMajor,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import React from "react";
import Tab from "../FloatingWidgets/Tabs";
import ButtonTabs from "../Button/ButtonTabs";
import Plan from "../Plans/Plan";
import Supports from "../Supports/Supports";
import Settings from "../Settings/Settings";
import Account from "../Accounts/Form";
import Empty_State from "../Accounts/newAccount";

function Sidebar() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const handleNavigationAction = () => {
    setNavigationContent(<Account />);
  };

  const FloatingWidget = <Tab />;

  const Button = <ButtonTabs />;

  const Plans = <Plan />;

  const Setting = <Settings />;

  const Support = <Supports />;

  const handleDisplay = useCallback(() => {
    navigationContent(Button); // Set showDisplay to true when Floating Widget is clicked
  }, []);

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="WHATSAPP"
        items={[
          {
            label: "Accounts",
            icon: ProfileMajor,
            onClick: () =>
              setNavigationContent(
                <Empty_State onAction={handleNavigationAction} />
              ),
          },
          {
            label: "Floating Widget",
            icon: BuyButtonVerticalLayoutMajor,
            onClick: () => setNavigationContent(FloatingWidget),
          },
          {
            label: "Button",
            icon: ButtonMinor,
            onClick: () => setNavigationContent(Button),
          },
          {
            label: "Plans",
            icon: BillingStatementDollarMajor,
            onClick: () => setNavigationContent(Plans),
          },
          {
            label: "Settings",
            icon: SettingsMajor,
            onClick: () => setNavigationContent(Setting),
          },
          {
            label: "Support",
            icon: EmailMajor,
            onClick: () => setNavigationContent(Support),
          },
        ]}
      />
    </Navigation>
  );

  const [navigationContent, setNavigationContent] = useState(
    <Empty_State onAction={handleNavigationAction} />
  );

  return (
    <div style={{ height: "500px" }}>
      <AppProvider>
        <Frame
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          {navigationContent}
        </Frame>
      </AppProvider>
    </div>
  );
}
export default Sidebar;
