import React, { useState, useEffect } from 'react';
import '../App.css';
import './studentHome.css';
import { useNavigate } from 'react-router-dom';

function Categories() {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [recommendedresources, setrecommendedresources] = useState([]);

    useEffect(() => {
        refreshResource();
    }, []);

    const API_URL = "https://localhost:7144/";

    const refreshResource = () => {
        fetch(API_URL + `api/Resource/GetBookMarkedResources?userID=${sessionStorage.getItem('userId')}`)
            .then(response => response.json())
            .then(data => {
                setResources(data);
            })
            .catch(error => console.error('Error fetching resources:', error));

        fetch(API_URL + `api/Resource/GetRecommendedResources?userID=${sessionStorage.getItem('userId')}`)
            .then(response => response.json())
            .then(data => {
                setrecommendedresources(data);
            })
            .catch(error => console.error('Error fetching resources:', error));
    }

    const downloadFile = (address) => {
        const FileName = address.split('/').pop();
        const aTag = document.createElement('a');
        aTag.href = address;
        aTag.setAttribute('download', FileName);
        aTag.setAttribute('target', '_blank');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }

    const removeBookmark = (reID) => {

        const data = new FormData();
        data.append("resID", reID);
        data.append("userID", sessionStorage.getItem('userId'));

        fetch(API_URL + 'api/Resource/RemoveBookmark', {
            method: "POST",
            body: data
        }).then(response => response.json())
        alert("Bookmark Removed");
        refreshResource();
    }

    const setNavPath = (path) => {
        navigate(path);
    };

    return (
        <>
            <br/><br/><br/>
            <h3 className="m-5 ">Automated Recommendations:</h3>
            <div className="card-container">
                {recommendedresources.map(resource =>
                    <div className="card" key={resource.ID}>
                        <h6 className="mt-3">
                            {resource.resourceTitle}
                        </h6>
                        <div className="Section">
                            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{resource.course}</span>
                            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{resource.filetype}</span>
                        </div>
                        <div className="Section">
                            <button className="btn" onClick={() => downloadFile(resource.link)}>
                                <i className="bi bi-cloud-download-fill"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <h3 className="m-5 ">My BookMarks</h3>
            <div className="card-container">
                {resources.map(resource =>
                    <div className="card" key={resource.ID}>
                        <h6 className="mt-3">
                            {resource.resourceTitle}
                        </h6>
                        <div className="Section">
                            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{resource.course}</span>
                            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{resource.filetype}</span>
                        </div>
                        <div className="Section">
                            <button className="btn" onClick={() => removeBookmark(resource.ID)}>
                                <i className="bi bi-bookmark-x-fill"></i>
                            </button>
                            <button className="btn" onClick={() => downloadFile(resource.link)}>
                                <i className="bi bi-cloud-download-fill"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <header>
                <nav className="navbar">
                    <h3>ResourcesHQ</h3>
                    <div className="nav nav-pills">
                        <p className="nav-link" onClick={() => setNavPath("/Student-Dashboard")}>Home</p>
                        <p className="nav-link" onClick={() => setNavPath("/Bookmarks")}>Bookmarks</p>
                        <p className="nav-link" onClick={() => setNavPath("/Chatrooms")}>Chat Rooms</p>
                        <p className="nav-link" onClick={() => setNavPath("/")}>LogOut&nbsp;&nbsp;&nbsp;</p>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Categories;
