const monthName = document.getElementById("month-name");
const dayName = document.getElementById("day-name");
const dayNumber = document.getElementById("day-number");
const CurrentYear = document.getElementById("year");
const textElement = document.getElementById("my Text")
const myElement = document.querySelector("element")
// const currentDate = new Date();
// const Month = currentDate.getMonth()

// for(let i =1; i <= 31; i++) {
//     const dayDiv = document.createElement("div");
//     dayDiv.textContent = i;
//     if(i === currentDate.getDate()) month === currentDate.getMonth() && CurrentYearE1 === currentDate.getFullYear()

// }

const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1; // JavaScript months are 0-indexed
const day = today.getDate();

// const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
CurrentYear.innerText = today.getFullYear()
// dayNumber.innerText = day

const dayIndex = today.getDay(); 

// dayIndex will be a number from 0 (Sunday) to 6 (Saturday)

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 dayName.innerText = daysOfWeek[dayIndex]; 

// calendercontainer.appendchild(daydiv)
// renderCalender(currentDate)
function getSiblingByClass(element, className) {
    let sibling = element.nextElementSibling;
  
    while (sibling) {
      if (sibling.classList.contains(className)) {
        return sibling;
      }
      sibling = sibling.nextElementSibling;
    }
  
    return null; //no sibling should be found
  }
  dayName.nextElementSibling.innerText = day
//   style.
// class.
console.log()
// monthName.innerText = data.tolocalString("en", { Month: "long"});

// dayName.innerText = date.tolocalString("en",{ weekday: "long"})

// dayNumberE1.innerText =date.getDate()

// yearE1.innerText= date.getFullYear()

// console.log(tolocalString);
