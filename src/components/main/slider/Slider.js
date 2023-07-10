import styles from "./Slider.module.css";

function Slider({ passwordLength, setPasswordLength }) {
  return (
    <input
      type="range"
      className={styles.slider}
      min={4}
      max={40}
      step={1}
      value={passwordLength}
      onChange={(e) => setPasswordLength(e.target.value)}
    />
  );
}

export default Slider;
