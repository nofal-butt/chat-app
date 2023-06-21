import {
    IndexTable,
    LegacyCard,
    Link,
    useIndexResourceState,
    Text,
    Avatar,
    Badge
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
    const customers = [
        {
            id: '3411',
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            orders: 20,
            amountSpent: '$2,400',
        },
        {
            id: '2561',
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            orders: 30,
            amountSpent: '$140',
        },
    ];
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(customers);

    const rowMarkup = items?.map(
        ({ id, name, url, phone, title, notice, toggle }, index) => (

            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    {/* <Link
                        dataPrimaryLink
                        url={url}
                        onClick={() => console.log(`Clicked ${name}`)}
                    > */}
                    {name}
                    {/* </Link> */}
                </IndexTable.Cell>
                <IndexTable.Cell>{<Avatar customer source={url} />}</IndexTable.Cell>
                <IndexTable.Cell>{phone}</IndexTable.Cell>
                <IndexTable.Cell>{title}</IndexTable.Cell>
                <IndexTable.Cell>{

                    !toggle ? <Badge status="success">online</Badge> : <Badge>Offline</Badge>

                }</IndexTable.Cell>

            </IndexTable.Row>
        ),
    );

    return (
        <LegacyCard>
            <IndexTable
                resourceName={resourceName}
                itemCount={customers.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: 'Account Name' },
                    { title: 'Avatar' },
                    { title: 'Number' },
                    { title: 'Title' },
                    { title: 'Actives Days' },
                    // {
                    //     id: 'order-count',
                    //     title: (
                    //         <Text as="span" alignment="end">
                    //             Order count
                    //         </Text>
                    //     ),
                    // },
                    // {
                    //     id: 'amount-spent',
                    //     hidden: false,
                    //     title: (
                    //         <Text as="span" alignment="end">
                    //             Amount spent
                    //         </Text>
                    //     ),
                    // },
                ]}
            >
                {rowMarkup}
            </IndexTable>
        </LegacyCard>
    );
}
export default Result