import React, { useState } from 'react';
import './uploadPage.css'

function uploadPage()
{
    const API_URL = "https://localhost:7144/";
    const handleSubmit = async (e) => {
        e.preventDefault();

        var resourceTitle = document.getElementById("title").value
        var descp = document.getElementById("description").value
        var link = document.getElementById("link").value
        var course = document.getElementById("course").value
        var filetype = document.getElementById("filetype").value

        const data = new FormData();
        data.append("resourceTitle", resourceTitle);
        data.append("UploaderID", sessionStorage.getItem('userId'));
        data.append("descp", descp);
        data.append("link", link);
        data.append("course", course);
        data.append("filetype", filetype);

        const response = await fetch(API_URL + 'api/Resource/AddResource', {
            method: "POST",
            body: data
        })

        alert('Resource Uploaded, Please Wait for Admin to Approve Request');
    }
        return (
            <>
                <div className="modal fade" id="UploadResource" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Upload Resource</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="upload-form">
                                    <form onSubmit={handleSubmit}>
                                        <input type="text" placeholder="Resource Title" id="title" required />
                                        <input type="text" placeholder="Course" id="course" required />
                                        <textarea placeholder="Description" id="description" required />
                                        <input type="text" placeholder="Drive Link of File" id="link" required />
                                        <input type="text" placeholder="File Type" id="filetype" required />
                                        <button type="submit">Upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

export default uploadPage;