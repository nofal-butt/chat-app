import { EmptyState } from "@shopify/polaris";
import React from "react";

export default function EmptyStateExample() {
  return (
    <EmptyState
      heading="Upload a file to get started"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      fullWidth
    />
  );
}
