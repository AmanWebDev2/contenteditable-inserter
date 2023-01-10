const contentEditableContainer = document.querySelector(
  ".contentEditable-container"
);
const contentEditable = document.querySelector(
  ".contentEditable"
);
const ruleSet = document.getElementById("ruleset");

console.log(contentEditableContainer);

function createInsertBlock() {
  const insertBlock = document.createElement('insert-block');
  insertBlock.classList.add('inserter')
  contentEditable.firstElementChild.before(insertBlock);
}
createInsertBlock();

const inserter = document.querySelector('.inserter');
contentEditableContainer.addEventListener("mousemove", (event) => {
  ruleSet.style.top = event.offsetY;
  const rect = event.target.getBoundingClientRect();
  const topHalf = event.clientY - rect.top < rect.height / 2;
  const elm = event.target;
  if (topHalf) {
    if(!elm.classList.contains('contentEditable')){
      elm.before(inserter);
    }
    // console.log("Mouse is hovering over the top half of the element",topHalf);
  } else {
    console.log(elm)
    if(!elm.classList.contains('contentEditable')){
      elm.after(inserter)
    }
    // console.log("Mouse is hovering over the bottom half of the element");
  }
  const inserterRect = inserter.getBoundingClientRect();
  // console.dir(inserterRect.top - contentEditableContainer.firstElementChild.scrollTop)
  // console.log(inserter.offsetTop);
  // console.log(contentEditableContainer.firstElementChild.scrollTop)
  const relativeTop = getCalcVal(inserter,contentEditableContainer);
  // ruleSet.style.top = (inserter.offsetTop-contentEditableContainer.firstElementChild.scrollTop)+"px";
  // console.log(event.offsetY);
  ruleSet.style.top = relativeTop+"px"
});

function getCalcVal(inserter,contentEditableContainer){
  const inserterRect = inserter.getBoundingClientRect();
  const contentEditableRect = contentEditable.getBoundingClientRect();  
  console.log(inserterRect.top - contentEditableRect.top)
  return inserterRect.top - contentEditableRect.top
}
