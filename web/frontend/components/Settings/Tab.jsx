import { LegacyCard, LegacyTabs, Page } from "@shopify/polaris";
import { useState, useCallback } from "react";
import General from "./General";
import Language from "./Language";

function Tab() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
  }, []);

  const tabs = [
    {
      id: "general",
      content: "General",
      accessibilityLabel: "General",
      panelID: "general-content",
      components: <General />,
    },
    {
      id: "multi-language",
      content: "Multi Language",
      accessibilityLabel: "Multi Language",
      panelID: "multi-language-content",
      components: <Language />,
    },
  ];

  const selectedTab = tabs[selected];

  return (
    <div style={{ width: "100%", height: "100%", marginTop: "1rem" }}>
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
  );
}

export default Tab;
