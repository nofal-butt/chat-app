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
import { useState, useCallback, useMemo } from "react";
import EmptyStateExample from "../EmptyStateExample";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  const handleSearchChange = (value) => {
    setSearchValue(value);
    // setSearchClicked(false);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const handleCheckboxChange = (option) => {
    const isSelected = selectedOptions.includes(option);
    let updatedSelectedOptions;

    if (isSelected) {
      updatedSelectedOptions = selectedOptions.filter(
        (item) => item !== option
      );
    } else {
      updatedSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelectedOptions);
  };

  const handleDeleteClick = () => {
    selectedOptions.forEach((option) => {
      // Perform delete operation for the option
      console.log(`Deleting ${option}`);
    });

    setSelectedOptions([]);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selectedItemCount = selectedOptions.length;
  console.log(selectedItemCount);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <div>
            <Select
              options={options.map((option) => ({
                label: option,
                value: option,
              }))}
              value={searchValue}
              onChange={handleSearchChange}
              onSelect={handleSearchClick}
            />
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                margin: "10px 10px 10px 10px",
              }}
            >
              Select Account:
            </div>

            {searchValue && filteredOptions.length > 0 ? (
              <div style={{ padding: "20px", fontSize: "1rem" }}>
                {selectedItemCount > 0 && !searchClicked && (
                  <div style={{ padding: "0px" }}>
                    <ButtonGroup segmented>
                      <Button>
                        <div style={{ display: "flex" }}>
                          <div style={{ margin: "-1px", paddingRight: "5px" }}>
                            <Checkbox
                              checked
                              label={
                                <>
                                  {selectedItemCount}
                                  {selectedItemCount > 1
                                    ? " Selected"
                                    : "Selected"}
                                  selected
                                </>
                              }
                              labelHidden
                              onChange={() => {}}
                            />
                          </div>
                          {selectedItemCount}
                          {selectedItemCount > 1 ? " items" : " Selected"}
                        </div>
                      </Button>
                      <Button onClick={handleDeleteClick}>
                        Remove Account
                      </Button>
                    </ButtonGroup>
                  </div>
                )}

                {searchValue && (
                  <div style={{ margin: "10px 10px 10px 10px " }}>
                    {filteredOptions.map((option) => (
                      <Checkbox
                        key={option}
                        checked={selectedOptions.includes(option)}
                        label={option}
                        onChange={() => handleCheckboxChange(option)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ height: "100%", width: "100%", marginTop: "10px" }}>
                <EmptyStateExample />
              </div>
            )}
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
