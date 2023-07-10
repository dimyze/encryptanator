import { useState } from "react";
import styles from "./Main.module.css";
import PasswordBox from "./password-box/PasswordBox";
import Slider from "./slider/Slider";
import Checkbox from "./checkbox/Checkbox";

function Main() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [passwordLength, setPasswordLength] = useState(16);
  const [checkboxesState, setCheckboxesState] = useState([true, false, false]);
  const checkBoxesList = ["Letters", "Digits", "Symbols"].map((el, index) => (
    <Checkbox
      labelName={el}
      checkboxesState={checkboxesState}
      setCheckboxesState={setCheckboxesState}
      id={index}
      key={index}
    />
  ));
  const randomNumbersGenerator = (numOfNumbers, sumOfNumbers) => {
    let output = [];
    let sumOfOutputEntries = 0;
    for (let i = numOfNumbers - 1; i > 0; i--) {
      output.push(
        Math.ceil(Math.random() * (sumOfNumbers - sumOfOutputEntries - i))
      );
      sumOfOutputEntries += output.at(-1);
    }
    output.push(sumOfNumbers - sumOfOutputEntries);
    return output;
  };
  const randomNumbersForCheckboxes = (
    checkboxesState,
    generatedRandomNumbers
  ) => {
    let randomNumberCount = 0;
    let output = [];
    for (let i = 0; i < checkboxesState.length; i++) {
      if (checkboxesState[i] === true) {
        output.push(generatedRandomNumbers[randomNumberCount]);
        randomNumberCount++;
      } else {
        output.push(0);
      }
    }
    return output;
  };
  const passwordGenerator = (randomNumbersForCheckboxes, passwordLength) => {
    let output = [];
    let [numOfLetters, numOfDigits, numOfSymbols] = randomNumbersForCheckboxes;
    const characters = [
      ["AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz", numOfLetters],
      ["0123456789", numOfDigits],
      ["!@#$%^&*", numOfSymbols],
    ];
    const charactersToUse = characters.filter((el) => el[1] !== 0);
    for (let i = 0; i < passwordLength; i++) {
      let randomSelection = Math.floor(Math.random() * charactersToUse.length);

      if (charactersToUse[randomSelection][1] === 0) {
        charactersToUse.splice(randomSelection, 1);
      }
      while (charactersToUse[randomSelection] === undefined) {
        randomSelection = Math.floor(Math.random() * charactersToUse.length);
      }
      let randomCharacterIndex =
        Math.random() * charactersToUse[randomSelection][0].length;
      output.push(
        charactersToUse[randomSelection][0].charAt(randomCharacterIndex)
      );
      charactersToUse[randomSelection][1]--;
    }
    return output;
  };

  const characterNumbersList = randomNumbersForCheckboxes(
    checkboxesState,
    randomNumbersGenerator(
      checkboxesState.filter((el) => el === true).length,
      passwordLength
    )
  );

  const generatedPassword = passwordGenerator(
    characterNumbersList,
    passwordLength
  );

  return (
    <main className={styles.main}>
      <div className={styles.wrapperPassword}>
        <p className={styles.label}>Generated Password</p>
        <PasswordBox
          generatedPassword={generatedPassword}
          refreshCount={refreshCount}
          setRefreshCount={setRefreshCount}
          passwordLength={passwordLength}
        />
      </div>
      <div className={styles.wrapperCustomizations}>
        <div className={styles.wrapperSlider}>
          <p className={styles.label}>Length: {passwordLength}</p>
          <Slider
            passwordLength={passwordLength}
            setPasswordLength={setPasswordLength}
          />
        </div>
        <div className={styles.wrapperCheckboxes}>{checkBoxesList}</div>
      </div>
    </main>
  );
}

export default Main;
