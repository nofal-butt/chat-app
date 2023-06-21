import {

    AppProvider,
    LegacyCard,
    Frame,
    Layout,
    Page,
    Navigation,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    TextContainer,
} from '@shopify/polaris';
import { SettingsMajor, ProfileMinor, EmailMajor, ButtonMinor, BuyButtonVerticalLayoutMajor } from '@shopify/polaris-icons';
import { useState, useCallback, } from 'react';
import Empty_State from "./emptyState"
import Account from "./newAccount"

function Navbar() {

    const [isLoading, setIsLoading] = useState(false);
    const toggleIsLoading = useCallback(
        () => setIsLoading((isLoading) => !isLoading),
        [],
    );
    // const account = <Empty_State onAction={handleNavigationAction} />;
    const handleNavigationAction = () => {
        setNavigationContent(<Account />);
    };
    // const newAccount = <Account />;



    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section

                items={[
                    {
                        label: 'Accounts',
                        icon: ProfileMinor,
                        onClick: () => setNavigationContent(<Empty_State onAction={handleNavigationAction} />),

                    },
                    {
                        url: '#',
                        excludePaths: ['#'],
                        label: 'Floating Widget',
                        icon: BuyButtonVerticalLayoutMajor,
                        // onClick: () => setNavigationContent(FloatingWidget),

                    },
                    {
                        url: '#',
                        excludePaths: ['#'],
                        label: 'Button',
                        icon: ButtonMinor,
                        // onClick: toggleIsLoading,

                    },
                    {
                        url: '#',
                        excludePaths: ['#'],
                        label: 'Settings',
                        icon: SettingsMajor,
                        // onClick: toggleIsLoading,


                    }, {
                        url: '#',
                        excludePaths: ['#'],
                        label: 'Supports',
                        icon: EmailMajor,
                        // onClick: toggleIsLoading,

                    },

                ]}
            />
        </Navigation>
    );
    const loadingPageMarkup = (
        <SkeletonPage>
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        <TextContainer>
                            <SkeletonDisplayText size="small" />
                            <SkeletonBodyText lines={9} />
                        </TextContainer>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    );
    // const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const [navigationContent, setNavigationContent] = useState(<Empty_State onAction={handleNavigationAction} />);

    return (
        <div style={{ height: '500px' }}>
            <AppProvider>
                <Frame
                    navigation={navigationMarkup}
                >
                    {navigationContent}

                </Frame>
            </AppProvider>
        </div>
    );
}


export default Navbar