import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
  Button,
  Icon,
} from "@shopify/polaris";
import { EmailMajor } from "@shopify/polaris-icons";
import React from "react";

export default function Supports() {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#3f5876",
                  }}
                >
                  <span
                    style={{
                      marginRight: "1rem",
                      backgroundColor: "#d7ede7",
                      padding: "7px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "7px",
                    }}
                  >
                    <Icon source={EmailMajor} color="success" />
                  </span>
                  <div>HOW CAN WE HELP YOU?</div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                By leaving your information, we can support you all the way.
              </div>
              <FormLayout>
                <TextField
                  type="storename"
                  label="Store URL:"
                  value="https://paractice2.myshopify.com"
                  onChange={() => {}}
                  autoComplete="off"
                  requiredIndicator
                />
                <TextField
                  label="Password (if your store is in development mode):"
                  onChange={() => {}}
                  autoComplete="off"
                />
                <TextField
                  label="Email Address:"
                  type="email"
                  value="umarkhan7672@gmail.com"
                  onChange={() => {}}
                  autoComplete="email"
                  requiredIndicator
                />
                <TextField
                  type="name"
                  label="Your Name:"
                  value="Muhammad Umar Khan"
                  onChange={() => {}}
                  autoComplete="off"
                />
                <TextField
                  type="message:"
                  label="Message"
                  onChange={() => {}}
                  placeholder="Leave your message"
                  maxHeight="210px"
                  autoComplete="off"
                  requiredIndicator
                />
                <Button primary>Send Email</Button>
              </FormLayout>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
