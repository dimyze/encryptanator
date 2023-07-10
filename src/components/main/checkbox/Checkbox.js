import styles from "./Checkbox.module.css";

function Checkbox({ labelName, checkboxesState, setCheckboxesState, id }) {
  return (
    <label htmlFor={labelName} className={styles.checkboxLabel}>
      <input
        type="checkbox"
        id={labelName}
        checked={checkboxesState[id] ? "checked" : ""}
        onChange={(e) => {
          e.target = !checkboxesState[id];
          let nextCheckBoxesState = [...checkboxesState];
          nextCheckBoxesState[id] = !checkboxesState[id];
          setCheckboxesState(nextCheckBoxesState);
        }}
        disabled={
          checkboxesState.filter((el) => el === true).length === 1 &&
          checkboxesState[id]
            ? "disabled"
            : ""
        }
      />
      {labelName}
    </label>
  );
}

export default Checkbox;
