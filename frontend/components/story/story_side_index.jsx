import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { fetchThreeStories } from "../../actions/story_actions";
import { selectTagStories } from "../../reducers/selectors";

class StorySideIndex extends Component {
  render() {
    const { stories, currentUser } = this.props;
    if (stories) {
      const storyList = stories.map( (story) => (
        <ul key={ story.id } className="story-side-container">
          <li>
            <Link to={`/@${story.author.username}`}>
              <img src={ story.author.avatar_url }
                className="story-avatar avatar"/>
            </Link>
          </li>
          <li>
            <Link to={`/stories/${story.id}`}>
              { story.title }
            </Link>
          </li>
          <li>
            <Link to={`/@${story.author.username}`}>
              { story.author.name }
            </Link>
          </li>
        </ul>
      ));

      return (
        <section>
          { storyList }
        </section>
      );
    } else {
      return(<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    stories: selectTagStories(state.stories, ownProps.tagName),
  });
};

export default connect(
  mapStateToProps
)(StorySideIndex);
