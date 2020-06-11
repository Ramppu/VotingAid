import React, { Component } from 'react';
import axios from 'axios';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: []
    };
  }

   componentDidMount() {
    axios.get('http://localhost:5000/questions')
      .then(res => {
        let q = [];
        for(var i = 0; i < res.data.length;i++) {
          q.push(res.data[i]);
          var joined = this.state.questions.concat(q[i]);
          this.setState({ questions: joined })
        }
    });
  }

  handleClick(e) {
    alert(e.currentTarget.value);
    this.setState({answers[e.currentTarget.name]: e.currentTarget.value})
  }

  handleSubmit = event => {
    event.preventDefault();

    let answers = {};
    for (var i = 0; i < this.state.questions.length; i++) {
    //  answers[i]
      console.log();
    }
    axios.post('http://localhost:5000/send',answers)
      .then(res => {
          console.log(res);
      });
  }

  render() {
    console.log(this.props.location.state);
    var counter = -1;
    return (
      <form onSubmit={this.handleSubmit} method="POST">
      {this.state.questions.map(index => {
        counter++;
        if(index.area == this.props.location.state.value || index.area == 'Undefined') {
          return (
            <div className = {'question'+ counter}>
                <label>{index.question}</label>
                <div><sub className="disa">Disagree</sub><sub className="agg">Agree</sub></div>
                <input type="radio" value="option1" name = {counter} onChange={this.handleClick.bind(this)} />
                <input type="radio" value="option2" name = {counter} onChange={this.handleClick.bind(this)} />
                <input type="radio" value="option3" name = {counter} onChange={this.handleClick.bind(this)} />
                <input type="radio" value="option4" name = {counter} onChange={this.handleClick.bind(this)} />
                <input type="radio" value="option5" name = {counter} onChange={this.handleClick.bind(this)} />
            </div>
          );
        }
      }
    )}
        <input type="submit" value="Fill ur form"></input>
      </form>
    );
  }
}
export default Form;
