import {
  AppProvider,
  LegacyCard,
  FormLayout,
  Frame,
  Layout,
  Navigation,
  Page,
  TextField,
  Toast,
} from "@shopify/polaris";
import {
  ProfileMajor,
  BuyButtonVerticalLayoutMajor,
  BillingStatementDollarMajor,
  ButtonMinor,
  SettingsMajor,
  EmailMajor,
} from "@shopify/polaris-icons";
import { useState, useCallback, useRef } from "react";
import React from "react";
import Tab from "../FloatingWidgets/Tabs";
import ButtonTabs from "../Button/ButtonTabs";
import SkeletonExample from "../Skeleton";
import Plan from "../Plans/Plan";
import Supports from "../Supports/Supports";
import Settings from "../Settings/Settings";

function Sidebar() {
  const defaultState = useRef({
    emailFieldValue: "dharma@jadedpixel.com",
    nameFieldValue: "Jaded Pixel",
  });

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);

  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue
  );

  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue
  );

  const handleNameFieldChange = useCallback((value) => {
    setNameFieldValue(value);
    value && setIsDirty(true);
  }, []);

  const handleEmailFieldChange = useCallback((value) => {
    setEmailFieldValue(value);
    value && setIsDirty(true);
  }, []);

  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    []
  );

  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    []
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const FloatingWidget = <Tab />;

  const Button = <ButtonTabs />;

  const Plans = <Plan />;

  const Setting = <Settings />;

  const Support = <Supports />;

  const handleDisplay = useCallback(() => {
    navigationContent(Button); // Set showDisplay to true when Floating Widget is clicked
  }, []);

  const actualPageMarkup = (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title="Account details"
          description="Jaded Pixel will use this as your account information."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Full name"
                value={nameFieldValue}
                onChange={handleNameFieldChange}
                autoComplete="name"
              />
              <TextField
                type="email"
                label="Email"
                value={emailFieldValue}
                onChange={handleEmailFieldChange}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
          {showDisplay && <Display />}
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );

  // const loadingMarkup = isLoading ? <SkeletonExample /> : actualPageMarkup;

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="WHATSAPP"
        items={[
          {
            label: "Accounts",
            icon: ProfileMajor,
            onClick: () => setNavigationContent(actualPageMarkup),
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

  const [navigationContent, setNavigationContent] = useState(actualPageMarkup);

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
