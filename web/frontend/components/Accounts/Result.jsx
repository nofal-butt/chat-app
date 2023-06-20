import {
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Text,
    Badge,
} from '@shopify/polaris';
import React, { useState, useEffect } from 'react';
import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';

function Result() {
    const fetch = useAuthenticatedFetch()
    const [items, setItems] = useState()
    useEffect(() => {
        fetch("/api/Account", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Accept-Encoding": "gzip,deflate,compress",
            }
        }).then(res => res.json()
        ).then((data) => {
            console.log(data)
            setItems(data)
        }).catch((err) => {
            console.log(err)
        })


    }, [])
    const resourceName = {
        singular: 'items',
        plural: 'items',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(items);

    const rowMarkup = items?.map(
        (
            { id, name, url, phone, title, notice },
            index,
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell> {url}</IndexTable.Cell>
                <IndexTable.Cell>{phone}</IndexTable.Cell>
                <IndexTable.Cell>{title}</IndexTable.Cell>
                <IndexTable.Cell>{notice}</IndexTable.Cell>
                {/* <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell> */}
            </IndexTable.Row>
        ),
    );

    return (
        <LegacyCard>
            <IndexTable
                resourceName={resourceName}
                itemCount={items?.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: 'Account Name' },
                    { title: 'Avatar' },
                    { title: 'Number' },
                    { title: 'Title' },
                    { title: 'Active Days ' },
                    // { title: 'Fulfillment status' },
                ]}
            >
                {rowMarkup}
            </IndexTable>
        </LegacyCard>
    );
}
export default Result