import React, { Component } from "react";
import { connect } from "react-redux";
import { values } from "lodash";
import { Link, withRouter } from "react-router";
import { fetchStoryAndComments } from "../../actions/story_actions";
import { openModal } from "../../actions/modal_actions";
import { createLike, deleteLike } from "../../actions/like_actions";
import CommentIndex from "../comment/comment_index";
import CommentForm from "../comment/comment_form";
import AuthModal from "../modal/auth_modal";

class StoryShow extends Component {
  componentDidMount() {
    this.props.fetchStoryAndComments(this.props.params.storyId);
  }

  toggleLike(method) {
    const { story, currentUser } = this.props;
    const likeInfo = { user_id: currentUser.id, story_id: story.id };
    return (e) => {
      if (method === "delete") {
        this.props.deleteLike(likeInfo);
      } else {
        this.props.createLike(likeInfo);
      }
    };
  }

  renderImage() {
    const { story } = this.props;
    if (story.image_url) {
      return (<img src={story.image_url} className="story-show-image" />);
    } else {
      return (<div className="no-picture-tag"></div>);
    }
  }

  renderLikeButton() {
    const { story, currentUser } = this.props;

    if (currentUser === null) {
      return (
        <button onClick={ this.props.openAuthModal }>
          <img src={ window.images.likeEmpty } />
        </button>
      );
    } else if (story.liked_users &&
        Object.keys(story.liked_users).includes(currentUser.id.toString())) {
      return (
        <button onClick={ this.toggleLike("delete") }>
          <img src={ window.images.likeFilled } />
        </button>
      );
    } else {
      return (
        <button onClick={ this.toggleLike("create") }>
          <img src={ window.images.likeEmpty } />
        </button>
      );
    }
  }

  renderParentSummary() {
    const { story } = this.props;
    if (story.parent_story) {
      const { parent_story } = story;
        return(
          <Link to={ `/stories/${parent_story.id}` }>
            <ul className="parent-story-container">
              <li>{ parent_story.title }</li>
              <li>{ parent_story.author.name }</li>
            </ul>
          </Link>
        );
    }
  }

  renderTagList() {
    const { story } = this.props;
    const tagList = story.tags.map( (tag) => (
      <li key={ tag.id }>
        <Link to={`tags/${tag.name}`} className="tag-button">
          { tag.name }
        </Link>
      </li>
    ));
    return(
      <ul className="tag-list">
        { tagList }
      </ul>
    );
  }

  render() {
    const { story, currentUser } = this.props;

    if (story) {
      const author = story.author;
      return (
        <main className="story-show-container">
          <section className="story-content-container">
            <header className="story-show-header">
              <div>
                <Link to={`/@${author.username}`}>
                  <img src={ author.avatar_url }
                    className="instory-avatar avatar" />
                </Link>
              </div>
              <div>
                <ul className="story-detail-info">
                  <li>
                    <Link to={`/@${author.username}`}>
                      {author.name}
                    </Link>
                  </li>
                  <li className="description">
                    description of {author.name}
                  </li>
                  <li className="description">
                    {story.published_at}
                  </li>
                </ul>
              </div>
            </header>
            <section className="story-show-details">
              { this.renderParentSummary() }
              <h1 className="story-show-title">
                { story.title }
              </h1>
              <h3 className="story-show-subtitle">
                { story.sub_title }
              </h3>
              { this.renderImage() }
              <p className="story-show-content">
                { story.content }
              </p>
            </section>
            <ul className="post-story-actions flex-tag-like">
              <li>
                { this.renderTagList() }
              </li>
              <li className="like-info">
                { this.renderLikeButton() }
                <div className="num-likes">
                  { values(story.liked_users).length }
                </div>
              </li>
            </ul>
            <footer className="story-show-footer">
                <div>
                  <Link to={`/@${author.username}`}>
                    <img src={ author.avatar_url }
                      className="instory-avatar avatar" />
                  </Link>
                </div>
                <div>
                  <ul className="story-detail-info">
                    <li className="footer-author">
                      <Link to={`/@${author.username}`}>
                        {author.name}
                      </Link>
                    </li>
                    <li className="description footer-description">
                      description of {author.name}
                    </li>
                  </ul>
                </div>
            </footer>
          </section>
          <section className="response-container">
            <div className="response-contents">
              <div className="response-text">Responses</div>
              <CommentForm currentUser={ currentUser }
                  openAuthModal={this.props.openAuthModal}/>
              <CommentIndex currentUser={ currentUser }
                  parentId = { this.props.params.storyId }
                  openAuthModal={this.props.openAuthModal}/>
            </div>
          </section>

          <AuthModal />
        </main>
      );
    } else {
      return (<div className="loading"></div>);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    story: state.stories[ownProps.params.storyId],
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchStoryAndComments: (parentId) => (
      dispatch(fetchStoryAndComments(parentId))
    ),
    createLike: (like) => (dispatch(createLike(like))),
    deleteLike: (like) => (dispatch(deleteLike(like))),
    openAuthModal: () => (dispatch(openModal("authIsOpen")))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryShow);
