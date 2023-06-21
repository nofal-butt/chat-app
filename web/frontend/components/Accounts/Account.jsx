import {
    CalloutCard, Page, DropZone,
    LegacyStack, TextField,
    Banner,
    List,
    Button,
    Collapsible,
} from '@shopify/polaris';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState, useCallback } from 'react';
import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';
import { Thumbnail } from '@shopify/polaris';


function Account() {
    const fetch = useAuthenticatedFetch()

    //------------------textfields---------------------

    const [data, setData] = useState({
        name: '',
        phone: '',
        title: '',
        message: '',
        toggle: true,
        notice: "I will be back soon",
        url: ""
    });

    const handleTextFieldChange = useCallback((value, name) => {
        setData((predata) => ({
            ...predata, [name]: value
        }))
    });
    //-------------------toggle------------------------
    const [open, setOpen] = useState(false);

    const handleToggle = useCallback(() => {
        setOpen((open) => !open);
        setData((prevData) => ({
            ...prevData,
            toggle: !prevData.toggle,
        }));
    }, []);




    //------------------------images -------------------

    const [files, setFiles] = useState("");
    const [rejectedFiles, setRejectedFiles] = useState([]);
    const hasError = rejectedFiles.length > 0;
    useEffect(() => {
        if (files) {
            console.log(files)
            uploadImageToCloudinary(files);
        }
        console.log(data)
    }, [files]);
    const handleDrop = useCallback((files, acceptedFiles, rejectedFiles) => {
        setFiles(acceptedFiles[0]);
        setRejectedFiles(rejectedFiles);
    }, []);

    const errorMessage = hasError && (
        <Banner
            title="The following images couldn’t be uploaded:"
            status="critical"
        >
            <List type="bullet">
                {rejectedFiles.map((file, index) => (
                    <List.Item key={index}>
                        {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
                    </List.Item>
                ))}
            </List>
        </Banner>
    );
    //-------------------cloudnary------------

    const uploadImageToCloudinary = async (files) => {

        const formData = new FormData();
        formData.append("file", files);
        formData.append("upload_preset", "mrjpohmn");
        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dfy2gjqhv/image/upload",
                formData
            );
            const res = response.data;
            console.log(res);
            setData({ ...data, url: res.secure_url });
        } catch (error) {
            console.log(error);
        }
    }

    //--------------------------------------------------
    const handleSubmit = () => {
        console.log(data)
        fetch("/api/Account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Accept-Encoding": "gzip,deflate,compress"
            },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("Successfull data sand")

        }).catch((err) => {
            console.log(err, "error")

        });

    }






    return (<>
        <Page backAction={{ content: 'Settings', url: "" }} title="Add New Account" >
        </Page>

        <CalloutCard
            title="Account Information"
            primaryAction={{
                content: 'Create Account',
                url: '#',
                onAction: handleSubmit
            }}
        >
            {/* ------------images----------- */}
            <LegacyStack vertical>
                {errorMessage}
                {
                    data?.url ?
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                            <img src={data?.url ? data?.url : ""} alt={files.name} srcSet="" style={{ width: "100px", height: "100px" }} />
                            <Button plain destructive onClick={() => { setData({ ...data, url: "" }) }}>Remove Images</Button>
                        </div>
                        :
                        <DropZone accept="image/*" type="image" onDrop={handleDrop} label="Account Avatar">
                            <DropZone.FileUpload actionTitle='Add Image' />
                        </DropZone>
                }

            </LegacyStack>
            {/* --------texxtfield--------- */}
            <TextField
                label="Account Name"
                type="text"
                value={data.name}
                onChange={(value) => handleTextFieldChange(value, "name")}
                placeholder='Alexa'
                autoComplete="text"
            />
            <TextField
                label="Phone number, group invite link, or WhatsApp Business short link"
                type="number"
                value={data.phone}
                onChange={(value) => handleTextFieldChange(value, "phone")}
                placeholder='Your phone number ,or WhatsApp link...'
                helpText="Fill in WhatsApp phone number in the international format. Eg: +923104988753."
                autoComplete="off"
            />
            <TextField
                label="Title"
                type="text"
                value={data.title}
                placeholder='Customer Service'
                onChange={(value) => handleTextFieldChange(value, "title")}
                autoComplete="off"
            />
            <TextField
                label="Prefilled message"
                type="text"
                value={data.message}
                placeholder='Hello..! Do you have anh deals for [sgwa-page-title] at [sgwa-page-url'
                onChange={(value) => handleTextFieldChange(value, "message")}
                helpText="Use [sgwa_page_title] and [sgwa_page_url] shortcodes to output the page's title and URL respectively."
            />

            {/* --------------toggle----------------- */}
            Always available online   <Button
                onClick={handleToggle}
                ariaExpanded={open}
                ariaControls="basic-collapsible"
                pressed={open === false}
            >
                Online
            </Button>
            <Collapsible
                open={open}
                id="basic-collapsible"
                transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                expandOnPrint
            >
                <TextField
                    label="Unavailable Notice"
                    type="text"
                    value={data.notice}
                    onChange={(value) => handleTextFieldChange(value, "notice")}
                    helpText="You can use this text to display on days this account does not work."
                />
            </Collapsible>
        </CalloutCard>
    </>
    );
}
export default Account