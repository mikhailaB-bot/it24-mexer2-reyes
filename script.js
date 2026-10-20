const loadBtn = document.getElementById("loadBtn");
const searchInput = document.getElementById("searchInput");
const postsDiv = document.getElementById("posts");
const message = document.getElementById("message");

let allPosts = [];

function displayPosts(posts) {
  postsDiv.innerHTML = "";
  message.className = "";

  if (posts.length === 0) {
    message.textContent = "No post found";
    return;
  }

  message.textContent = "";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
    postsDiv.appendChild(div);
  });
}

async function loadPosts() {
  postsDiv.innerHTML = "";
  message.className = "";
  message.textContent = "Loading...";
  searchInput.value = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    
    if (!response.ok) throw new Error("Request failed: " + response.status);

    const posts = await response.json();

    // keep only the first 10 posts
    allPosts = posts.slice(0, 10);
    displayPosts(allPosts);
  } catch (error) {
    message.className = "error";
    message.textContent = "Error: could not load posts. " + error.message;
  }
}

function searchPosts() {
  if (allPosts.length === 0) return; // nothing loaded yet

  const keyword = searchInput.value.toLowerCase().trim();
  const results = allPosts.filter(post =>
    post.title.toLowerCase().includes(keyword) ||
    post.body.toLowerCase().includes(keyword)
  );
  displayPosts(results);
}

loadBtn.addEventListener("click", loadPosts);
searchInput.addEventListener("input", searchPosts);