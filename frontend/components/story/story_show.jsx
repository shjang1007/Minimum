import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { fetchStory } from "../../actions/story_actions";

class StoryShow extends Component {
  componentDidMount() {
    this.props.fetchStory(this.props.params.storyId);
  }

  render() {
    const { story } = this.props;
    const author = story.author;
    return (
      <main className="story-show-container">
        <header className="story-show-header">
          <Link to={`/@${author.username}`}>
            <img src={ author.avatar_url }
                className="instory-avatar" />
          </Link>
          <Link to={`/@${author.username}`}>
            {author.name}
          </Link>
        </header>
        <section className="story-show-content">
          <h1>{ story.title }</h1>
          <h3>{ story.sub_title }</h3>
          <p>{ story.content }</p>
        </section>
        <footer className="story-show-content">

        </footer>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStory: (id) => (dispatch(fetchStory(id)))
  });
};

export default connect(
  null,
  mapDispatchToProps
)(StoryShow);