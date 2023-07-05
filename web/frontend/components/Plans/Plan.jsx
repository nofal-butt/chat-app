import {
  Page,
  Layout,
  LegacyCard,
  Button,
  Icon,
  Badge,
} from "@shopify/polaris";
import { CircleTickMajor, CancelMajor } from "@shopify/polaris-icons";
import React from "react";

export default function Plan() {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
      }}
    >
      <Page
        title="CHOOSE THE PLAN THAT WORKS BEST FOR YOU"
        subtitle="You can cancel, downgrade, or switch plans anytime without any charges (14-day free trial)"
        fullWidth
      >
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #e9e9e9",
                    fontSize: "1rem",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    PLANS & FEATURES
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    FREE<Badge>Fulfilled</Badge>
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>PRO</div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>Pricing</div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Badge>Free</Badge>
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Badge>$6.9/mo</Badge>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    Trial 14 days
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Button>Current Plan</Button>
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Button primary>Start free trail</Button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    WhatsApp floating widget
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    Customize text
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    Show/hide widget on specific pages
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    Multiple agents
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    Prefilled messages
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    One-click to jump to WhatsApp
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    WhatsApp button on product page
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    Custom working hours
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CancelMajor} color="critical" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}>
                    Auto-hide offline agents
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CancelMajor} color="critical" />
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Icon source={CircleTickMajor} color="primary" />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    borderBottom: "1px solid #e9e9e9",
                    textTransform: "uppercase",
                  }}
                >
                  <div style={{ padding: "2rem", width: "100%" }}></div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Button>Current Plan</Button>
                  </div>
                  <div style={{ padding: "2rem", width: "100%" }}>
                    <Button primary>Choose Plan</Button>
                  </div>
                </div>
              </div>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
