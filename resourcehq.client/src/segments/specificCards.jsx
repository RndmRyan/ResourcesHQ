import React, { useState, useEffect } from 'react'
import { Component } from 'react'
import './cards.css'

class specificCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: [],
            modalresource: [],
            comments: []
        }
    }
    
    API_URL = "https://localhost:7144/";

    componentDidMount() {
        this.refreshResource();
    }

    refreshResource() {
        fetch(this.API_URL + 'api/Resource/GetSpecificResources?field=status&condition=' + this.props.resourceType).then(response => response.json())
            .then(data => {
                this.setState({ resources: data });
            })
    }

    changeModal = (res) => {
        fetch(this.API_URL + 'api/Resource/GetResourceComments?resrcID=' + res.ID).then(response => response.json())
            .then(data => {
                this.setState({ modalresource: res, comments: data});
            })
    };

    downloadFile = (addres) => {
        const FileName = addres.split('/').pop();
        const aTag = document.createElement('a');
        aTag.href = addres;
        aTag.setAttribute('download', FileName);
        aTag.setAttribute('target', '_blank');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }

    handleDelete = (id) => {
        const data = new FormData();
        data.append("resourceID", id);

        fetch('https://localhost:7144/api/Resource/ReportResource', {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(result => { alert(result) })
    }

    handleApprove = (id) => {
        const data = new FormData();
        data.append("resourceID", id);

        fetch('https://localhost:7144/api/Resource/ReportResource', {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(result => { alert(result) })
    }

    render() {
        const { resources, modalresource, comments } = this.state;
        return (
            <>
                <div className="card-container">
                {resources.map(resource =>
                    <div className="card" key={resource.ID}>
                        <h6 className="card-title" data-bs-toggle="modal" data-bs-target="#ResourceDetails" onClick={() => this.changeModal(resource)}>
                            {resource.resourceTitle}
                        </h6>
                        <div className="Section">
                            {this.props.resourceType === 'reported' ?
                                <button className="btn btn-danger" onClick={() => this.handleDelete(resource.ID)}>Delete</button> :
                                <button className="btn btn-success" onClick={() => this.handleApprove(resource.ID)}>Approve</button>
                            }
                        </div>
                    </div>
                )}
                </div>

                <div className="modal fade" id="ResourceDetails" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalresource.ID} {modalresource.resourceTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="Section">
                                    <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{modalresource.course}</span>
                                    <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{modalresource.filetype}</span>
                                </div>
                                <div className="mt-2">
                                    <h6>Uploaded by: {modalresource.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; On: {new Date(modalresource.UploadDate).toLocaleDateString()}</h6>
                                </div>
                                <div className="mt-4"><p className="lead">{modalresource.descp}</p></div>
                                <br/>
                                <h6>Comments:</h6>

                                <div className="comment-container">
                                    {comments.map(comment =>
                                        <div className="" key={ comment.ID } >
                                            <hr></hr>
                                            <p className="">{comment.comment}</p>
                                                <small className="blockquote-footer">{comment.name}</small> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <small>{new Date(comment.commentdate).toLocaleDateString()}</small>
                                        </div>
                                    )}
                                </div>
                                <br/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => this.downloadFile(modalresource.link)}>Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default specificCards;