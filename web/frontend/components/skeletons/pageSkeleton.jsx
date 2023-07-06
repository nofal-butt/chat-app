import {
    LegacyCard,
    Layout,
    SkeletonDisplayText,
    SkeletonPage,
    TextContainer,
    SkeletonBodyText,

} from '@shopify/polaris';
import React from "react";

export default function pageSkeletonExample() {
    return (
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
}