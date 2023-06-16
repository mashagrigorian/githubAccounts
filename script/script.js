const API = "https://api.github.com/users";

const nameInput = document.querySelector(".searchInput");
const searchButton = document.querySelector(".searchButton");
const name = document.querySelector(".aboutUser h1");
const profilePhoto = document.querySelector(".profilePhoto");
const profileLink = document.getElementById("profileLink");
const numberRepos = document.getElementById("repos");
const followersNum = document.getElementById("followers");
const followingsNum = document.getElementById("following");
const locationOfUsers = document.getElementById("usersLocation");
const socialMedias = document.getElementById("socialTwitter");
const dataAnswer = document.getElementById("usersInfo");
const errorMessage = document.getElementById("errorMessage");

class FetchApi {
  constructor(domain) {
    this.domain = domain;
  }

  async get() {
    const response = await fetch(this.domain);
    const data = response.json();
    return data;
  }
}

const gitHubApi = new FetchApi("https://api.github.com/users");

function searchUser() {
  const searchName = nameInput.value.trim();

  if (searchName) {
    const searchUrl = `${API}/${searchName}`;

    gitHubApi.domain = searchUrl;
    gitHubApi
      .get()
      .then((data) => {
        console.log(data);
        if (data.message === "Not Found") {
          showErrorMessage("User not found.");
          dataAnswer.classList.remove("active");
        } else {
          dataAnswer.classList.add("active");
          errorMessage.textContent = ""; // Clear any previous error message
          const userName = data.name;
          const userLogin = data.login;
          const avatarPhoto = data.avatar_url;
          const linkOfGitHubProfile = data.html_url;
          const repos = data.public_repos;
          const usersFollowers = data.followers;
          const usersFollowing = data.following;
          const location = data.location;
          const usersTwitter = data.twitter_username;

          profilePhoto.src = avatarPhoto;
          profileLink.innerHTML = "@" + userLogin;
          profileLink.href = linkOfGitHubProfile;
          name.innerHTML = userName;
          numberRepos.innerHTML = "Repos" + "<br>" + repos;
          followersNum.innerHTML = "Followers" + "<br>" + usersFollowers;
          followingsNum.innerHTML = "Following" + "<br>" + usersFollowing;

          if (usersTwitter === null) {
            socialMedias.innerHTML = "Not Available";
          } else {
            socialMedias.innerHTML = usersTwitter;
            console.log(usersTwitter);
          }
          if (location === null) {
            locationOfUsers.innerHTML = "Not Available";
          } else {
            locationOfUsers.innerHTML = location;
          }
        }
      })
      .catch((error) => {
        console.log("Oops, error:", error);
        showErrorMessage("An error occurred. Please try again.");
      });
  } else {
    showErrorMessage("Please enter a username.");
  }
}

function showErrorMessage(message) {
  errorMessage.textContent = message;
}

searchButton.addEventListener("click", searchUser);

nameInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    if (!nameInput.value.trim()) {
      showErrorMessage("Please enter a username.");
    } else {
      searchUser();
    }
  }
});
