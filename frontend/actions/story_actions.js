import * as storyApiUtil from "../util/story_api_util";
import * as userApiUtil from "../util/user_api_util";
import { closeModal } from "./modal_actions";

export const RECEIVE_STORIES = "RECEIVE_STORIES";
export const RECEIVE_NEXT_STORIES = "RECEIVE_NEXT_STORIES";
export const RECEIVE_LIKE_STORIES = "RECEIVE_LIKE_STORIES";
export const RECEIVE_STORY = "RECEIVE_STORY";
export const REMOVE_STORY = "REMOVE_STORY";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const CLEAR_STORY = "CLEAR_STORY";

export const fetchStories = (tag_name) => (dispatch) => {
  return storyApiUtil.fetchStories(tag_name).then(
    (stories) => {
      return dispatch(receiveStories(stories));
    }
  );
};

export const fetchNextStories = (from_id) => (dispatch) => {
  return storyApiUtil.fetchNextStories(from_id).then(
    (stories) => {
      return dispatch(receiveNextStories(stories));
    }
  );
};

export const fetchSearchStories = (search) => (dispatch) => {
  return storyApiUtil.fetchSearchStories(search).then(
    (stories) => {
      return dispatch(receiveStories(stories));
    }
  );
};

export const fetchTopStories = () => (dispatch) => {
  return storyApiUtil.fetchTopStories().then(
    (stories) => {
      return dispatch(receiveStories(stories));
    }
  );
};

export const fetchBrianStories = () => (dispatch) => {
  return storyApiUtil.fetchBrianStories().then(
    (stories) => {
      return dispatch(receiveStories(stories));
    }
  );
};

export const fetchStory = (id) => (dispatch) => {
  return storyApiUtil.fetchStory(id).then(
    (story) => {
      return dispatch(receiveStory(story));
    }
  );
};

// export const fetchStoryAndComments = (parentId) => (dispatch) => {
//   return storyApiUtil.fetchStoryAndComments(parentId).then(
//     (stories) => {
//       return dispatch(receiveStories(stories));
//     }
//   );
// };

// export const fetchUserStories = (username) => (dispatch) => {
//   return userApiUtil.fetchUserStories(username).then(
//     (stories) => {
//       return dispatch(receiveStories(stories));
//     }
//   );
// };

export const createStory = (story) => (dispatch) => {
  return storyApiUtil.createStory(story).then(
    (story) => {
      return dispatch(receiveStory(story));
    }
  );
};

export const createStoryImage = (formData) => (dispatch) => {
  return storyApiUtil.createStoryImage(formData).then(
    (story) => (dispatch(receiveStory(story)))
  );
};

export const updateStory = (story) => (dispatch) => {
  return storyApiUtil.updateStory(story).then(
    (story) => (dispatch(receiveStory(story)))
  );
};

export const updateStoryImage = (formData) => (dispatch) => {
  return storyApiUtil.updateStoryImage(formData).then(
    (story) => (dispatch(receiveStory(story)))
  );
};

export const createComment = (comment) => (dispatch) => {
  return storyApiUtil.createStory(comment).then(
    (comment) => {
      return comment;
    }
  );
};

export const updateComment = (comment) => (dispatch) => {
  return storyApiUtil.updateStory(comment).then(
    (comment) => {
      return comment;
    });
};

export const publishComment = (comment) => (dispatch) => {
  return storyApiUtil.updateStory(comment).then(
    (comment) => {
      return (dispatch(receiveComment(comment)));
    });
};

export const deleteStory = (id) => (dispatch) => {
  return storyApiUtil.deleteStory(id).then(
    () => (dispatch(closeModal("deleteIsOpen")))
  );
};

export const clearStory = () => {
  return ({
    type: CLEAR_STORY
  });
};

export const receiveStories = (stories) => {
  return ({
    type: RECEIVE_STORIES,
    stories
  });
};

export const receiveNextStories = (stories) => {
  return ({
    type: RECEIVE_NEXT_STORIES,
    stories
  });
};

export const receiveLikeStories = (story) => {
  return ({
    type: RECEIVE_LIKE_STORIES,
    story
  });
};

export const receiveStory = (story) => {
  return ({
    type: RECEIVE_STORY,
    story
  });
};

export const receiveComment = (comment) => {
  return ({
    type: RECEIVE_COMMENT,
    comment
  });
};

export const removeStory = (story) => {
  return ({
    type: REMOVE_STORY,
    story
  });
};
