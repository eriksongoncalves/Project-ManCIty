import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase } from "~/firebase";

class Fileuploader extends Component {

  state = {
    name: '',
    isUploading: false,
    fileUrl: ''
  }

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return state = {
        name: props.defaultImgName,
        fileUrl: props.defaultImg
      }
    }

    return null;
  }

  uploadAgain = () => {
    this.setState({
      name: '',
      isUploading: false,
      fileUrl: ''
    })

    this.props.resetImage();
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true
    });
  }

  handleUploadError = () => {
    this.setState({
      isUploading: false
    })
  }

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false
    })

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileUrl: url
        })
      });

    this.props.filename(filename)
  }

  render() {
    return (
      <div>
        {
          !this.state.fileUrl
          && <div>
            <div className="label_input">{this.props.tag}</div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        }

        {
          this.state.isUploading
          && <div className="progress" style={{ textAlign: 'center', margin: '30px 0' }}>
            <CircularProgress thickness={7} style={{ color: '#98c6e9' }} />
          </div>
        }

        {
          this.state.fileUrl
          && <div className="image_upload_container">
            <img style={{ width: '100%' }}
              src={this.state.fileUrl}
              alt={this.state.name}
            />
            <div className="remove" onClick={() => this.uploadAgain()}>
              Remove
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Fileuploader;