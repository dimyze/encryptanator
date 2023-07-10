import { useRef } from "react";
import styles from "./PasswordBox.module.css";
import { RefreshCw, Copy } from "feather-icons-react";

function PasswordBox({
  generatedPassword,
  refreshCount,
  setRefreshCount,
  passwordLength,
}) {
  let warnMessage = "Copied to Clipboard!";
  const copyToClipboardRef = useRef();
  let passwordToDisplay = [];
  generatedPassword.forEach((el, index) => {
    let elementType = undefined;
    if (Boolean(el.match(/^[0-9]$/g))) {
      elementType = "number";
    } else if (Boolean(el.match(/^[!@#$%^&*]$/g))) {
      elementType = "symbol";
    }
    passwordToDisplay.push(
      <span className={styles[elementType]} key={index}>
        {el}
      </span>
    );
  });
  if (navigator.clipboard === undefined) {
    warnMessage = "Error. Please copy manually";
  }
  let passwordStrengthColor = "#26ba58";
  if (passwordLength <= 8 && passwordLength >= 7) {
    passwordStrengthColor = "#F56904";
  } else if (passwordLength <= 6) {
    passwordStrengthColor = "#CC0505";
  }
  return (
    <>
      <div className={styles.box}>
        <div className={styles.generatedPassword}>{passwordToDisplay}</div>
        <div className={styles.icons}>
          <RefreshCw
            className={styles.icon}
            onClick={() => setRefreshCount(refreshCount + 1)}
          />
          <Copy
            className={styles.icon}
            onClick={() => {
              if (navigator.clipboard !== undefined) {
                navigator.clipboard.writeText(generatedPassword.join(""));
              }
              copyToClipboardRef.current.classList.add(styles.dropDown);
              setTimeout(
                () =>
                  copyToClipboardRef.current.classList.remove(styles.dropDown),
                1000
              );
            }}
          />
        </div>
      </div>
      <div
        className={styles.passwordStrength}
        style={{ backgroundColor: passwordStrengthColor }}
      ></div>
      <div className={styles.copyToClipboard} ref={copyToClipboardRef}>
        {warnMessage}
      </div>
    </>
  );
}

export default PasswordBox;
