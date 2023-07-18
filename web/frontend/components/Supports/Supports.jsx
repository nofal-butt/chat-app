import {
  Page,
  Layout,
  LegacyCard,
  Form,
  FormLayout,
  TextField,
  Button,
  Icon,
} from "@shopify/polaris";
import { EmailMajor } from "@shopify/polaris-icons";
import React, { useRef } from "react";
import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import emailjs from "@emailjs/browser";

export default function Supports() {
  const fetch = useAuthenticatedFetch();
  const form = useRef();

  const [data, setData] = useState({
    StoreURL: "",
    name: "",
    email: "",
    Message: "",
    password: "",
  });

  const handleTextFieldChange = useCallback((value, name) => {
    setData((predata) => ({
      ...predata,
      [name]: value,
    }));
  });

  const Temp_data = {
    name: data.name,
    email: data.email,
    message: data.Message,
  };

  const handleSubmit = () => {
    emailjs
      .send(
        "service_yjcqrtu",
        "template_qbh91vo",
        // form.current,
        Temp_data,
        "eW7l2ESazG1rYh2VL"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response);
      })
      .catch((error) => {
        console.log("FAILED...", error);
      });
  };

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
              <Form ref={form} onSubmit={handleSubmit}>
                <FormLayout>
                  <TextField
                    type="url"
                    label="Store URL:"
                    value={data.StoreURL}
                    onChange={(value) =>
                      handleTextFieldChange(value, "StoreURL")
                    }
                    autoComplete="off"
                    requiredIndicator
                  />
                  <TextField
                    label="Password (if your store is in development mode):"
                    type="password"
                    value={data.password}
                    onChange={(value) =>
                      handleTextFieldChange(value, "password")
                    }
                    autoComplete="off"
                  />
                  <TextField
                    label="Email Address:"
                    type="email"
                    value={data.email}
                    onChange={(value) => handleTextFieldChange(value, "email")}
                    autoComplete="email"
                    requiredIndicator
                  />
                  <TextField
                    type="text"
                    label="Your Name:"
                    value={data.name}
                    onChange={(value) => handleTextFieldChange(value, "name")}
                    autoComplete="off"
                  />
                  <TextField
                    type="text"
                    label="Message"
                    value={data.Message}
                    onChange={(value) =>
                      handleTextFieldChange(value, "Message")
                    }
                    placeholder="Leave your message"
                    multiline={5}
                    autoComplete="off"
                    requiredIndicator
                  />
                  <Button primary submit>
                    Send Email
                  </Button>
                </FormLayout>
              </Form>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
