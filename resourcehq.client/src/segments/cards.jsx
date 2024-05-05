import React, { useState, useEffect } from 'react'
import { Component } from 'react'
import './cards.css'

class cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            selectedRadio: '',
            resources: [],
            modalresource: [],
            comments: []
        }
        this.commentonResource = this.commentonResource.bind(this);
    }
    
    API_URL = "https://localhost:7144/";

    componentDidMount() {
        this.refreshResource();
    }

    refreshResource() {
        const { searchValue, selectedRadio } = this.state;
        if (searchValue === '' || selectedRadio === '')
            fetch(this.API_URL + 'api/Resource/GetResources').then(response => response.json())
                .then(data => {
                    this.setState({ resources: data });
                })
        else 
            fetch(this.API_URL + 'api/Resource/GetSpecificResources?field=' + selectedRadio + '&condition=' + searchValue).then(response => response.json())
                .then(data => {
                    this.setState({ resources: data });
                })
    }

    handleSearchInputChange = (event) => {
        this.setState({ searchValue: event.target.value }, () => {
            this.refreshResource();
        });
    }
    handleRadioChange = (event) => {
        this.setState({ selectedRadio: event.target.value }, () => {
            this.refreshResource();
        });
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
    addBookmark = (reID) =>
    {
        const data = new FormData();
        data.append("resID", reID);
        data.append("userID", sessionStorage.getItem('userId'));

        fetch(this.API_URL + 'api/Resource/AddBookmark', {
            method: "POST",
            body: data
        }).then(response => response.json())
        alert("Bookmark Added");
    }

    reportResource = (id) => {
        const data = new FormData();
        data.append("resourceID", id);

        fetch('https://localhost:7144/api/Resource/ReportResource', {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(result => { alert(result) })
    }

    async commentonResource(event)
    {
        event.preventDefault();

        var txt = document.getElementById("comment").value

        const data = new FormData();
        data.append("comment", txt);
        data.append("resourceID", this.state.modalresource.ID);
        data.append("commentorID", sessionStorage.getItem('userId'));

        const response = await fetch('https://localhost:7144/api/Resource/AddResourceComment', {
            method: "POST",
            body: data
        });
        const result = await response.json();
        document.getElementById("comment").value = "";

        fetch(this.API_URL + 'api/Resource/GetResourceComments?resrcID=' + this.state.modalresource.ID).then(response => response.json())
            .then(data => {
                this.setState({ comments: data });
            })
    }

    handleLike = (id) => {
        this.setState(prevState => ({
            resources: prevState.resources.map(resource => {
                if (resource.ID === id) {
                    return { ...resource, likes: resource.likes + 1 };
                }
                return resource;
            })
        }), () => {
            // Update the like in the database here
        });
    };

    handleDislike = (id) => {
        this.setState(prevState => ({
            resources: prevState.resources.map(resource => {
                if (resource.ID === id) {
                    return { ...resource, dislikes: resource.dislikes + 1 };
                }
                return resource;
            })
        }), () => {
            // Update the dislike in the database here
        });
    };





    render() {
        const { resources, modalresource, comments, searchValue, selectedRadio } = this.state;
        return (
            <>
                <div className="inputgrp">
                <div className="input-group">
                    <div className="form-outline">
                        <input type="search" id="searchbar" className="form-control" placeholder="Search" onChange={this.handleSearchInputChange} />
                    </div>
                </div>
                <div className="input-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="resourceTitle" onChange={this.handleRadioChange} />
                            <label className="form-check-label" htmlFor="inlineRadio1">Title</label>
                    </div>
                    <div className="form-check form-check-inline ">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="descp" onChange={this.handleRadioChange} />
                            <label className="form-check-label" htmlFor="inlineRadio2">Description</label>
                    </div>
                    <div className="form-check form-check-inline ">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="s.name" onChange={this.handleRadioChange} />
                            <label className="form-check-label" htmlFor="inlineRadio3">Author</label>
                    </div>
                    <div className="form-check form-check-inline ">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="course" onChange={this.handleRadioChange} />
                            <label className="form-check-label" htmlFor="inlineRadio4">Course</label>
                    </div>
                    <div className="form-check form-check-inline ">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="filetype" onChange={this.handleRadioChange} />
                        <label className="form-check-label" htmlFor="inlineRadio5">FileType</label>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                {resources.map(resource =>
                    <div className="card" key={resource.ID}>
                        <h6 className="card-title" data-bs-toggle="modal" data-bs-target="#ResourceDetails" onClick={() => this.changeModal(resource)}>
                            {resource.resourceTitle}
                        </h6>
                        <div className="Section">
                            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{resource.course}</span>
                            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{resource.filetype}</span>
                        </div>
                        <div className="Section">
                            <button className="btn" onClick={() => this.handleLike(resource.ID)}>
                                <i className="bi bi-hand-thumbs-up-fill"></i>{resource.likes}
                            </button>
                            <button className="btn" onClick={() => this.handleDislike(resource.ID)}>
                                <i className="bi bi-hand-thumbs-down-fill"></i>{resource.dislikes}
                            </button>
                            <button className="btn" onClick={() => this.downloadFile(resource.link)}>
                                <i className="bi bi-download"></i>
                            </button>
                        </div>
                    </div>
                )}
                </div>

                <div className="modal fade" id="ResourceDetails" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalresource.ID} {modalresource.resourceTitle}</h5>
                                <button type="button" className="btn" onClick={() => this.addBookmark(modalresource.ID)}><i className="bi bi-bookmark-fill"></i></button>
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
                                <form className="modalMsgBox" onSubmit={this.commentonResource}>
                                    <input id="comment" className="form-control" type="text" placeholder='Add Comment' required />
                                    <button type="submit" className="btn btn-success">Send</button>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => this.downloadFile(modalresource.link)}>Download</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.reportResource(modalresource.ID)}>Report</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default cards;