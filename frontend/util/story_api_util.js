export const fetchStories = (tag_name) => {
  return $.ajax({
    method: "GET",
    url: "api/stories",
    data: { tag_name }
  });
};

export const fetchNextStories = (from_id) => {
  return $.ajax({
    method: "GET",
    url: "api/stories/next",
    data: { from_id }
  });
};

export const fetchTopStories = () => {
  return $.ajax({
    method: "GET",
    url: "api/stories/top"
  });
};

export const fetchBrianStories = () => {
  return $.ajax({
    method: "GET",
    url: "api/stories/brian"
  });
};

export const fetchStory = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/stories/${id}`
  });
};

export const fetchStoryAndComments = (parentId) => {
  return $.ajax({
    method: "GET",
    url: `api/stories/${parentId}/comments`
  });
};

export const fetchUserStories = (username) => {
  return $.ajax({
    method: "GET",
    url: `api/stories/${username}`
  });
};

export const createStory = (story) => {
  return $.ajax({
    method: "POST",
    url: "api/stories",
    data: { story }
  });
};

export const createStoryImage = (formData) => {
  return $.ajax({
    method: "POST",
    url: "api/stories",
    contentType: false,
    processData: false,
    data: formData,
    dataType: "json"
  });
};

export const updateStory = (story) => {
  return $.ajax({
    method: "PATCH",
    url: `api/stories/${story.id}`,
    data: { story }
  });
};

export const updateStoryImage = (formData) => {
  return $.ajax({
    method: "PATCH",
    url: `api/stories/${formData.id}`,
    contentType: false,
    processData: false,
    data: formData,
    dataType: "json"
  });
};

export const deleteStory = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `api/stories/${id}`
  });
};
