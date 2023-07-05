import { Listbox, Combobox, Icon, Avatar, Button } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import EmptyStateExample from "../EmptyStateExample";
import SkeletonExample from "../Skeleton";
import "./Style.css";

export default function SearchBar() {
  const fetch = useAuthenticatedFetch();
  const [options, setOptions] = useState();
  const [inputValue, setInputValue] = useState("");
  const [selectedAccount, setSelectedAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/Account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/Account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedAccount(data.filter((option) => option.selected));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (!options) {
        return;
      }

      if (value === "") {
        setOptions(options);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = options.filter((option) =>
        option.name.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [options]
  );

  const selectedOption = (option) => {
    const updatedOption = { ...option, selected: true };
    console.log("updatedOption", updatedOption);

    fetch(`/api/Account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
      },
      body: JSON.stringify(updatedOption),
    })
      .then((res) => {
        console.log("Data selected successfully");
        if (updatedOption.selected) {
          setSelectedAccount((prevSelectedAccount) => [
            ...prevSelectedAccount,
            updatedOption,
          ]);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const handleDelete = (_id) => {
    console.log(_id);
    fetch("/api/Select", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
      },

      body: JSON.stringify({ ids: [_id] }),
    })
      .then(() => {
        setSelectedAccount((prevSelectedAccount) =>
          prevSelectedAccount.filter((option) => option._id !== _id)
        );
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  return (
    <div>
      {isLoading ? (
        <SkeletonExample />
      ) : (
        <>
          <Combobox
            activator={
              <Combobox.TextField
                prefix={<Icon source={SearchMinor} />}
                onChange={updateText}
                label="Search tags"
                labelHidden
                value={inputValue}
                placeholder="Search tags"
                autoComplete="off"
              />
            }
          >
            <div className="Listbox">
              {options?.length > 0
                ? options?.map((option) => {
                    return (
                      <div>
                        <Listbox>
                          <Listbox.Option
                            key={option?._id}
                            value={option?.value}
                            selected={selectedAccount === selectedAccount?._id}
                            accessibilityLabel={option?.name}
                          >
                            <div
                              className="LISTBOXCLASS"
                              onClick={() => selectedOption(option)}
                            >
                              <Avatar
                                size="medium"
                                name={option?.name}
                                source={option?.url}
                              />
                              Account( Name: {option?.name} - Number:{" "}
                              {option?.phone} - Title: {option?.title})
                            </div>
                          </Listbox.Option>
                        </Listbox>
                      </div>
                    );
                  })
                : null}
            </div>
          </Combobox>

          {selectedAccount && selectedAccount?.length > 0 ? (
            <div>
              <div className="data">Selected Account:</div>
              <div className="Record">
                {selectedAccount?.map((option) => (
                  <div>
                    <div className="text">
                      <div className="chackbox"></div>
                      <div className="img">
                        <Avatar
                          size="medium"
                          name={option?.name}
                          source={option?.url}
                        />
                      </div>

                      <div className="text_2">
                        <div>{option?.name}</div>
                        <div>{option?.title}</div>
                      </div>
                      <div className="Button">
                        <Button onClick={() => handleDelete(option._id)}>
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyStateExample />
          )}
        </>
      )}
    </div>
  );
}
