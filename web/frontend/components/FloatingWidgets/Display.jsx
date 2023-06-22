import { Select, Checkbox, Button, Page } from "@shopify/polaris";
import { useState, useCallback } from "react";

export default function SelectExample() {
  const [selected, setSelected] = useState("show-on-all-pages");
  const [showOnPages, setShowOnPages] = useState([]);
  const [hideOnPages, setHideOnPages] = useState([]);

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const handleCheckboxChange = useCallback(
    (checked, page, isHideOption) => {
      if (checked) {
        if (isHideOption) {
          setHideOnPages([...hideOnPages, page]);
        } else {
          setShowOnPages([...showOnPages, page]);
        }
      } else {
        if (isHideOption) {
          setHideOnPages(hideOnPages.filter((prevPage) => prevPage !== page));
        } else {
          setShowOnPages(showOnPages.filter((prevPage) => prevPage !== page));
        }
      }
    },
    [showOnPages, hideOnPages]
  );

  const handleSaveChanges = useCallback(() => {
    // Perform the save changes logic here
    console.log("Show on pages:", showOnPages);
    console.log("Hide on pages:", hideOnPages);
  }, [showOnPages, hideOnPages]);

  const options = [
    { label: "Show on all pages", value: "show-on-all-pages" },
    { label: "Show on these pages ...", value: "show-on-specific-pages" },
    { label: "Hide on these pages ...", value: "hide-on-specific-pages" },
  ];

  const pages = [
    "Homepage",
    "Collection",
    "Product",
    "Cart",
    "Blog posts",
    "Contact",
  ];

  const showOnCheckboxes = pages.map((page) => (
    <Checkbox
      key={page}
      label={page}
      checked={showOnPages.includes(page)}
      onChange={(checked) => handleCheckboxChange(checked, page, false)}
    />
  ));

  const hideOnCheckboxes = pages.map((page) => (
    <Checkbox
      key={page}
      label={page}
      checked={hideOnPages.includes(page)}
      onChange={(checked) => handleCheckboxChange(checked, page, true)}
    />
  ));

  return (
    <Page>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div
          style={{
            margin: "10px 200px 10px 0px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Display
        </div>
        <div>
          <Select
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
          <div style={{ textAlign: "center" }}>
            {selected === "show-on-specific-pages" && (
              <div
                style={{
                  margin: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {showOnCheckboxes}
              </div>
            )}
            {selected === "hide-on-specific-pages" && (
              <div
                style={{
                  margin: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {hideOnCheckboxes}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Button primary onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </Page>
  );
}
