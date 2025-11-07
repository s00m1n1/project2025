
async function getFooData() {

  const proxy = "https://nextit.or.kr:41080/";
  const requestURL = "http://www.gimhae.go.kr/openapi/tour/restaurant.do";

  const dataList = [];

  for (let i = 1; i < 50; i++) {
    
    const origin = `${requestURL}?page=${i}&pageunit=10`;
    const url = `${proxy}${origin}`;
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }
    const data = await response.json();
    const temp = data.results;
    for (let j = 0; j < temp.length; j++) {
      const filter =
        temp[j].images != null &&
        temp[j].images != "" &&
        temp[j].images != " " &&
        temp[j].name != null &&
        temp[j].name != "" &&
        temp[j].name != " " &&
        temp[j].menuprice != null &&
        temp[j].menuprice != "" &&
        temp[j].menuprice != " " &&
        temp[j].address != null &&
        temp[j].address != "" &&
        temp[j].address != " " ;
      if (filter) {
        dataList.push(temp[j]);
      }
    }
  }

  const pickDataList = [];
  const copy = [...dataList]; 

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length); 
    pickDataList.push(copy[randomIndex]); 
    copy.splice(randomIndex, 1);
  }

  
  let foodImgSrc = "";
  let foodName = "";
  let foodMenu = "";
  let foodAdd = "";

  const foodBox = document.querySelector(".food-box");
  
  for (let i = 0; i < pickDataList.length; i++) {
    foodImgSrc = pickDataList[i].images[0];
    foodName = pickDataList[i].name;
    foodName = shortenText(foodName);
    foodMenu = pickDataList[i].menuprice;
    foodMenu = shortenText(foodMenu);
    foodAdd = pickDataList[i].address;
    foodAdd = shortenText(foodAdd);

    const slide = document.createElement("div");  
    slide.className = "swiper-slide";             
    const writeHTML = `
      <div class="image"><img src="${foodImgSrc}"></div>
      <div class="txt">
        <h3 class="name">${foodName}</h3>
        <p class="menu">${foodMenu}</p>
        <div class="add">
          <span><i class="material-symbols-rounded">distance</i></span>
          <p>${foodAdd}</p>
        </div>
      </div>
    `;
    slide.innerHTML = writeHTML;
    foodBox.appendChild(slide);
  }

}

async function getTourData() {

  const proxy = "https://nextit.or.kr:41080/";
  const requestURL = "http://www.gimhae.go.kr/openapi/tour/tourinfo.do";

  const dataList = [];

  for (let i = 1; i < 10; i++) {
    
    const origin = `${requestURL}?page=${i}&pageunit=10`;
    const url = `${proxy}${origin}`;
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }
    const data = await response.json();
    const temp = data.results;
    for (let j = 0; j < temp.length; j++) {
      const filter = 
        temp[j].content != null &&
        temp[j].content != "" &&
        temp[j].content != " " &&
        temp[j].images != null &&
        temp[j].images != "" &&
        temp[j].images != " " &&
        temp[j].name != null &&
        temp[j].name != "" &&
        temp[j].name != " ";
      if (filter) {
        dataList.push(temp[j]);
      }
    }
  }


  const pickDataList = [];
  const copy = [...dataList]; 

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length); 
    pickDataList.push(copy[randomIndex]); 
    copy.splice(randomIndex, 1);
  }
  
  let tourImgSrc = "";
  let tourName = "";
  let tourcontent = "";

  const tourBox = document.querySelector(".tour-box");
  
  for (let i = 0; i < pickDataList.length; i++) {
    tourImgSrc = pickDataList[i].images[0];
    tourName = pickDataList[i].name;
    tourName = shortenText(tourName);
    tourcontent = pickDataList[i].content;
    tourcontent = shortenText2(tourcontent);

    const slide = document.createElement("div");  
    slide.className = "swiper-slide";             
    const writeHTML = `
      <div class="image">
        <img src="${tourImgSrc}">
        <div class="line"><span></span><span></span><span></span></div>
      </div>
      <div class="txt">
        <h3 class="name">${tourName}</h3>
        <p class="content">${tourcontent}</p>
      </div>
    `;
    slide.innerHTML = writeHTML;
    tourBox.appendChild(slide);
  }

}

// 브라우저 실행시
window.addEventListener("DOMContentLoaded", async () => {

  // 
  const visual = new Swiper(".visual-swiper", {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".visual-paging",
      clickable: true,
    },
    navigation: {
      prevEl: ".visual-prev",
      nextEl: ".visual-next",
    },
    loop: true,
  });

  getFooData();

  setTimeout(() => {
    const food = new Swiper(".food-swiper", {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        prevEl: ".food-prev",
        nextEl: ".food-next",
      },
    });
  }, 3000); 

  getTourData();

  setTimeout(() => {
    const tour = new Swiper(".tour-swiper", {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".tour-paging",
        clickable: true,
      },
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        prevEl: ".tour-prev",
        nextEl: ".tour-next",
      },
    });
  }, 3000); 

});