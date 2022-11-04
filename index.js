const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const submitForm = document.querySelector(".form");
const button = document.getElementById("button");
const radioBtnOn = document.getElementById("fireON");
const radioBtnOff = document.getElementById("fireOFF");
const countField = document.getElementById("fire2");
const buttonHeart = document.getElementById("imgHeart");
const overflow = document.documentElement
const heart = String.fromCharCode(10084);

function addHeart() {
  form1.value += heart;
}

function countHeart() {
  let countHeart = 0;
  let field = [...form1.value];
  for (let i = 0; i < field.length; i++) {
    if (field[i] === heart) {
      countHeart++;
    }
  }
  return countHeart;
}

buttonHeart.addEventListener("click", addHeart);
buttonHeart.addEventListener("click", countHeart);
buttonHeart.onclick = function(){
if(buttonHeart.onclick){
  form1.focus()
}
}

function isCheckRadioBtn() {
  if (radioBtnOn.checked) {
    countField.style.display = "block";
    overflow.style.overflow = 'visible';
    countField.focus()
  }
  if (radioBtnOff.checked) {
    countField.style.display = "none";
    overflow.style.overflow = 'hidden';
    countField.value = 0;
  }
}

countField.addEventListener('keydown', function(event){
  if(event.code == "Enter" || event.code == "NumpadEnter"){
    event.preventDefault()
      handleClick()
   }
})

radioBtnOn.addEventListener("click", isCheckRadioBtn);
radioBtnOff.addEventListener("click", isCheckRadioBtn);

function countWord(str = form1.value) {
  let countCoastWordWithoutPirotecnics = (
    item = arr.length - countHeart(),
    count = countField.value
  ) => {
    let result = 0;
    let countHeartNumbers = countHeart();
    if (item > 0 && !str.includes(heart)) {
      result = Math.ceil(
        (item * 15 + countHeartNumbers * 25 - 30) / 2 + 30 + count * 7
      );
    }
    if (item > 0 && str.includes(heart)) {
      result = Math.ceil(
        (item * 15 + countHeartNumbers * 25 - 30) / 2 + 30 + count * 7
      );
    }
    if (!item && str.includes(heart)) {
      result = Math.ceil((countHeartNumbers * 25 - 30) / 2 + 30 + count * 7);
    }
    if(!form1.focus()){
      form1.blur()
    }
    return result < 50 ? 50 : result;
  };

  let countCoastWordWithPirotecnics = (
    item = arr.length - countHeart(),
    count = countField.value
  ) => {
    let result = 0;
    let countHeartNumbers = countHeart();
    if (item > 0) {
      result =
        Math.ceil(
          (item * 15 + countHeartNumbers * 25 - 30) / 2 + 30 + count * 7
        ) +
        (item + countHeart()) * 7;
    }
    if (!item && str.includes(heart)) {
      result =
        Math.ceil((countHeartNumbers * 25 - 30) / 2 + 30 + count * 7) +
        countHeart() * 7;
    }
    return result < 50 ? 50 : result;
  };

  let arr = str.toLowerCase().split("");
  arr.forEach((element, i) => (element === " " ? arr.splice(i, 1) : element));

  return `символы ---- ${arr}
длинна надписи, шт. ---- ${arr.length}
количество букв,шт. ---- ${arr.length - countHeart()}
количество сердец, шт ---- ${countHeart()}
доп.фонтанов, шт. ---- ${countField.value > 0 ? countField.value : 0}

Стоимость без пиротехнического поджига, у.е.  ---- ${countCoastWordWithoutPirotecnics()}
Стоимость с пиротехническим поджигом, у.е. ---- ${countCoastWordWithPirotecnics()}`;
}

const handleClick = () => {
  if (form1.value) {
    form2.value = countWord();
  } else {
    form2.placeholder = "Введите текст";
  }
};

form1.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    handleClick();
    button.style.backgroundColor = "#be81f0";
    setTimeout(function () {
      button.style.backgroundColor = "#f4f5f6";
    }, 100);
  }
});
button.addEventListener("click", handleClick);

if (window.screen.width < 500) {
  form1.oninput = () => {
    form2.value = countWord();
    form1.focus()
  };
} else if (window.screen.width > 500) {
  form1.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      handleClick();
      button.style.backgroundColor = "#be81f0";
      setTimeout(function () {
        button.style.backgroundColor = "#f4f5f6";
      }, 100);
    }
  });
  button.addEventListener("click", handleClick);
}

