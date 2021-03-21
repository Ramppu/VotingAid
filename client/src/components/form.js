import React, { Component } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import OptionButton from "./optionButton.js";

class Form extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      answersDesc: [],
      //disabled: false,
      //color: '',
    };
  }

  componentDidMount() {
    axios.post('http://localhost:5000/questions', { data: this.props.location.studentAssociation })
      .then(res => {
        let q = [];
        for (var i = 0; i < res.data.length; i++) {
          q.push(res.data[i]);
          var joined = this.state.questions.concat(q[i]);
          this.setState({ questions: joined });
          this.preFillForm();
        }
      });
  }

  preFillForm() {
    var email = this.context.email;
    if (this.props.location.data != null) {
      email = this.props.location.data.email;
    }

    if (this.context.loggedIn) {
      axios.post('http://localhost:5000/fillForm', { data: email })
        .then(res => {
          // if(Object.keys(res.data.filledForm).length > 1) {
          //this.setState({disabled: true}); ENABLE THIS WHILE NOT TESTING
          // }
          console.log(res)
          for (var i = 0; i < Object.keys(res.data.filledForm).length / 2; i++) {
            console.log(Object.keys(res.data.filledForm).length);
            if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[2].childNodes[0].value) {
              this.refs['q' + i].childNodes[2].childNodes[0].checked = true;
            }
            else if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[3].childNodes[0].value) {
              this.refs['q' + i].childNodes[3].childNodes[0].checked = true;
            }
            else if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[4].childNodes[0].value) {
              this.refs['q' + i].childNodes[4].childNodes[0].checked = true;
            }
            else if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[5].childNodes[0].value) {
              this.refs['q' + i].childNodes[5].childNodes[0].checked = true;
            }
            else if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[6].childNodes[0].value) {
              this.refs['q' + i].childNodes[6].childNodes[0].checked = true;
            }
            this.refs['desc' + i].value = res.data.filledForm['questiondesc' + i];
          }
        });
    }
  }

  isQuest(counter) {
    if (this.context.user != 'Quest') {
      return <input type="text" name={counter} ref={"desc" + counter} placeholder="Explain your choice" style={{ marginBottom: "41px", width: "50%" }} onChange={this.handleChange.bind(this)} disabled={this.state.disabled}></input>
    }
  }

  choice(counter, value) {
    return <input className="" type="radio" ref={"opt" + counter} value={value} name={counter} onChange={this.handleClick.bind(this)} disabled={this.state.disabled} />

  }

  handleChange(e) {
    this.state.answersDesc[e.currentTarget.name] = e.currentTarget.value;
    console.log(this.state.answersDesc);
  }

  handleClick(e) {
    this.state.answers[e.currentTarget.name] = parseInt(e.currentTarget.value);
    console.log(this.state.answers);
    let sum = this.state.answers.reduce((result, number) => result + number);
    console.log(sum);
  }

  handleSubmit = event => {
    if (this.context.user != 'Quest') {
      event.preventDefault();
      let answers = {};
      for (var i = 0; i < this.state.questions.length; i++) {
      }
      axios.post('http://localhost:5000/send', { ans: this.state.answers, desc: this.state.answersDesc, email: this.context.email })
        .then(res => {
          console.log(res);
        });
    }
    else {
      this.props.history.push({
        pathname: '/suggestedCandidates',
        data: {
          answers: this.state.answers,
          school: this.props.location.studentAssociation,
        }
      })
    }
  }

  /*  componentDidUpdate() {
      //change color here with conditions
      // console.log(window.location.pathname === "/Form");
      if (
        window.location.pathname === "/Form" &&
        this.props.location.state.value === "Laurea"
      ) {
        document.body.style.backgroundColor = "pink";
        //  document.getElementsByClassName('.checkmark').style.backgroundColor = "pink"; CHECK WHY IT DOESNT WORK
        console.log(document.getElementsByClassName('.checkmark'))
      } else if (
        window.location.pathname === "/Form" &&
        this.props.location.state.value === "Metropolia"
      ) {
        document.body.style.backgroundColor = "green";
      } else if (
        window.location.pathname === "/Form" &&
        this.props.location.state.value === "Haaga-Helia"
      ) {
        document.body.style.backgroundColor = "yellow";
      } else if (
        window.location.pathname === "/Form" &&
        this.props.location.state.value === "JAMK"
      ) {
        document.body.style.backgroundColor = "orange";
      } else if (
        window.location.pathname === "/Form" &&
        this.props.location.state.value === "O'Diako"
      ) {
        document.body.style.backgroundColor = "red";
      }
    }*/

  render() {
    if (this.props.location.state != null) {
      var area = this.props.location.state.value;
    }

    if (this.props.location.data != null) {
      area = this.props.location.data.school;
    }
    var counter = -1;
    return (
      <form onSubmit={this.handleSubmit} method="POST">
        {this.state.questions.map(index => {
          counter++;
          return (
            console.log(area),
            <div className='questionSet' ref={'q' + counter} >
              <label>{index.question}</label>
              <div><sub className="disa">Disagree</sub><sub className="agg">Agree</sub></div>
              <label class="container">
                {this.choice(counter, -2)}
                <span class="checkmark"></span>
              </label>
              <label class="container">
                {this.choice(counter, -1)}
                <span class="checkmark"></span>
              </label>
              <label class="container">
                {this.choice(counter, 0)}
                <span class="checkmark"></span>
              </label>
              <label class="container">
                {this.choice(counter, 1)}
                <span class="checkmark"></span>
              </label>
              <label class="container">
                {this.choice(counter, 2)}
                <span class="checkmark"></span>
              </label>
              <br />
              {this.isQuest(counter)}
              <br />
            </div>
          );
        }
        )}
        <input type="submit" value="Fill ur form"></input>
      </form>
    );
  }
}
export default Form;
