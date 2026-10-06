const profileCard = document.querySelector(".profile-card");

profileCard.addEventListener("click", () => {
  const isFlipped = profileCard.classList.toggle("is-flipped");
  profileCard.setAttribute("aria-pressed", String(isFlipped));
  profileCard.setAttribute(
    "aria-label",
    isFlipped ? "Return to profile photo" : "Show introduction code",
  );
});

const projectForm = document.querySelector("#project-form");
const addProjectButton = document.querySelector(".add-project");
const projectsList = document.querySelector("#projects-list");

addProjectButton.addEventListener("click", () => {
  const isExpanded = addProjectButton.getAttribute("aria-expanded") === "true";
  addProjectButton.setAttribute("aria-expanded", String(!isExpanded));
  projectForm.hidden = isExpanded;

  if (!isExpanded) {
    projectForm.elements.title.focus();
  }
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(projectForm);
  const title = String(formData.get("title")).trim();
  const description = String(formData.get("description")).trim();
  const tag = String(formData.get("tag")).trim() || "NEW PROJECT";

  if (!title || !description) {
    return;
  }

  const card = document.createElement("article");
  card.className = "project-card";

  const number = document.createElement("span");
  number.className = "project-number";
  number.textContent = String(projectsList.children.length + 1).padStart(2, "0");

  const projectTag = document.createElement("span");
  projectTag.className = "project-tag";
  projectTag.textContent = tag;

  const heading = document.createElement("h3");
  heading.textContent = title;

  const details = document.createElement("p");
  details.textContent = description;

  const rule = document.createElement("span");
  rule.className = "project-rule";

  card.append(number, projectTag, heading, details, rule);
  projectsList.prepend(card);
  projectForm.reset();
  projectForm.hidden = true;
  addProjectButton.setAttribute("aria-expanded", "false");
});
