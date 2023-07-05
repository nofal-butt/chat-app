import { Page, Button, LegacyCard } from "@shopify/polaris";
import React from "react";
import Tab from "./Tab";

export default function Settings() {
  return (
    <Page title="Settings">
      <LegacyCard sectioned>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginTop: "5px" }}>
            This app is activated. If you want to uninstall this app, please
            click the Deactivate button first.
          </p>
          <div style={{ marginLeft: "20px" }}>
            <Button>Deactivate</Button>
          </div>
        </div>
      </LegacyCard>
      <Tab />
    </Page>
  );
}
