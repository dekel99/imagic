import React from 'react'
import { AppProvider, Frame, ContextualSaveBar } from '@shopify/polaris'

function SaveBar() {
    return (
        <div style={{height: '250px'}}>
            <AppProvider
                theme={{
                logo: {
                    width: 124,
                    contextualSaveBarSource:
                    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
                },
                }}
                i18n={{
                Polaris: {
                    Frame: {
                    skipToContent: 'Skip to content',
                    },
                    ContextualSaveBar: {
                    save: 'Save',
                    discard: 'Discard',
                    },
                },
                }}
            >
                <Frame>
                    <ContextualSaveBar
                        message="Unsaved changes"
                        saveAction={{
                        onAction: () => console.log('add form submit logic'),
                        loading: false,
                        disabled: false,
                        }}
                        discardAction={{
                        onAction: () => console.log('add clear form logic'),
                        }}
                    />
                </Frame>
            </AppProvider>
        </div>
    )
}

export default SaveBar
