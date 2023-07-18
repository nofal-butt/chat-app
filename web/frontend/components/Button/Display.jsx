import { CalloutCard } from "@shopify/polaris";

export default function SelectExample() {
  return (
    <div>
      <CalloutCard
        title="Display WhatsApp button on Product Page"
        illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
        primaryAction={{
          content: "Go Customize Product Page",
          url: "https://admin.shopify.com/store/paractice2/themes/149555118373/editor",
          external: "true",
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
