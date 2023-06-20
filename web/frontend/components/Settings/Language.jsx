import React from "react";
import {
  ButtonGroup,
  Button,
  Collapsible,
  FormLayout,
  TextField,
  Select,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

function Language() {
  const [open, setOpen] = useState(false);
  const [customText, setCustomText] = useState("Start a Conversation");

  const handleTabOpen = () => {
    setOpen(!open);
  };

  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const handleCustomTextChange = (value) => {
    setCustomText(value);
  };

  const options = [{ label: "Translate for", value: "translate" }];

  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "1rem" }}>Translate widget and button text</div>
          <div style={{ margin: "0.6rem" }}>
            <Button
              onClick={handleTabOpen}
              ariaExpanded={open}
              ariaControls="basic-collapsible"
              pressed={open}
            >
              {open ? "OFF" : "ON"}
            </Button>
          </div>
        </div>
        <div style={{ margin: "1rem" }}>
          <Collapsible
            open={open}
            id="basic-collapsible"
            transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
            expandOnPrint
          >
            <FormLayout>
              <FormLayout.Group>
                <div>English content</div>
                <Select
                  options={options}
                  onChange={handleSelectChange}
                  value={selected}
                />
              </FormLayout.Group>
              <div>Widget Translation</div>
              <FormLayout.Group>
                <TextField
                  type="text"
                  value="Start a Conversation"
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  name="conversation"
                  value={customText}
                  onChange={handleCustomTextChange}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  type="text"
                  value="Hi! Click one of our members below to chat on WhatsApp"
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  name="members"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  type="text"
                  value="The team typically replies in a few minutes."
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  name="time"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  type="text"
                  value="Need Help? Chat with us"
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  name="help"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  type="text"
                  value="Please accept our privacy policy first to start a conversation."
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  name="privacy"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <div>Button Translation</div>
              <FormLayout.Group>
                <TextField
                  type="text"
                  value="Need Help? Chat with us"
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  name="chat"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <div>Prefilled Message Translation</div>
              <FormLayout.Group>
                <TextField
                  type="text"
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  name="empty"
                  onChange={() => {}}
                  autoComplete="off"
                />
              </FormLayout.Group>
            </FormLayout>
          </Collapsible>
        </div>

        <div style={{ marginLeft: "1rem" }}>
          <Button primary>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export default Language;
