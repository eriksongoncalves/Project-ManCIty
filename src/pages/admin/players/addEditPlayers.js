import React, { Component } from 'react';
import Layout from "~/components/admin/Layout";

import FormField from '~/components/ui/formFields';
import { validate } from '~/components/ui/misc';
import FileUploader from '~/components/ui/fileuploader';

import { firebasePlayers, firebaseDB, firebase } from "~/firebase";

class AddEditPlayers extends Component {

  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player name',
          name: 'name_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Last name',
          name: 'lastname_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player number',
          name: 'number_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a position',
          name: 'select_position',
          type: 'select',
          options: [
            { key: "keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    }
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({
        formType: 'Add Player'
      })
    }
    else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, 'Edit Player', url);
            })
            .catch(e => {
              console.log('AQUI');
              this.updateFields({
                ...playerData,
                image: ''
              }, playerId, 'Edit Player', '');
            })
        })

      this.setState({
        formType: 'Edit Player'
      })
    }
  }

  updateFields = (player, playerId, type, defaultImg) => {
    const newFormData = {
      ...this.state.formData
    }

    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId,
      formType: type,
      formData: newFormData,
      defaultImg
    })
  }

  updateForm = (element, content = '') => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if (!content) {
      newElement.value = element.event.target.value;
    }
    else {
      newElement.value = content;
    }



    let valiData = validate(newElement);

    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];

    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  successForm = message => {
    this.setState({
      formSuccess: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
    }, 2000)
  }

  submitForm = e => {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === 'Edit Player') {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Update correctly');
          })
          .catch(e => {
            this.setState({
              formError: true
            })
          })
      }
      else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_players')
          })
          .catch(e => {
            this.setState({
              formError: true
            })
          })
      }
    }
    else {
      this.setState({
        formError: true
      })
    }
  }

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData['imagem'].value = '';
    newFormData['imagem'].valid = false;

    this.setState({
      defaultImg: '',
      formData: newFormData
    })
  }

  storeFileName = filename => {
    this.updateForm({ id: "image" }, filename);
  }

  render() {
    return (
      <Layout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={e => this.submitForm(e)}>
              <FileUploader
                dir="players"
                tag="Player image"
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={() => this.resetImage()}
                filename={filename => this.storeFileName(filename)}
              />

              <FormField
                id="name"
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />

              <FormField
                id="lastname"
                formData={this.state.formData.lastname}
                change={element => this.updateForm(element)}
              />

              <FormField
                id="number"
                formData={this.state.formData.number}
                change={element => this.updateForm(element)}
              />

              <FormField
                id="position"
                formData={this.state.formData.position}
                change={element => this.updateForm(element)}
              />

              {this.state.formError && <div className="error_label">Something is wrong, try again.</div>}
              {this.state.formSuccess && <div className="success_label">{this.state.formSuccess}</div>}

              <div className="admin_submit">
                <button type="submit">{this.state.formType}</button>
              </div>

            </form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AddEditPlayers