// on key down
export const saveContentAfterPressEnter = (e) => {
  if (e.key === "Enter") {
    console.log("onPressEnter");
    e.preventDefault();
    e.target.blur();
  }
};

// select all input values
export const selectAllInlineText = (e) => {
  e.target.focus();
  e.target.select();
};
