function main(){ 
  const buttonHomogeneous = document.querySelector(".button_homogeneous");
  buttonHomogeneous.addEventListener('click', () => createElementHomogeneous(new Homogeneous()))

  const buttonHeterogeneous_power = document.querySelector(".button_powerFunction");
  buttonHeterogeneous_power.addEventListener('click', () => createElementHeterogeneous(new Power()))

  const buttonHeterogeneous_polynomial = document.querySelector(".button_polynomial");
  buttonHeterogeneous_polynomial.addEventListener('click', () =>  createElementHeterogeneous(new Polynomial()));
  
  const buttonHeterogeneous_trigonometricF = document.querySelector(".button_trigonometricFunction");
  buttonHeterogeneous_trigonometricF.addEventListener('click', () => createElementHeterogeneous(new TrigonometricF()))
}

main()

function createElementHomogeneous(equation){
  const element = createNewDiv(equation.getResult())
  addElementToHomogeneousDiv(element)
}

function addElementToHomogeneousDiv(appendElement){ 
  const resultDiv = document.querySelector(".result_homogeneous")
  resultDiv.appendChild(appendElement)
  return resultDiv
}

function createElementHeterogeneous(equation){
  const element = createNewDiv(equation.getResult())
  addElementToHeterogeneousDiv(element)
}

function addElementToHeterogeneousDiv(appendElement){
  const resultDiv = document.querySelector(".result_heterogeneous")
  resultDiv.appendChild(appendElement)
  return resultDiv
}

function createNewDiv(textContent){ //создает элемент
  const resultH1 = document.createElement('div');
  resultH1.textContent = textContent;
  return resultH1;
}

class Homogeneous {
  getResult() {
    return this.generate()
  }

  generate() { //генерация однородных
    const orderRatio = getRandomNumber(1, 5);
  
    let equation = `${getRandomNumber(1, 10)} * a(n) = ${getRandomNumber(1, 10)} * a(n-1)`;
    for (let i = 2; i <= orderRatio; i++) {
      equation += ` + ${getRandomNumber(1, 10)} * a(n - ${i})`;
    }
  
    return equation;
  }
}

class Power extends Homogeneous{
  getResult() {
    return super.generate() + this.generate()
  }
  
  generate() { //генерация степенных неоднородных
    const kolvo = getRandomNumber(1, 5);
  
    let rightPart = '';
    for (let i = 0; i < kolvo; i++) {
      rightPart += ` + ${getRandomNumber(1, 10)} ^ n + ${getRandomNumber(1, 10)}`;
    }
    return rightPart;
  }
}

class Polynomial extends Homogeneous{
  getResult() {
    return super.generate() + this.generate()
  }
  
  generate() {
    const kolvo = getRandomNumber(2, 6);
  
    let rightPart = '';
    for (let i = kolvo; i > 1; i--) {
      rightPart += ` + ${getRandomNumber(1, 10)} * n ^ ${i}`;
    }
    return rightPart;
  }
}

class TrigonometricF extends Homogeneous{
  getResult() {
    return super.generate() + this.generate()
  }
  
  generate() { //генерация степенных неоднородных
    const rightPart = ` + sin(pi * n)/${getRandomNumber(1, 5)}`;
    const rightPart_1 = `+ cos(pi * n)/${getRandomNumber(1, 5)}`;
   
    if (getRandomNumber(0, 1) == 0)
      return rightPart_1
    return rightPart;
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


