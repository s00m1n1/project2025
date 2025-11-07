async function fetchData(url) {
  // fetch를 사용하여 JSON 파일 가져오기
  const response = await fetch(url);

  // 응답이 정상인지 확인
  if (!response.ok) {
    throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
  }

  return await response.json();
}

async function apiDataLoad(size, receiveBuffer, reqeustURL) {
  const proxy = "https://nextit.or.kr:41080/";
  for (let i = 1; i < size; i++) {
    const origin = `${reqeustURL}?page=${i}&pageunit=10`;
    const url = `${proxy}${origin}`;
    //console.log(url);

    const data = await fetchData(url);
    //사진이 있는 것만 추리기
    //위도 경도 있는 것만 추리기
    const temp = data.results;
    for (let j = 0; j < temp.length; j++) {
      const filter =
        temp[j].images != null &&
        temp[j].images.length > 0 &&
        temp[j].xposition != null &&
        temp[j].xposition.trim() != "" &&
        temp[j].xposition.trim() != " " &&
        Number(temp[j].xposition) > 0;

      if (filter) {
        //console.log(temp[j]);
        receiveBuffer.push(temp[j]);
      }
    }
  }

}

function initDatabase(replaceBuffer) {
  for (let i = 0; i < replaceBuffer.length; i++) {
    database.push(replaceBuffer[i]);
  }
}
