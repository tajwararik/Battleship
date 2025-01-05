import {
  createPlayerBoard,
  createComputerBoard,
} from "./modules/domGameHandle.js";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  createPlayerBoard();
  createComputerBoard();
});
