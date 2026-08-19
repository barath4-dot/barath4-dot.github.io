// Small enhancement: highlight the current navigation link while scrolling.
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  links.forEach(link => {
    link.style.color = link.getAttribute("href") === "#" + current ? "#f4f7fb" : "";
  });
});
