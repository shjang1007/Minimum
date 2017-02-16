export const fetchStories = () => {
  return $.ajx({
    method: "GET",
    url: "api/stories"
  });
};

export const fetchStory = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/stories/${id}`
  });
};

export const createStory = (story) => {
  return $.ajax({
    method: "POST",
    url: "api/stories",
    data: { story }
  });
};

export const updateStory = (story) => {
  return $.ajax({
    method: "PATCH",
    url: `api/stories/${id}`,
    data: { story }
  });
};

export const deleteStory = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `api/stories/${id}`
  });
};