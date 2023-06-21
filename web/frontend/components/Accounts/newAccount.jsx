import {
  LegacyCard,
  EmptyState,
  Page,
  IndexTable,
  useIndexResourceState,
  Avatar,
  Badge,
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";

function Empty_State({ onAction }) {
  const fetch = useAuthenticatedFetch();
  const [items, setItems] = useState();

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
        console.log(data);
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const resourceName = {
    singular: "item",
    plural: "items",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(items);

  const rowMarkup = items?.map(
    ({ id, name, url, phone, title, toggle }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{name}</IndexTable.Cell>
        <IndexTable.Cell>{<Avatar customer source={url} />}</IndexTable.Cell>
        <IndexTable.Cell>{phone}</IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>
          {!toggle ? (
            <Badge status="success">online</Badge>
          ) : (
            <Badge>Offline</Badge>
          )}
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  const handleAddNewAccount = () => {
    onAction();
  };

  return (
    <>
      <Page
        title="Accounts"
        primaryAction={{
          content: "Add New Account",
          onAction: handleAddNewAccount,
        }}
      >
        {!items || items.length === 0 ? (
          <LegacyCard sectioned>
            <EmptyState
              action={{
                content: "Create New Account",
                onAction: handleAddNewAccount,
              }}
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              fullWidth
            >
              <p>No Account</p>
            </EmptyState>
          </LegacyCard>
        ) : (
          <LegacyCard>
            <IndexTable
              resourceName={resourceName}
              itemCount={items.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "Account Name" },
                { title: "Avatar" },
                { title: "Number" },
                { title: "Title" },
                { title: "Actives Days" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
        )}
      </Page>
    </>
  );
}
export default Empty_State;
