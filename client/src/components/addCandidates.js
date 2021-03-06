import React, { Component } from 'react'
import axios from "axios"
import swal from "sweetalert2"
import { CSVReader } from 'react-papaparse'
import { UserContext } from "../context/userContext";
import language from "../properties/language";

const buttonRef = React.createRef()
class AddCandidates extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      filename: null,
      candidates: [],
    }
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data, file) => {
    this.setState({ filename: file.name })
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
    console.log(this.state.filename);
    if (file.name.includes('.csv')) {
      this.setState({ candidates: null }); //Reset the state
      this.setState({ candidates: data });
      console.log(this.state.candidates);
    }
    else {
      console.log('THE FILE YOU UPLOADED IS NOT CSV KNOB');
    }
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
      this.setState({ candidates: null })
      console.log(this.state.candiates);
    }
  }

  confirmSubmit() {
    swal.fire({
      title: 'Caution!',
      text: "This will add all the candidates, which are not present in the database",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Procceed'
    }).then((result) => {
      if (result.isConfirmed) {
        this.handeSubmit();
        swal.fire(
          'Candidates have been added into the database', // TODO:  ALERT THAT SHOWCASES HOW MANY CANDIDATES WERE ADDED, AND HOW MANY WERE IGNORED DUE TO DUPLICATE RULE
          'success'
        )
      }
    })
  }

  handeSubmit() {
    if (this.state.filename.includes('.csv')) {
      axios.post('http://localhost:5000/addCandidates', { candidate: this.state.candidates })
        .then(res => {
          console.log('YEET');
        });
    }
    else {
      alert('Cant upload a file that is not a CSV one');
    }
  }

  render() {
    return (
      <div className="addCan">
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          onSubmit={this.handleOnSubmit}
          noClick
          noDrag
          config={{ header: true }}
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '30%',
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                {language.browseButton[this.context.language]}
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%'
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                onClick={this.handleRemoveFile}
              >
                {language.removeButton[this.context.language]}
              </button>
            </aside>
          )}
        </CSVReader>
        <button onClick={this.confirmSubmit.bind(this)}>{language.fillFormButton[this.context.language]}</button>
      </div>
    )
  }
}
export default AddCandidates;
