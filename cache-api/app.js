const button = document.querySelector("button");

button.addEventListener("click", async () => {
  console.log(`👁️ [app.js] button clicked`);
  // const randomId = Math.floor(Math.random() * 151) + 1;
  // const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const url = `https://api.github.com/users/tandreycruz`;
  button.setAttribute("aria-busy", true);
  const data = await fetchData(url);
  button.removeAttribute("aria-busy");
  showData(data);
});

async function fetchData(url) {
  console.log(`👁️ [app.js] fetching data...`);
  return (await fetchFromCache(url)) || (await fetchFromNetwork(url));
}

async function fetchFromNetwork(url) {
  console.log(`👁️ [app.js] attempt to fetch data from network...`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        `Error on requesting ${url} with status code ${response.status}`
      );
      return;
    }
    addToCache(url, response.clone());
    // console.log(
    //   `👁️ [app.js] response content-type`,
    //   response.headers.get("content-type")
    // );
    console.log(`👁️ [app.js] request fetched successfully`);
    return response.json();
  } catch (error) {
    console.error(`👁️ [app.js] network failed`);
  }
}

async function fetchFromCache(url) {
  console.log(`👁️ [app.js] attempt to fetch data from cache...`);
  const response = await caches.match(url);
  if (!response) {
    console.log(`👁️ [app.js] no cache data for ${url}`);
    return;
  }
  console.log(`👁️ [app.js] data successfully returned from cache`);
  return response.json();
}

async function addToCache(key, response) {
  console.log(`👁️ [app.js] setting cache TTL for ${key}`);
  const cache = await caches.open("MY-CACHE-KEY");
  cache.put(key, response);
  setCacheTTL({
    cache,
    key,
    seconds: 30,
  });
  console.log(`👁️ [app.js] request ${key} was successfully added to cache`);
}

async function setCacheTTL({ cache, key, seconds }) {
  const timer = 1000 * seconds; // 30 seconds
  setTimeout(() => {
    console.log(`👁️ [app.js] deleting cache for ${key}`);
    cache.delete(key);
  }, timer);
}

function showData(data) {
  console.log(`👁️ [app.js] show data`, data);
  const card = document.createElement("article");
  card.classList.add("profile-card");

  card.innerHTML = `
    <header>
      <img src="${data.avatar_url}" alt="${
    data.name
  }" style="border-radius: 50%" width="100" />
      <h3>${data.name}</h3>
    </header>
    <p>${data.bio || "No bio available"}</p>
    <footer>
      <strong>Followers:</strong> ${data.followers}
    </footer>
  `;

  // Remove previous card if exists
  const existingCard = document.querySelector(".profile-card");
  if (existingCard) {
    existingCard.remove();
  }

  document.body.appendChild(card);
}