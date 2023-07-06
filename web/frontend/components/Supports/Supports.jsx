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
import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";

export default function Supports() {
  const fetch = useAuthenticatedFetch();

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


  const handleSubmit = () => {

    console.log(data);
    // setRedirectToOther(true);
    // fetch("/api/Account", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "Accept-Encoding": "gzip,deflate,compress",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(() => {
    //     toast.success('Successfully Account Create', {
    //       // className: 'custom-toast',
    //       // style: {
    //       //   backgroundColor: 'purple',
    //       //   color: 'white',
    //       //   // Add any other custom styles you want
    //       // },
    //       position: toast.POSITION.BOTTOM_CENTER,
    //       autoClose: 3000, // Duration in milliseconds
    //       hideProgressBar: false,
    //     });
    //     console.log("Successfull data send");
    //     setShowEmptyState(true);
    //   })
    //   .catch((err) => {
    //     console.log(err, "error");
    //   });


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
              <FormLayout>
                <TextField
                  type="url"
                  label="Store URL:"
                  value={data.StoreURL}
                  onChange={(value) => handleTextFieldChange(value, "StoreURL")}
                  autoComplete="off"
                  requiredIndicator
                />
                <TextField
                  label="Password (if your store is in development mode):"
                  type="password"
                  value={data.password}
                  onChange={(value) => handleTextFieldChange(value, "password")}
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
                  onChange={(value) => handleTextFieldChange(value, "Message")}
                  placeholder="Leave your message"
                  multiline={5}
                  autoComplete="off"
                  requiredIndicator
                />
                <Button primary onClick={handleSubmit}>Send Email</Button>
              </FormLayout>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
