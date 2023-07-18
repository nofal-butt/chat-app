import React, { useEffect } from "react";
import { ButtonGroup, Button, Collapsible } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import axios from "axios";

function General() {
  const fetch = useAuthenticatedFetch();
  const [isActive, setIsActive] = useState(true);
  const [active, setActive] = useState("Activate");

  useEffect(() => {
    axios
      .get("/api/setting/general")
      .then((res) => {
        const data = res.data.data;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = () => {
    setIsActive(!isActive);
    setActive(isActive ? "Deactivate" : "Activate");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const [desktopRecommended, setDesktopRecommended] = useState(true);
  const [desktopWhatsAppURL, setDesktopWhatsAppURL] = useState(
    "https://api.whatsapp.com"
  );

  const handleDesktopButton = (url) => {
    setDesktopWhatsAppURL(url);
    setDesktopRecommended(url === "https://api.whatsapp.com");
  };

  const [mobileRecommended, setMobileRecommended] = useState(true);
  const [mobileWhatsAppURL, setMobileWhatsAppURL] = useState(
    "https://api.whatsapp.com"
  );

  const handleMobileButton = (url) => {
    setMobileWhatsAppURL(url);
    setMobileRecommended(url === "https://api.whatsapp.com");
  };

  const [openButton, setOpenButton] = useState(false);

  const handleTabOpens = () => {
    setOpenButton(!openButton);
  };

  const handleSaveChanges = () => {
    const data = {
      target: isActive ? "_blank" : "",
      desktopURL: desktopRecommended
        ? "https://api.whatsapp.com"
        : "https://web.whatsapp.com",
      mobileURL: mobileRecommended
        ? "https://api.whatsapp.com"
        : "whatsapp://send",
    };

    axios
      .post("/api/setting/general", data)
      .then((res) => {
        console.log("Setting Saved Successfully:", res.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div style={{ boxSizing: "border-box" }}>
      <div style={{ display: "flex", fontSize: "14px" }}>
        <div style={{ padding: "2rem", width: "30%" }}>Google Analytics</div>
        <div style={{ margin: "1rem", width: "70%" }}>
          <div>
            <Button
              onClick={handleOpen}
              ariaExpanded={open}
              ariaControls="basic-collapsible"
              pressed={open}
            >
              {open ? "Deactivate" : "Activate"}
            </Button>
          </div>
          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            {open ? (
              <div>
                Gain insights of WhatsApp tracking in Google Analytics &gt;
                Behavior &gt; Events
              </div>
            ) : (
              <div>Google Analytics is disabled</div>
            )}
          </div>
          <Collapsible
            open={open}
            id="basic-collapsible"
            transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
            expandOnPrint
          >
            <Button
              onClick={handleTabOpens}
              ariaExpanded={openButton}
              ariaControls="basic-collapsible"
              pressed={openButton}
            >
              {openButton ? "Deactivate" : "Activate"}
            </Button>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <div>
                Please enable this feature if your website is using Google
                Analytics 4
              </div>
            </div>
          </Collapsible>
        </div>
      </div>

      <div style={{ display: "flex", fontSize: "14px" }}>
        <div style={{ padding: "2rem", width: "30%" }}>Open WhatsApp URL</div>
        <div style={{ padding: "1rem", width: "70%" }}>
          <ButtonGroup segmented>
            <Button onClick={handleToggle} pressed={isActive}>
              {active}
            </Button>
          </ButtonGroup>
          <div style={{ marginTop: "1rem" }}>
            {isActive ? (
              <div>Open URL in current tab</div>
            ) : (
              <div>Open URL in new tab</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", fontSize: "14px" }}>
        <div style={{ padding: "2rem", width: "30%" }}>URL for Desktop</div>
        <div style={{ padding: "1rem", width: "70%" }}>
          <ButtonGroup segmented>
            <Button
              onClick={() => handleDesktopButton("https://api.whatsapp.com")}
              pressed={desktopRecommended}
            >
              API
            </Button>
            <Button
              onClick={() => handleDesktopButton("https://web.whatsapp.com")}
              pressed={!desktopRecommended}
            >
              WEB
            </Button>
          </ButtonGroup>
          <div style={{ marginTop: "1rem" }}>
            <span>
              Open WhatsApp URL as
              <a
                href={desktopWhatsAppURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {desktopWhatsAppURL}
              </a>
              {desktopRecommended && <span>(Recommended)</span>}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: "14px",
        }}
      >
        <div style={{ padding: "2rem", width: "30%" }}>URL for Mobile</div>
        <div style={{ padding: "1rem", width: "70%" }}>
          <ButtonGroup segmented>
            <Button
              pressed={mobileRecommended}
              onClick={() => handleMobileButton("https://api.whatsapp.com")}
            >
              API
            </Button>
            <Button
              pressed={!mobileRecommended}
              onClick={() => handleMobileButton("whatsapp://send")}
            >
              Protocol
            </Button>
          </ButtonGroup>
          <div style={{ marginTop: "1rem" }}>
            <span>
              Open WhatsApp URL as &nbsp;
              <a href={mobileWhatsAppURL} target="_blank">
                {mobileWhatsAppURL}
              </a>
              &nbsp;{mobileRecommended && <span>(Recommended)</span>}
            </span>
          </div>
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <Button primary onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default General;
