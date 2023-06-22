import { Select, Checkbox, Button, Page, CalloutCard } from "@shopify/polaris";
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
    <div>
      <CalloutCard
        title="Display WhatsApp button on Product Page"
        illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
        primaryAction={{
          content: "Go Customize Product Page",
          url: "https://admin.shopify.com/store/paractice2/themes/149555118373/editor",
        }}
      >
        <p>
          Drag and drop the app block WhatsApp button to the product page to
          display
        </p>
      </CalloutCard>
    </div>
  );
}
