import React, { Component } from "react";
import AccountApiService from "../../services/account-api-service";
import ContactForm from "../ContactForm/ContactForm";
import Modal from "react-modal";

export default class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {},
      contactId: this.props.contactId,
    };
  }

  componentDidMount() {
    const { contact } = this.props;
    this.setState({
      contact: contact,
    });
  }

  handlePatch = (ev) => {
    this.setState({ error: null });
    const { contact } = this.state;

    AccountApiService.updateContact(this.props.contactId, contact)
      .then(() => {
        window.location.reload();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleDelete() {
    AccountApiService.deleteContact(this.props.contactId).catch((err) =>
      this.setState({ error: err })
    );
    window.location.reload();
  }

  handleUpdateFields(value) {
    this.setState({ contact: value });
  }

  handleClick(e) {
    this.props.triggerModal(e);
  }

  render() {
    const { contact, contactId } = this.props;
    return (
      <>
        <Modal isOpen={this.props.modalIsOpen}>
          <ContactForm
            contact={contact}
            contactId={contactId}
            updateFields={(value) => this.handleUpdateFields(value)}
            handleSubmit={(ev) => this.handlePatch(ev)}
          />
          <button onClick={(event) => this.handleClick(event)}>Cancel</button>
          <button onClick={(event) => this.handleDelete(event)}>Delete</button>
        </Modal>
      </>
    );
  }
}
