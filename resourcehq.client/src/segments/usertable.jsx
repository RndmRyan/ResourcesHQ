import React, { useState, useEffect } from 'react'
import { Component } from 'react'
import './cards.css'

class usertable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    
    API_URL = "https://localhost:7144/";

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers() {
        fetch(this.API_URL + `api/Resource/getUsers?role=${this.props.role}&userstatus=${this.props.userstatus}`).then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            })
    }

    handleDelete = (id) => {
        const data = new FormData();
        data.append("uID", id);

        fetch('https://localhost:7144/api/Resource/DeleteUser', {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(result => {
                alert(result)
                this.refreshUsers(); })
    }

    handleApprove = (id) => {
        const data = new FormData();
        data.append("uID", id);

        fetch('https://localhost:7144/api/Resource/ApproveUser', {
            method: "POST",
            body: data
        }).then(response => response.json())
            .then(result => {
                alert(result)
                this.refreshUsers(); })
    }

    render() {
        const { users } = this.state;
        return (
            <>
                <table className="table m-5">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.userrole}</td>
                                <td>
                                    {this.props.userstatus === 'registered' ? (
                                        <button className="btn btn-danger" onClick={() => this.handleDelete(user.id)}>Remove</button>
                                    ) : (
                                        <button className="btn btn-success" onClick={() => this.handleApprove(user.id)}>Approve</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default usertable;