import { exemploFilter, exemploFind, exemploFor, exemploForeach, exemploForeachAnn, exemploMap, exemploReduce } from "./modules/exemploArrayIterations.js";
import exemploArraysFun from "./modules/exemploArraysFun.js";
import pot, { Person, Person2, Person3, pow, pow2 } from "./modules/exemploFuncArrowFun.js";
import { exemplosConst, exemplosLet } from "./modules/letConstExemplos.js"
import numTypesExamples from "./modules/numTypes.js"
import { exemplosConstroiObj , exemplosIteraObj } from "./modules/exObj.js"

console.log("Exemplo 01 - TIPOS EM ECMASCRIPT")
exemplosConst();
numTypesExamples();

console.log("Exemplo 02 - STRINGS EM ECMASCRIPT")

const curso = "Desenvolvimento Front-End II"
console.log(` Disciplina de ${curso}`);


console.log("Exemplo 03 - LET E CONST EM ECMASCRIPT");

exemplosLet();
exemplosConst();

console.log("Exemplo 04 - FUNCTION E ARROW FUNCTION");

console.log(pot(2, 2));
console.log(pow(2, 2));
console.log(pow2(2));

var p = new Person();
setTimeout(() => { //Delay
  console.log(`p1: ${p.age}`);
}, 3000);

var p2 = new Person2();
setTimeout(() => {
  console.log('p2: ' + p2.age);
}, 4000);

var p3 = new Person3();
setTimeout(() => {
  console.log('p3: ' + p3.age);
  process.exit();
}, 5000);



console.log("Exemplo 05 - EXEMPLOS ARRAY METHODS");

exemploArraysFun()


console.log("Exemplo 06 - EXEMPLOS MAIS METODOS DE ARRAYS");

exemploFor()
exemploForeach();
exemploForeachAnn();
exemploFind();
exemploFilter();
exemploMap();
exemploReduce();




console.log("Exemplo 07 - OBJETOS EM JAVASCRIPT");

console.log(exemplosConstroiObj());
console.log();
console.log(exemplosIteraObj());