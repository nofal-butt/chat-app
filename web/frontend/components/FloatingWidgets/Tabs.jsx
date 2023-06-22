import { LegacyCard, LegacyTabs, Page } from "@shopify/polaris";
import { useState, useCallback } from "react";
import Display from "./Display";
import SearchBar from "./SearchBar";

function Tab() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
  }, []);

  const tabs = [
    {
      id: "select-account",
      content: "Select Account",
      accessibilityLabel: "Select Account",
      panelID: "select-account-content",
      components: <SearchBar key="searchbar" />,
    },
    {
      id: "display",
      content: "Display",
      accessibilityLabel: "Display",
      panelID: "display-content",
      components: <Display key="select" />,
    },
  ];

  const selectedTab = tabs[selected];

  return (
    <Page title="Floating Widget">
      <div style={{ width: "100%", height: "100%" }}>
        <LegacyCard>
          <LegacyTabs
            tabs={tabs}
            selected={selected}
            onSelect={handleTabChange}
            disclosureText="More views"
          >
            <LegacyCard.Section key={selectedTab.id} hidden={false}>
              {selectedTab.components}
            </LegacyCard.Section>
          </LegacyTabs>
        </LegacyCard>
      </div>
    </Page>
  );
}

export default Tab;
