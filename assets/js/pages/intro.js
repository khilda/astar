import { onClickBtn } from "./../evtButton.js";

export const fnIntro = () => {
  if (!document.querySelector(".intro")) return;

  onClickBtn(".intro-link", (e, _target) => {
    window.location.href = `${window.location.origin}/html/layout.html`;
  });
  descAnimation();
};

const descAnimation = () => {
  const desc = document.querySelector(".visual-text"); // Find the H2
  if (!desc) return;
  const descText = desc.innerHTML; // Get the content of the H2
  const descArr = descText.split(""); // Split content into array
  desc.innerHTML = ""; // Empty current content

  let span; // Create variables to create elements
  let letter;

  for (let i = 0; i < descArr.length; i++) {
    // Loop for every letter
    span = document.createElement("span"); // Create a <span> element
    letter = document.createTextNode(descArr[i]); // Create the letter
    if (descArr[i] == " ") {
      // If the letter is a space...
      desc.appendChild(letter); // ...Add the space without a span
    } else {
      span.appendChild(letter); // Add the letter to the span
      desc.appendChild(span); // Add the span to the h2
    }
  }
};
