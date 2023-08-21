const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};
const config1 = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};

export { config, config1 };
