import {
  createPlayerBoard,
  createComputerBoard,
  handleDisplayMessage,
} from "./modules/domGameHandle.js";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  createPlayerBoard();
  createComputerBoard();
  handleDisplayMessage();
});
