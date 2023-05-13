// Add your javascript here

let isMultiple = false;

const $checkbox = document.querySelector(".checkbox");

$checkbox.addEventListener("change", () => {
  isMultiple = !isMultiple;
});
const $titleSection = document.querySelector("[data-testid='1'] > .title-section");
$titleSection.classList.add("open");
const $expandIcons = document.querySelectorAll(".expand-icon");
const $titles = document.querySelectorAll(".title");
const $collapseIcons = document.querySelectorAll(".collapse-icon");

[...$expandIcons, ...$titles, ...$collapseIcons].forEach(($elementRef) => {
  const $titleSectionEvent = $elementRef.closest(".title-section");
  const $titleSections = document.querySelectorAll(".title-section");

  $elementRef.addEventListener("click", () => {
    if (!isMultiple) {
      $titleSections.forEach(($titleSection) => {
        if ($titleSectionEvent !== $titleSection) {
          $titleSection.classList.remove("open");
        }
      });
    }
    $titleSectionEvent.classList.toggle("open");
  });
});
