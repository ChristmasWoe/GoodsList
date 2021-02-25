import React from 'react';
import "./CreateForm.css"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { connect } from 'react-redux';
import { addGood } from "../../redux/Actions"

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    addGood: good => dispatch(addGood(good))
})

class CreateForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            url: "",
            description: "",
            nameError: "",
            descriptionError: "",
            urlError: "",
        }
        this.base = this.state;
    }

    onSubmit = e => {
        e.preventDefault();
        let name = this.state.name.trim();
        let description = this.state.description.trim();
        let url = this.state.url.trim();
        let flag = false;
        console.log(name, description, url)
        if (name == "") {
            flag = true;
            this.setState({ nameError: "This field is required" })
        }
        if (description == "") {
            flag = true;
            this.setState({ descriptionError: "This field is required" })
        }
        if (url == "") {
            flag = true;
            this.setState({ urlError: "This field is required" })
        }
        if (flag || this.state.urlError) return;
        this.props.addGood({ name: name, description, description, url: url, id: uuidv4() })
        this.setState(this.base)
    }

    onNameChange = e => {
        this.setState({
            name: e.target.value,
            nameError: ""
        })
    }

    onDescriptionChange = e => {
        this.setState({
            description: e.target.value,
            descriptionError: "",
        })
    }

    onUrlChange = e => {
        this.setState({
            url: e.target.value,
        })
        axios.get(e.target.value)
            .then(res => {
                this.setState({
                    urlError: ""
                })
            })
            .catch(e => {
                this.setState({
                    urlError: "Enter a valid url for picture"
                })
            })
    }

    render() {
        const { name, url, description, nameError, descriptionError, urlError } = this.state;
        return (
            <div id="createForm">
                <Form>
                    <FormGroup>
                        <Label for="goodname">Good's name*</Label>
                        <Input style={{ border: nameError ? "1px solid red" : "1px solid #ced4da" }} value={name} onChange={this.onNameChange} type="name" name="goodname" id="goodname" placeholder="Orange Juice" />
                        {nameError ?
                            <Label style={{ color: "red", marginBottom: 0 }} for="goodname">{nameError}</Label>
                            : <br style={{ height: "32px" }} />}
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Good's description*</Label>
                        <Input style={{ border: descriptionError ? "1px solid red" : "1px solid #ced4da" }} value={description} onChange={this.onDescriptionChange} type="textarea" name="text" id="exampleText" placeholder="Really good and juicy" />
                        {descriptionError ?
                            <Label style={{ color: "red", marginBottom: 0 }} for="goodname">{descriptionError}</Label>
                            : <br style={{ height: "32px" }} />}
                    </FormGroup>
                    <FormGroup>
                        <Label for="goodurl">Good's image*</Label>
                        <Input style={{ border: urlError ? "1px solid red" : "1px solid #ced4da" }} value={url} onChange={this.onUrlChange} type="url" name="goodurl" id="goodurl" placeholder="https://randompics/01.png" />
                        {urlError ?
                            <Label style={{ color: "red", marginBottom: 0 }} for="goodname">{urlError}</Label>
                            : <br style={{ height: "32px" }} />}
                    </FormGroup>
                    {urlError || url == "" ?
                        null
                        :
                        <>
                            <img style={{ width: "60%", height: "auto", position: "relative", left: "20%" }} src={url} />
                            <br />
                        </>
                    }

                </Form>
                <button className="submit" onClick={this.onSubmit}></button>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);