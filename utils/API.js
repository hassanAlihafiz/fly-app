import axios from "axios";

// let backendUrl = "https://fly-backend.herokuapp.com/";
let backendUrl = "192.168.18.7:3000/";

export async function getPostCall(url, method, data, authToken) {
  return new Promise((resolve, reject) => {
    try {
      var config = {
        method: method,
        url: backendUrl + url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        data: data,
      };
      axios(config)
        .then((e) => {
          resolve(e);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}
export async function getCall(url, method, authToken, data) {
  return new Promise((resolve, reject) => {
    try {
      var config = {
        method: method,
        url: backendUrl + url,
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken === "" ? "" : `Bearer ${authToken}`,
        },
        data: data,
      };
      axios(config)
        .then((e) => {
          resolve(e);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}
