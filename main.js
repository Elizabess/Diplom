function main(){ 
  connectOpenMenuButtons()
  connectGenerateHomogeneous()
  connectHeterogeneousButtons()
}

function connectOpenMenuButtons(){
  document.querySelector(".open_first_order_menu").addEventListener('click', () => openFirstMenu())
  document.querySelector(".open_second_order_menu").addEventListener('click', () => openSecondMenu())
  document.querySelector(".open_third_order_menu").addEventListener('click', () => openThirdMenu())
}

function openFirstMenu(){
  openElement(document.querySelector(".first_order_menu"))
  
  closeElement(document.querySelector(".second_order_menu"))
  closeElement(document.querySelector(".third_order_menu"))
}

function openSecondMenu(){
  openElement(document.querySelector(".second_order_menu"))
  
  closeElement(document.querySelector(".first_order_menu"))
  closeElement(document.querySelector(".third_order_menu"))
}

function openThirdMenu(){
  openElement(document.querySelector(".third_order_menu"))
  
  closeElement(document.querySelector(".first_order_menu"))
  closeElement(document.querySelector(".second_order_menu"))
}

function closeElement(element){
  element.classList.remove("open_menu")
  element.classList.add("close_menu")
}

function openElement(element){
  element.classList.remove("close_menu")
  element.classList.add("open_menu")
}

function connectGenerateHomogeneous(){
  document.querySelector(".generate_first_order").addEventListener('click', () => FirstOrder.generateFirstOrder())
  document.querySelector(".generate_second_order").addEventListener('click', () => SecondOrder.generateSecondOrder())
  document.querySelector(".generate_third_order").addEventListener('click', () => ThirdOrder.generateThirdOrder())
}

class FirstOrder {
  static generateFirstOrder(){
    const root = getRandomNumber(1, 10);
    const orderText = this.getFirstOrder(root)
    const ansText = createAnswerStr([root])
    addElementToHomogeneousDiv(createTaskElement(orderText, ansText))
  }

  static getFirstOrder(root){
    return createStrEquation([- root])
  }
}

class SecondOrder {
  static generateSecondOrder() {
    const root1 = getRandomNumber(1, 10);
    const root2 = getRandomNumber(1, 10);

    const orderText = this.getSecondOrder(root1, root2)
    const ansText = createAnswerStr([root1, root2])
    addElementToHomogeneousDiv(createTaskElement(orderText, ansText))
  }

  static getSecondOrder(root1, root2) {
    const b = -1*(root1 + root2);
    const c = root1 * root2;
    
    return createStrEquation([b, c])
  }
}

class ThirdOrder {
  static generateThirdOrder() {
    const root1 = getRandomNumber(1, 10);
    const root2 = getRandomNumber(1, 10);
    const root3 = getRandomNumber(1, 10);


    const orderText = this.getThirdOrder(root1, root2, root3)
    const ansText = createAnswerStr([root1, root2, root3])
    addElementToHomogeneousDiv(createTaskElement(orderText, ansText))
  }

  static getThirdOrder(root1, root2, root3) {
    const b = -1 * (root1 + root2 + root3);
    const c = root1 * root2 + root1 * root3 + root2 * root3;
    const d = -1 * (root1 * root2 * root3);

    return createStrEquation([b, c, d])
  }
}

function createAnswerStr(roots) {
  if (roots.length === 1) {
    return `a_(0,0) = (C_1 + C_2 * n) * (${roots[0]})^(n-1)`;
  } else if (roots.length === 2) {
    return `a_(0,0) = ((C_1 * (${roots[0]} ^(n-1))) + (C_2 * (${roots[1]}^(n-1))))`
  } else if (roots.length === 3) {
    return `a_(0,0) = C_1 * ${roots[0]} ^(n-1) + C_2 * ${roots[1]}^(n-1) + C_3 * ${roots[2]} ^(n-1)`
  }
}

function createStrEquation(coeff){
  let result = "a(n) "
  for (let i = 0; i < coeff.length; i++){      
    if (coeff[i] == 1)
      result += ` + a(n - ${i + 1}) `
    else if (coeff[i] == -1)
      result += ` - a(n - ${i + 1}) `
    else if (coeff[i] > 0)
      result += ` + ${coeff[i]} * a(n - ${i + 1}) `
    else if (coeff[i] < 0)
      result += ` - ${-coeff[i]} * a(n - ${i + 1}) `
  }

  return result += " = 0"
}

function addElementToHomogeneousDiv(appendElement){ 
  const resultDiv = document.querySelector(".result_homogeneous")
  resultDiv.appendChild(appendElement)
  return resultDiv
}

function connectHeterogeneousButtons(){
  document.querySelector(".button_powerFunction").addEventListener('click', () => createElementHeterogeneous(new Power()))
  document.querySelector(".button_polynomial").addEventListener('click', () =>  createElementHeterogeneous(new Polynomial()));
  document.querySelector(".button_trigonometricFunction").addEventListener('click', () => createElementHeterogeneous(new TrigonometricF()))
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

class Homogeneous {
  getResult() {
    return this._generate()
  }
  
  // generate() {
  //   const randomNumber = getRandomNumber(1, 3);
  //   let equation

  //   if (randomNumber === 1) {
  //     equation = FirstOrder.generateFirstOrder()
  //   } else if (randomNumber === 2) {
  //     equation = SecondOrder.generateSecondOrder()
  //   } else {
  //     equation = ThirdOrder.generateThirdOrder()
  //   }

  //   return equation
  // }
  _generate() { //генерация однородных
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
    return super._generate() + this._generate() //было _generate() 
  }
  
  _generate() { //генерация степенных неоднородных
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
    return super._generate() + this._generate()
  }
  
  _generate() {
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
    return super._generate() + this._generate()
  }
  
  _generate() { //генерация степенных неоднородных
    const rightPart = ` + sin(pi * n)/${getRandomNumber(1, 5)}`;
    const rightPart_1 = ` + cos(pi * n)/${getRandomNumber(1, 5)}`;
    
    if (getRandomNumber(0, 1) == 0)
      return rightPart_1
    return rightPart;
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNewDiv(textContent){ //создает элемент
  const resultH1 = document.createElement('div');
  resultH1.textContent = textContent;
  return resultH1;
}

function createTaskElement(textEquations, textAns){
  const bodyDiv = document.createElement('div');
  const equationText = document.createElement('p')
  const showAnsButton  = document.createElement('button')
  showAnsButton.className = "response_output";
  equationText.className = "response_text";

  bodyDiv.appendChild(equationText);
  bodyDiv.appendChild(showAnsButton);

  equationText.textContent = textEquations
  showAnsButton.textContent = 'Ответ'

  showAnsButton.addEventListener('click', () => {
    const ansText = document.createElement('p')
    ansText.textContent = `Ответ: ${textAns}`
    bodyDiv.appendChild(ansText);

    closeElement(showAnsButton)
  })

  return bodyDiv
}

main()
