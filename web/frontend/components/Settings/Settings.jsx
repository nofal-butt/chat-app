import { Page, Button, LegacyCard } from "@shopify/polaris";
import React, { useState } from "react";
import Tab from "./Tab";

export default function Settings() {
  const [isActive, setIsActive] = useState(true);
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <Page title="Settings">
      <LegacyCard sectioned>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {isActive ? (
            <>
              <p style={{ marginTop: "5px" }}>
                This app is activated. If you want to uninstall this app, please
                click the <strong>Deactivate</strong> button first.
              </p>
              <div style={{ marginLeft: "20px" }}>
                <Button onClick={handleToggle}>Deactivate</Button>
              </div>
            </>
          ) : (
            <>
              <p style={{ marginTop: "5px" }}>
                This app is deactivated. If you want to use this app, please
                click the <strong>Activate</strong> button.
              </p>
              <div style={{ marginLeft: "20px" }}>
                <Button onClick={handleToggle} primary>
                  Activate
                </Button>
              </div>
            </>
          )}
        </div>
      </LegacyCard>
      <div style={{ marginBottom: "20px" }}>{isActive && <Tab />}</div>
    </Page>
  );
}
