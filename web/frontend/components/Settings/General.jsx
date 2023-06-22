import React from "react";
import { ButtonGroup, Button, Collapsible } from "@shopify/polaris";
import { useState, useCallback } from "react";

function General() {
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

  const [openURL, setOpenURL] = useState(true);
  const [openWhatsAppURL, setopenWhatsAppURL] = useState(
    "Open URL in current tab"
  );

  const handleTabButton = (url) => {
    setopenWhatsAppURL(url);
    setOpenURL(url === "Open URL in current tab");
  };

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("Google Analytics is disabled");
  const handleTabOpen = () => {
    if (open) {
      setText("Google Analytics is disabled");
    } else {
      setText(
        "Gain insights of WhatsApp tracking in Google Analytics > Behavior > Events"
      );
    }
    setOpen(!open);
  };

  const [openButton, setOpenButton] = useState(false);
  const [texts, setTexts] = useState(
    "Please enable this feature if your website is using Google Analytics 4"
  );
  const handleTabOpens = () => {
    if (openButton) {
      setTexts(
        "Please enable this feature if your website is using Google Analytics 4"
      );
    }
    setOpenButton(!openButton);
  };

  return (
    <div style={{ boxSizing: "border-box" }}>
      <div
        style={{
          display: "flex",
          fontSize: "14px",
        }}
      >
        <div style={{ padding: "2rem", width: "30%" }}>Google Analytics</div>
        <div style={{ margin: "1rem", width: "70%" }}>
          <div>
            <Button
              onClick={handleTabOpen}
              ariaExpanded={open}
              ariaControls="basic-collapsible"
              pressed={open}
            >
              {open ? "Deactivate" : "Activate"}
            </Button>
          </div>
          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <p>{text}</p>
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
              <p>{texts}</p>
            </div>
          </Collapsible>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: "14px",
        }}
      >
        <div style={{ padding: "2rem", width: "30%" }}>Open WhatsApp URL</div>
        <div style={{ padding: "1rem", width: "70%" }}>
          <ButtonGroup segmented>
            <Button
              pressed={openURL === true}
              onClick={() => handleTabButton("Open URL in current tab")}
            >
              Deactivate
            </Button>
            <Button
              pressed={openURL === false}
              onClick={() => handleTabButton("Open URL in new tab")}
            >
              Activate
            </Button>
          </ButtonGroup>
          <div style={{ marginTop: "1rem" }}>{openWhatsAppURL}</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: "14px",
        }}
      >
        <div style={{ padding: "2rem", width: "30%" }}>URL for Desktop</div>
        <div style={{ padding: "1rem", width: "70%" }}>
          <ButtonGroup segmented>
            <Button
              pressed={desktopRecommended === true}
              onClick={() => handleDesktopButton("https://api.whatsapp.com")}
            >
              API
            </Button>
            <Button
              pressed={desktopRecommended === false}
              onClick={() => handleDesktopButton("https://web.whatsapp.com")}
            >
              WEB
            </Button>
          </ButtonGroup>
          <div style={{ marginTop: "1rem" }}>
            <span>
              Open WhatsApp URL as &nbsp;
              <a href={desktopWhatsAppURL} target="_blank">
                {desktopWhatsAppURL}
              </a>
              &nbsp;{desktopRecommended && <span>(Recommended)</span>}
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
              pressed={mobileRecommended === true}
              onClick={() => handleMobileButton("https://api.whatsapp.com")}
            >
              API
            </Button>
            <Button
              pressed={mobileRecommended === false}
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
        <Button primary>Save Changes</Button>
      </div>
    </div>
  );
}

export default General;
