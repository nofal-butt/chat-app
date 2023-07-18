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
  const [data, setData] = useState({
    widget_text: "Start a Conversation.",
    widget_label_text: "Need Help? Chat with us.",
    description: "Hi! Click one of our member below to chat on WhatsApp.",
    sesponse_time_text: "The team typically replies in a few minutes.",
    privacy_policy:
      "Please accept our privacy policy first to start a conversation.",
    transition: "",
    message: "",
  });

  const handleTabOpen = () => {
    setOpen(!open);
  };

  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const handleChange = useCallback((value, name) => {
    setData((predata) => ({
      ...predata,
      [name]: value,
    }));
  });

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
              primary={!open}
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
                  multiline={2}
                  value="Start a Conversation"
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  multiline={2}
                  name="widget_text"
                  value={data.widget_text}
                  onChange={(value) => handleChange(value, "widget_text")}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  type="text"
                  multiline={2}
                  value="Hi! Click one of our members below to chat on WhatsApp"
                  onChange={(value) => handleChange(value, "StoreURL")}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  multiline={2}
                  name="description"
                  value={data.description}
                  onChange={(value) => handleChange(value, "description")}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  type="text"
                  multiline={2}
                  value="The team typically replies in a few minutes."
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  multiline={2}
                  name="sesponse_time_text"
                  value={data.sesponse_time_text}
                  onChange={(value) =>
                    handleChange(value, "sesponse_time_text")
                  }
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  type="text"
                  multiline={2}
                  value="Need Help? Chat with us"
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  multiline={2}
                  name="widget_label_text"
                  value={data.widget_label_text}
                  onChange={(value) => handleChange(value, "widget_label_text")}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  multiline={2}
                  type="text"
                  value="Please accept our privacy policy first to start a conversation."
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  multiline={2}
                  type="text"
                  name="privacy_policy"
                  value={data.privacy_policy}
                  onChange={(value) => handleChange(value, "privacy_policy")}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <div>Button Translation</div>
              <FormLayout.Group>
                <TextField
                  multiline={2}
                  type="text"
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  multiline={2}
                  name="transition"
                  value={data.transition}
                  onChange={(value) => handleChange(value, "transition")}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <div>Prefilled Message Translation</div>
              <FormLayout.Group>
                <TextField
                  type="text"
                  multiline={2}
                  onChange={() => {}}
                  disabled
                  autoComplete="off"
                />
                <TextField
                  type="text"
                  name="message"
                  multiline={2}
                  value={data.message}
                  onChange={(value) => handleChange(value, "message")}
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
