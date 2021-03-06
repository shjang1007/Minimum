import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Link, withRouter } from "react-router";
import { createStory, updateStory, createComment,
        updateComment, receiveComment, publishComment }
        from "../../actions/story_actions";


class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      title: "",
      sub_title: "",
      content: "",
      parent_id: props.params.storyId,
      author_id: null,
      update: false,
      showCommentForm: false
    });

    this.update = this.update.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.toggleShowCommentForm = this.toggleShowCommentForm.bind(this);
    this.handleFullScreen = this.handleFullScreen.bind(this);
  }

  update(field) {
    const { title, sub_title, content, parent_id, author_id, update, id }
      = this.state;
    const { updateComment, createComment } = this.props;

    return (e) => {
      this.setState({[field]: e.target.value}, () => {
        if (update) {
          const comment =
            ({ title, sub_title,content, parent_id, author_id, id });
          updateComment(comment);
        } else {
          this.setState({ update: true });
          const comment = (
            { title, sub_title, content, parent_id,
              author_id: this.props.currentUser.id }
          );
          createComment(comment).then(comment => {
            this.setState({
              id: comment.id,
              author_id: this.props.currentUser.id
            });
          });
        }
      });
    };
  }

  handlePublish(e) {
    e.preventDefault();

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ];
    const date = new Date();

    const comment = {
      id: this.state.id,
      title: this.state.title,
      sub_title: this.state.sub_title,
      content: this.state.content,
      published: true,
      published_at: `${monthNames[date.getMonth()]} ${date.getDate()}`
    };

    this.props.publishComment(comment).then(
      this.setState({
        id: null,
        content: "",
        parent_id: this.props.params.storyId,
        author_id: this.props.currentUser.id,
        update: false,
        showCommentForm: false
      })
    );
  }

  toggleShowCommentForm() {
    this.setState({showCommentForm: true});
  }

  handleFullScreen(e) {
    e.preventDefault();

    const { title, sub_title, content, parent_id, author_id, update, id }
      = this.state;
    const { updateStory, createStory, router } = this.props;

    if (update) {
      const comment = ({ title, sub_title, content, parent_id, author_id, id });
      updateStory(comment).then(
        action => {
          router.push(`/${id}/edit-story`);
      });
    } else {
      const comment = (
        { title, sub_title, content, parent_id,
          author_id: this.props.currentUser.id }
      );
      createStory(comment).then(action => {
        router.push(`/${action.story.id}/edit-story`);
      });
    }
  }

  render() {
    const { currentUser } = this.props;
    const { content, showCommentForm } = this.state;

    if (isEmpty(currentUser)) {
      return (
        <div className = "index-item pre-comment-form"
          onClick={ this.props.openAuthModal }>
          <img src={window.images.bubble}
              className="icon" />
          <div className="placeholder-comment">
            Write a response...
          </div>
        </div>
      );
    }

    if (showCommentForm) {
      return (
        <main className="index-item comment-form">
          <header className="index-item-profile comment-profile">
              <Link to={`/@${currentUser.username}`}>
                <img src={ currentUser.avatar_url }
                  className="story-avatar avatar" />
              </Link>
              <div className="author-date-container">
                <Link to={`/@${currentUser.username}`}
                    className="green-button">
                  {currentUser.name}
                </Link>
              </div>
          </header>

          <form className="index-item-content">
            <textarea onChange={this.update("content")}
                className="form-content"
                value={ content }/>
            <div className="form-buttons">
              <button className="green-button button green-form-button"
                onClick={ this.handlePublish }>
                Publish
              </button>
              <button className="gray-button button"
                onClick={ this.handleFullScreen }>
                Go Full Screen
              </button>
            </div>
          </form>
        </main>
      );
    } else {
      return (
        <div className = "index-item pre-comment-form"
          onClick={ this.toggleShowCommentForm }>
          <img src={ currentUser.avatar_url }
            className="story-avatar avatar" />
          <div className="placeholder-comment">
            Write a response...
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createStory: (comment) => (dispatch(createStory(comment))),
    updateStory: (comment) => (dispatch(updateStory(comment))),
    createComment: (comment) => (dispatch(createComment(comment))),
    updateComment: (comment) => (dispatch(updateComment(comment))),
    receiveComment: (comment) => (dispatch(receiveComment(comment))),
    publishComment: (comment) => (dispatch(publishComment(comment)))
  });
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(CommentForm));
