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
import NewAccount from "./newAccount"
import { FaWhatsapp } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Account() {
  const fetch = useAuthenticatedFetch();
  const [items, setItems] = useState();
  const [Account, setAccount] = useState(true)
  const [updateState, setUpdateState] = useState(null)
  const handleAddNewAccount = () => {

    setAccount(!Account)
  };
  // const [isloading, setisloading] = useState(true);

  useEffect(() => {

    GETdata()

  }, []);
  const GETdata = () => {
    fetch("/api/Account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }



  const resourceName = {
    singular: "item",
    plural: "items",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange, } =
    useIndexResourceState(items, { resourceIDResolver: (item) => item._id });


  // const allResourcesSelected = selectedResources?.length === items?.length && items?.length > 0;

  //----------------update account ------------


  const updateAccount = (account) => {
    // console.log(_id)
    setUpdateState(account)
    setAccount(!Account)
  }


  const rowMarkup = items?.map(
    (account, index) => (
      <IndexTable.Row
        onClick={() => updateAccount(account)}
        key={account?._id}
        id={account?._id}
        selected={selectedResources.includes(account?._id)}
        position={index}
      >
        <IndexTable.Cell >{account?.name}</IndexTable.Cell>

        {account?.url ? (<IndexTable.Cell>{<Avatar customer source={account?.url} />}</IndexTable.Cell>) : (<IndexTable.Cell>{<FaWhatsapp className="whatsapp-icon" size={40} color="#25D366" />}</IndexTable.Cell>
        )}

        <IndexTable.Cell>{account?.phone}</IndexTable.Cell>
        <IndexTable.Cell>{account?.title}</IndexTable.Cell>
        <IndexTable.Cell>
          {account?.toggle ? (
            <Badge status="success">online</Badge>
          ) : (
            <Badge>Offline</Badge>
          )}
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );


  const handleDelete = () => {
    console.log(selectedResources)
    fetch("/api/delete", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Accept-Encoding": "gzip,deflate,compress",
      }, body: JSON.stringify(selectedResources)
    }).then((res) => {
      toast.success('Account  Delete successfully', {
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
      // console.log(res)
      GETdata()
    }
    ).catch((err) => {
      console.log(err, "error")
    })

  };



  return (
    <>
      <ToastContainer />
      {
        Account ?
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

                  promotedBulkActions={[
                    {
                      content: "Delete",
                      onAction: handleDelete
                    }
                  ]}
                >
                  {rowMarkup}
                </IndexTable>
              </LegacyCard>

            )}
          </Page>
          :
          (
            updateState !== null ? <NewAccount account={updateState} /> : <NewAccount />
          )
      }
    </>
  );
}
export default Account;
