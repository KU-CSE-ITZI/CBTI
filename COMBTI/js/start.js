const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const selectPeople = [0, 0, 0, 0, 0];
const selectMbti = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResultP() {
  console.log(selectPeople);
  var result = selectPeople.indexOf(Math.max(...selectPeople));
  return result;
}
function calResultM() {
  console.log(selectMbti);
  var result = selectMbti.indexOf(Math.max(...selectMbti));
  return result;
}

function setResult() {
  let point1 = calResultP();
  let point2 = calResultM();

  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = mbtiList[point2].mbti + infoList[point1].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point1 + '' + point2 + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point1 + point2;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point1].desc + mbtiList[point2].desc;
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target1 = qnaList[qIdx].a[idx].type1; // q인덱스의 질문, 인덱스의 대답의 type배열
      var target2 = qnaList[qIdx].a[idx].type2;
      for(let i = 0; i < target1.length; i++){
        selectPeople[target1[i]] += 1;
      }
      for(let i = 0; i < target2.length; i++){
        selectMbti[target2[i]] += 1;
      }
      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    },450)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
