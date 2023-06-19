import { LegacyCard, EmptyState, Page } from '@shopify/polaris';
import React from 'react';
import Account from './newAccount';

function Empty_State({ onAction }) {
    const handleAddNewAccount = () => {
        onAction();
    };

    return (
        <>
            <Page
                title="Accounts"
                primaryAction={{
                    content: 'Add New Account',
                    onAction: handleAddNewAccount,
                }}

            />
            <LegacyCard sectioned>

                <EmptyState
                    action={{
                        content: 'Create New Account',
                        onAction: handleAddNewAccount,
                    }}
                    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    fullWidth
                >
                    <p>
                        No Account
                    </p>
                </EmptyState>
            </LegacyCard>
        </>
    );

}
export default Empty_State