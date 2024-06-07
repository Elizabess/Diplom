function main(){ 
  connectGenerateHomogeneous()
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
    const ansText = createAnswerStrFirst([root])
    addElementToHomogeneousDiv(createTaskElement(orderText, ansText))
  }

  static getFirstOrder(root){
    return createStrEquation([- root])
  }
}

class SecondOrder {
  static generateSecondOrder() {
    const root1 = getRandomNumber(-10, 10);
    const root2 = getRandomNumber(-10, 10);

    const orderText = this.getSecondOrder(root1, root2)
    const ansText = createAnswerStrSecond([root1, root2])
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
    const root1 = getRandomNumber(-10, 10);
    const root2 = getRandomNumber(-10, 10);
    const root3 = getRandomNumber(-10, 10);


    const orderText = this.getThirdOrder(root1, root2, root3)
    const ansText = createAnswerStrThird([root1, root2, root3])
    addElementToHomogeneousDiv(createTaskElement(orderText, ansText))
  }

  static getThirdOrder(root1, root2, root3) {
    const b = -1 * (root1 + root2 + root3);
    const c = root1 * root2 + root1 * root3 + root2 * root3;
    const d = -1 * (root1 * root2 * root3);

    return createStrEquation([b, c, d])
  }
}

function createAnswerStrFirst(roots) {
  if (roots[0] !== 0) {
    return `a(n) = C1  * ${roots[0]}^(n-1)`;
  }
  else {
    return `a(n) = 0`
  }
}

function createAnswerStrSecond(roots) {
  if (((roots[0] !== 0) && (roots[1] !== 0)) && (roots[0] === 1)) {
    return `a(n) = C1 + C2 * ${roots[1]}^(n-1)`
  }
  else if (((roots[0] !== 0) && (roots[1] !== 0)) && (roots[1] === 1)) {
    return `a(n) = C1 * ${roots[0]}^(n-1) + C2`
  }
  else if (((roots[0] !== 0) && (roots[1] !== 0)) && (roots[0] === roots[1])) {
    return `a(n) = (C1 + C2 * n ) * ${roots[0]}^(n-1)`
  }
  else if ((roots[0] !== 0) && (roots[1] !== 0)) {
    return `a(n) = C1 * ${roots[0]}^(n-1) + C2 * ${roots[1]}^(n-1)`;
  }
}

function createAnswerStrThird(roots) {
  if (((roots[0] !== 0) && (roots[1] !== 0) && (roots[2] !== 0)) && (roots[0] === 1)) {
    return `a(n) = C1 + C2 * ${roots[1]}^(n-1)+ C3 * ${roots[2]}^(n-1)`
  }
  else if (((roots[0] !== 0) && (roots[1] !== 0)) && (roots[1] === 1)) {
    return `a(n) = C1 * ${roots[0]}^(n-1) + C2`
  }
  else if (((roots[0] !== 0) && (roots[1] !== 0)) && (roots[0] === roots[1])) {
    return `a(n) = (C1 + C2 * n ) * ${roots[0]}^(n-1)`
  }
  else if ((roots[0] !== 0) && (roots[1] !== 0)) {
    return `a(n) = C1 * ${roots[0]}^(n-1) + C2 * ${roots[1]}^(n-1)`;
  }
}
  // if ((roots.length === 1) && (roots[0] !== 0)) {
  //   return `a(n) = C1  * ${roots[0]}^(n-1)`;
  // } else if ((roots.length === 2) && (roots[0] === 1)) {
  //   return `a(n) = C1 + C2 * ${roots[1]}^(n-1)`
  // } else if ((roots.length === 2) && (roots[0] === roots[1])) {
  //   return `a(n) = (C1 + C2 * n ) * ${roots[0]}^(n-1)`
  // } else if ((roots.length === 2) && (roots[1] === 1)) {
  //   return `a(n) = C1 * ${roots[0]}^(n-1) + C2`
  // } else if ((roots.length === 3) && (roots[0] === 1)) {
  //   return `a(n) = C1 + C2 * ${roots[1]}^(n-1)+ C3 * ${roots[2]}^(n-1)`
  // } else if ((roots.length === 3) && (roots[1] === 1)) {
  //   return `a(n) = (C1 * ${roots[0]}^(n-1) + C2 + C3 * ${roots[2]}^(n-1)`
  // } else if ((roots.length === 3) && (roots[2] === 1)) {
  //   return `a(n) = (C1 * ${roots[0]}^(n-1) + C2 * ${roots[1]}^(n-1) + C3`
  // } else if ((roots.length === 3) && (roots[0] === roots[1])) {
  //   return `a(n) = (C1 + C2 * n ) * ${roots[0]}^(n-1)+ C3 * ${roots[2]}^(n-1)`
  // } else if ((roots.length === 3) && (roots[0] === roots[2])) {
  //   return `a(n) = (C1 + C2 * n ) * ${roots[0]}^(n-1)+ C3 * ${roots[2]}^(n-1)`
  // } else if ((roots.length === 3) && (roots[1] === roots[2])) {
  //   return `a(n) = (C1 + C2 * n ) * ${roots[0]}^(n-1)+ C3 * ${roots[2]}^(n-1)`
  // } else if (roots.length === 2) {
  //   return `a(n) = C1 * ${roots[0]}^(n-1) + C2 * ${roots[1]}^(n-1)`
  // } else if (roots.length === 3) {
  //   return `a(n) = C1 * ${roots[0]}^(n-1) + C2 * ${roots[1]}^(n-1) + C3 * ${roots[2]}^(n-1)`
  // }


function createStrEquation(coeff){
  let result = "a(n) "
  for (let i = 0; i < coeff.length; i++){     
    if (coeff[i] == 0) {
      coeff[i] = getRandomNumber(1, 10)
      result += ` + a(n - ${i + 1}) `
    } 
    else if (coeff[i] == 1)
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
    ansText.className = "answer_text"
    ansText.textContent = `Ответ: ${textAns}`
    bodyDiv.appendChild(ansText);

    closeElement(showAnsButton)
  })

  return bodyDiv
}

main()
