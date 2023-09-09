const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URl}/api`;

export const postData = (url, body) => {
  return fetch(`${baseURL}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const postFormData = (url, body) => {
  return fetch(`${baseURL}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: body,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const patchFormData = (url, body) => {
  return fetch(`${baseURL}${url}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
    },
    body: body,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getData = (url, body) => {
  return fetch(`${baseURL}${url}`, {
    method: "GET",
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const deleteData = (url, body) => {
  return fetch(`${baseURL}${url}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })

    .catch((err) => console.log(err));
};

export const sellerProfileImage = (filename) =>
  `${baseURL}/getSellerProfileImage?filename=${filename}`;
export const paintngImage = (filename) =>
  `${baseURL}/getPaintingImage?filename=${filename}`;

// Local Storage Helpers

export const authUserInternal = (data) => {
  localStorage.setItem("gov-ecom-auth", JSON.stringify(data));
};
export const signOutInternal = () => {
  localStorage.clear("gov-ecom-auth");
};
