function getPosts() {
    const getPosts = () => {
      return fetch("http://localhost:8000/api/posts", {
        type: "GET",
      }).then((res) => res.json());
    };
  
    return {
      getPosts,
    };
  }
  
export default getPosts();