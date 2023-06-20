import {
  Page,
  Layout,
  Combobox,
  ButtonGroup,
  Button,
  Checkbox,
  Listbox,
  Icon,
  Select,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useState, useCallback, useMemo } from "react";
import EmptyStateExample from "../EmptyStateExample";

export default function SearchBar() {
  const [account, setAccount] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const deselectedOptions = useMemo(
    () => [
      { value: "rustic", label: "Rustic" },
      { value: "antique", label: "Antique" },
      { value: "vinyl", label: "Vinyl" },
      { value: "vintage", label: "Vintage" },
      { value: "refurbished", label: "Refurbished" },
    ],
    []
  );

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) =>
        option.value.match(selected)
      );

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || "");
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        matchedOption,
      ]);
      setAccount(true); // Show the delete button
    },
    [options]
  );

  const removeSelectedOption = useCallback((option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
    );
  }, []);

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  //   const handleCheckboxChange = useCallback(() => {
  //     if (account) {
  //       setAccount(false);
  //       setShowDeleteButton(true);
  //     } else {
  //       setAccount(true);
  //       setShowDeleteButton(false);
  //     }
  //     setAccount(false);
  //     setShowDeleteButton((prevShowDeleteButton) => !prevShowDeleteButton);
  //   }, [account]);
  const handleCheckboxChange = useCallback(() => {
    setAccount(!account);
    setShowDeleteButton(!showDeleteButton);
  }, [account, showDeleteButton]);

  const handleDeleteClick = useCallback(() => {
    // Perform the delete operation here
    // ...
    // After deleting, you can clear the selected options and hide the delete button
    setSelectedOptions([]);
    setShowDeleteButton(false);
  }, []);

  const selectedItemCount = selectedOptions.length;

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Combobox
            activator={
              <Combobox.TextField
                prefix={<Icon source={SearchMinor} />}
                onChange={updateText}
                label="Enter name or title to search accounts"
                labelHidden
                value={inputValue}
                placeholder="Search tags"
                autoComplete="off"
              />
            }
            options={options}
            selected={selectedOption}
            onSelect={updateSelection}
          >
            {options.length > 0 ? (
              <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
            ) : null}
          </Combobox>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              margin: "10px 10px 10px 10px",
            }}
          >
            Selected Accounts:
          </div>

          <div
            style={{
              margin: "10px",
            }}
          >
            {selectedOptions.length > 0 && (
              <div
                style={{
                  padding: "0px",
                }}
              >
                <div
                  style={
                    {
                      // marginBottom: "20px",
                    }
                  }
                >
                  {account ? (
                    <div style={{ display: "flex", cursor: "pointer" }}>
                      <Checkbox onChange={handleCheckboxChange} />
                      <div
                        style={{
                          margin: "3px",
                          fontSize: "1rem",
                        }}
                      >
                        Showing {selectedItemCount} Account
                      </div>
                    </div>
                  ) : (
                    showDeleteButton && (
                      <ButtonGroup segmented>
                        <Button>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{ margin: "-2px", paddingRight: "5px" }}
                            >
                              <Checkbox
                                checked
                                label={
                                  <>
                                    {selectedItemCount}{" "}
                                    {selectedItemCount > 1
                                      ? "Selected"
                                      : "Selected"}
                                  </>
                                }
                                labelHidden
                                onChange={() => {}}
                              />
                            </div>
                            {selectedItemCount}
                            {selectedItemCount > 1 ? "items" : " Selected"}
                          </div>
                        </Button>
                        <Button onClick={handleDeleteClick}>
                          Remove Account
                        </Button>
                      </ButtonGroup>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              margin: "10px",
              fontSize: "1rem",
            }}
          >
            {selectedOptions.map((option) => (
              <div
                key={option.value}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Checkbox
                  key={option}
                  //   checked
                  label={option.label}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
          </div>

          {selectedOptions.length === 0 && (
            <div style={{ marginTop: "10px" }}>
              <EmptyStateExample />
            </div>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
