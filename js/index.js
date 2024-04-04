const 정답 = "APPLE";

let attempts = 0; //시도한 횟수를 담는 변수
let index = 0; //현재 루프의 반복 인덱스
let timer;

function appStart() {
  //게임이 종료되었을 때 화면에 나타나는 문구
  const displayGameover = () => {
    const div = document.createElement("div"); //JS에서 HTML요소 생성
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; width:200px; height:100px; background-color:rgba(0,0,0,0.5);";
    document.body.appendChild(div); //자식노드 리턴
  };
  //게임 종료
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  //게임 중 - 다음 줄 입력
  const nextline = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    //사용자가 입력한 글자 확인
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index="${attempts}${i}"]`
      );
      const 입력한_글자 = block.innerText;
      //입력한 글자와 정답을 비교해 맞은 글자의 개수 계산 후 알맞은 스타일 적용
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64"; //정답일 경우 배경은 녹색
      } else if (정답.includes(입력한_글자))
        block.style.background = "#C9B458"; //정답에 포함된 글자면 배경은 노란색
      else block.style.background = "#787C7E"; //오답이면 배경은 회색
      block.style.color = "white"; //모든 보드 블록의 글자색을 흰색으로 설정
    }
    if (맞은_갯수 === 5) gameover();
    else nextline();
  };
  //백스페이스(지우기) 실행
  const handleBackspace = () => {
    //실행 조건: 첫 번째 블록이 아니라면,
    if (index > 0) {
      //이전 블록을 선택하고,
      const preBlock = document.querySelector(
        `.board-block[data-index="${attempts}${index - 1}"]`
      );
      //그 블록의 텍스트를 지워라.
      preBlock.innerText = "";
    }
    //인덱스가 음수로 가지 않게 끔 설정
    if (index !== 0) index -= 1;
  };
  //키보드를 누를 때 실행되는 함수 정의
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    //현재 입력 중인 블록 위치를 나타냄
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (event.key === "Enter") handleEnterKey();
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  //타이머
  const startTimer = () => {
    const 시작_시간 = new Date(); //Date: 현재 시간을 나타내는 객체

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0"); //분 추출, 문자열로 변환, 두 자리로 맞추기 위해 padStart()메서드 사용
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".timer"); //HTML에서 타이머를 표시할 요소 선택.
      timeDiv.innerText = `Time : ${분}:${초}`;
    }

    timer = setInterval(setTime, 1000); //1초마다 실행
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
