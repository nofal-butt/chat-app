import {
  CalloutCard,
  Page,
  DropZone,
  LegacyStack,
  TextField,
  Banner,
  List,
  Button,
  Collapsible,
} from "@shopify/polaris";
import React, { useEffect } from "react";
import axios from "axios";
import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import Empty_State from "./Account";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewAccount(props) {
  const fetch = useAuthenticatedFetch();
  const [showEmptyState, setShowEmptyState] = useState(false);
  const account = props.account;

  //------------------textfields---------------------

  const [data, setData] = useState({
    name: account?.name ? account?.name : "",
    phone: account?.phone ? account?.phone : "",
    title: account?.title ? account?.title : "",
    message: account?.message ? account?.message : "",
    toggle: account?.toggle ? account?.toggle : true,
    notice: account?.notice ? account?.notice : "I will be back soon",
    url: account?.url ? account?.url : "",
  });

  useEffect(() => {
    console.log(account);
    if (account !== undefined) {
      setShowCreate(false);
    }
  });

  const handleTextFieldChange = useCallback((value, name) => {
    if (name === "phone") {
      // Remove any non-numeric characters from the value
      value = value.replace(/\D/g, "");

      // Check if the value starts with a country code
      if (!value.startsWith("+")) {
        // If it doesn't start with '+', add the country code
        value = "+" + value;
      }

      // Truncate the value to 13 digits
      value = value.slice(0, 13);
    }

    setData((predata) => ({
      ...predata,
      [name]: value,
    }));
  });

  //-------------------toggle------------------------
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((open) => !open);
    setData((prevData) => ({
      ...prevData,
      toggle: !prevData.toggle,
    }));
  }, []);

  //------------------------images -------------------

  const [files, setFiles] = useState("");

  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;
  useEffect(() => {
    if (files) {
      console.log(files);
      uploadImageToCloudinary(files);
    }
    // console.log(data);
  }, [files]);

  const handleDrop = useCallback((files, acceptedFiles, rejectedFiles) => {
    setFiles(acceptedFiles[0]);
    setRejectedFiles(rejectedFiles);
  }, []);

  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  //-------------------cloudnary------------

  const uploadImageToCloudinary = async (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "mrjpohmn");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfy2gjqhv/image/upload",
        formData
      );
      const res = response.data;
      console.log(res);
      setData({ ...data, url: res.secure_url });
    } catch (error) {
      console.log(error);
    }
  };
  //---------------------post API ----------------------------
  const handleSubmit = () => {
    if (data.phone.length !== 13) {
      // Display an error or prevent form submission
      console.log("Phone number must be 13 digits.");
      toast.error("Phone number must be 13 digits", {
        // className: 'custom-toast',
        // style: {
        //   backgroundColor: 'purple',
        //   color: 'white',
        //   // Add any other custom styles you want
        // },
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000, // Duration in milliseconds
        hideProgressBar: false,
      });
      return;
    }
    if (!data.phone.startsWith("+")) {
      // If it doesn't start with '+', add the country code
      data.phone = "+" + data.phone;
    }
    // console.log(data);
    // setRedirectToOther(true);
    fetch("/api/Account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success("Successfully Account Create", {
          // className: 'custom-toast',
          // style: {
          //   backgroundColor: 'purple',
          //   color: 'white',
          //   // Add any other custom styles you want
          // },
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000, // Duration in milliseconds
          hideProgressBar: false,
        });
        console.log("Successfull data send");
        setShowEmptyState(true);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  //---------------------put API-----------------
  const handleSubmitUpdate = () => {
    if (data.phone.length !== 13) {
      // Display an error or prevent form submission
      // console.log("Phone number must be 13 digits.");
      toast.error("Phone number must be 13 digits", {
        // className: 'custom-toast',
        // style: {
        //   backgroundColor: 'purple',
        //   color: 'white',
        //   // Add any other custom styles you want
        // },
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000, // Duration in milliseconds
        hideProgressBar: false,
      });
      return;
    }
    if (!data.phone.startsWith("+")) {
      // If it doesn't start with '+', add the country code
      data.phone = "+" + data.phone;
    }
    fetch(`/api/Account/${props.account._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating data");
        }
        toast.success("Data updated successfully", {
          // className: 'custom-toast',
          // style: {
          //   backgroundColor: 'purple',
          //   color: 'white',
          //   // Add any other custom styles you want
          // },
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000, // Duration in milliseconds
          hideProgressBar: false,
        });
        console.log("Data updated successfully");
        setShowEmptyState(true);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const handleSubmitBack = () => {
    setShowEmptyState(true);
  };

  ///--------------------------------------------
  const [showCreate, setShowCreate] = useState(true);

  const AccountBtn = showCreate
    ? {
        content: "Create Account",
        onAction: handleSubmit,
      }
    : {
        content: "Update Account",
        onAction: handleSubmitUpdate,
      };

  return (
    <div>
      <ToastContainer />
      {showEmptyState ? (
        <Empty_State />
      ) : (
        <>
          <Page
            backAction={{
              onAction: handleSubmitBack,
            }}
            title={showCreate ? "Add New Account" : "Edit account"}
          ></Page>
          <div style={{ margin: "20px" }}>
            <CalloutCard title="Account Information" primaryAction={AccountBtn}>
              {/* ------------images----------- */}
              <LegacyStack vertical>
                {errorMessage}
                {data?.url ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={data?.url}
                      alt={files.name}
                      srcSet=""
                      style={{ width: "100px", height: "100px" }}
                    />
                    <Button
                      plain
                      destructive
                      onClick={() => {
                        setData({ ...data, url: "" });
                      }}
                    >
                      Remove Images
                    </Button>
                  </div>
                ) : (
                  <DropZone
                    accept="image/*"
                    type="image"
                    onDrop={handleDrop}
                    label="Account Avatar"
                  >
                    <DropZone.FileUpload
                      actionTitle="Add Image"
                      actionHint="or drop to upload"
                    />
                  </DropZone>
                )}
              </LegacyStack>
              {/* --------texxtfield--------- */}
              <TextField
                label="Account Name"
                type="text"
                value={data?.name}
                onChange={(value) => handleTextFieldChange(value, "name")}
                placeholder="Alexa"
                autoComplete="text"
              />
              <TextField
                label="Phone number, group invite link, or WhatsApp Business short link"
                type="tel"
                value={data?.phone}
                onChange={(value) => handleTextFieldChange(value, "phone")}
                placeholder="Your phone number ,or WhatsApp link..."
                helpText="Fill in WhatsApp phone number in the international format. Eg: +923104988753."
                autoComplete="off"
                error={data?.phone && data.phone.length !== 13}
                errorText="Phone number must be 13 digits."
              />
              <TextField
                label="Title"
                type="text"
                value={data?.title}
                placeholder="Customer Service"
                onChange={(value) => handleTextFieldChange(value, "title")}
                autoComplete="off"
              />
              <TextField
                label="Prefilled message"
                type="text"
                value={data?.message}
                placeholder="Hello..! Do you have anh deals for [sgwa-page-title] at [sgwa-page-url"
                onChange={(value) => handleTextFieldChange(value, "message")}
                helpText="Use [sgwa_page_title] and [sgwa_page_url] shortcodes to output the page's title and URL respectively."
              />
              {/* --------------toggle----------------- */}
              Always available online{" "}
              <Button
                onClick={handleToggle}
                ariaExpanded={open}
                ariaControls="basic-collapsible"
                pressed={open === false}
              >
                Online
              </Button>
              <Collapsible
                open={open}
                id="basic-collapsible"
                transition={{
                  duration: "500ms",
                  timingFunction: "ease-in-out",
                }}
                expandOnPrint
              >
                <TextField
                  label="Unavailable Notice"
                  type="text"
                  value={data?.notice}
                  onChange={(value) => handleTextFieldChange(value, "notice")}
                  helpText="You can use this text to display on days this account does not work."
                />
              </Collapsible>
            </CalloutCard>
          </div>
        </>
      )}
    </div>
  );
}
export default NewAccount;
