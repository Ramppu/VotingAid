import React, { Component } from "react";
import axios from "axios";
import Picture from "../../components/partials/picture";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";
// import CandidateTableLinkItem from "../../components/partials/candidateTableLinkItem";
import { endpoint, url } from "../../api";
import CandidateAnswers from "../candidateAnswers";
import { Link } from "react-router-dom";

class Suggestions extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      suggestedAnswers: [],
    };
  }

  componentDidMount() {
    var data = {
      answers: this.props.location.data.answers,
      studentAssociation: this.props.location.data.studentAssociation,
    };
    axios.post(url + endpoint.suggested, { data: data }).then((res) => {
      this.setState({ suggestions: res.data });
      this.setState({ suggestedAnswers: res.data });
      console.log(res.data);
    });
    //JOS HALUTAAN PROSENTUAALISTA VERTAILUA if(userSum >= (candSum * 0.75))
  }

  handleSubmit = () => {
    this.props.history.push({
      pathname: "/candidateAnswers",
      data: {
        answers: this.state.suggestedAnswers,
        studentAssociation: this.state.path,
      },
    });
  };

  render() {
    if (this.state.suggestions.length > 0) {
      return (
        <div
          className="candidateSuggestions"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h1
            style={{
              display: "inline-block",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {language.matchingCandidates[this.context.language]}
          </h1>
          {this.state.suggestions.map((candidate, index) => {
            return (
              console.log(this.state.suggestions),
              (
                <div className="candidateSuggestionCenter" key={index}>
                  <h2
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {" "}
                    {
                      <Picture
                        className="pic"
                        source={process.env.PUBLIC_URL + candidate.image}
                      ></Picture>
                    }{" "}
                    {candidate.name} {candidate.surname}{" "}
                    {candidate.similarity.toFixed() + "%"}
                    <Link
                      onClick={this.handleSubmit}
                      to={{
                        pathname: "/candidateAnswers",
                        data: {
                          suggestedAnswers: this.suggestedAnswers,
                          studentAssociation: candidate.studentAssociation,
                        },
                      }}
                    >
                      Candidate Answers
                    </Link>
                  </h2>
                  {/* <CandidateTableLinkItem textOne={this.props.textOne} textTwo={this.props.textTwo} pathname={'/Profile'} data={this.props.data} /> */}
                </div>
              )
            );
          })}
        </div>
      );
    } else {
      return (
        <h2
          className="candidateSuggestions"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {" "}
          Unfortunately no one related with your answers{" "}
        </h2>
      );
    }
  }
}

export default Suggestions;
