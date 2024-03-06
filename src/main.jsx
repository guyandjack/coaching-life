import React from "react";
//import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Title, Text } from "./title.jsx";

//import DateRangePicker from "rsuite/DateRangePicker";
import Calendar from "react-calendar";

//librairie gestion des dates date-fns
import { isSameDay } from "date-fns";

// (Optional) Import component styles. If you are using Less, import the `index.less` file.
import "rsuite/Calendar/styles/index.css";
import "react-calendar/dist/Calendar.css";
//import { frFR } from "rsuite/esm/locales/index.js";

//objet du backend definnissant le planning d' un mominteur
let planningInstructor = {
  intructorName: "Dupanloup",
  intructorFirstName: "Guillaume",
  bookedFullDay: ["26/02/2024", "28/02/2024"],
  availableDay: ["29/02/2024", "01/03/2024"],
  bookedHalfDay: [
    ["27/02/2024", "pm"],
    ["02/03/2024", "am"],
  ],
  availableHalfDay: [
    ["27/02/2024", "am"],
    ["02/03/2024", "pm"],
  ],
};
//objet du backend definnissant le planning d' un mominteur
let planningInstructor2 = {
  intructorName: "John",
  intructorFirstName: "Doe",
  bookedFullDay: ["26/02/2024", "28/02/2024", "29/02/2024"],
  availableDay: ["29/02/2024", "01/03/2024"],
  bookedHalfDay: [
    ["27/02/2024", "pm"],
    ["02/03/2024", "am"],
  ],
  availableHalfDay: [
    ["27/02/2024", "am"],
    ["02/03/2024", "pm"],
  ],
};

//function desavtive
const disabledDates = planningInstructor.bookedFullDay;

function disabledTile({ date, view }) {
  // Disable tiles in month view only
  if (view === "month") {
    // Check if a date React-Calendar wants to check is on the list of disabled dates
    let dateFinded = disabledDates.find((dDate) => isSameDay(dDate, date));
    console.log("date trouvé: " + dateFinded);
    return dateFinded;
  }
}

//objet a renvoyer au back end apres paiement
let cart = {
  skiResort: "",
  dayStart: "",
  dayEnd: "",
  hourStart: "",
  duration: "",
  activity: "",
  instructor: {
    lastname: "",
    firstname: "",
    phoneNumber: "",
    email: "",
  },
  meetingPoint: "",
  level: "",
  price: "",
  transactionDate: "",
};
//attribuer une couleur gris pour les jours booked
//attribuer une couleur orange pour les demijournée booked
//attribuer une couleur verte pour les jours libres

//composant title
const containerTitle = document.getElementById("title");
const root = ReactDOM.createRoot(containerTitle);
root.render(
  <React.StrictMode>
    <Title />
  </React.StrictMode>
);

//composant text
const containerText = document.querySelector(".text");
const rootText = ReactDOM.createRoot(containerText);
rootText.render(
  <React.StrictMode>
    <Text contenu={"blalbla"} contenu2={"bloblo"} />
  </React.StrictMode>
);

//composant react-calendar
function formatDate(newdate) {
  // obtenir le jour de la semaine avec une date longue
  let options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let dateSelected = newdate.toLocaleString("en-EN", options);

  console.log("date selectionnée: " + dateSelected);
}

function formatDate2(newdate) {
  // obtenir le jour de la semaine avec une date longue
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let dateSelected = newdate.toLocaleString("fr-FR", options);

  console.log("date selectionnée: " + dateSelected);
}
const containerReactCalendar = document.querySelector("#calendar");
const rootReactCalendar = ReactDOM.createRoot(containerReactCalendar);
rootReactCalendar.render(
  <React.StrictMode>
    <Calendar
      /*onChange={onChange} value={value}*/
      activeStartDate={new Date()}
      allowPartialRange={true}
      selectRange={true}
      //value={["2024-02-22", "2024-02-25"]}
      tileClassName={"bg-booked-color"}
      calendarType={"iso8601"}
      view={"month"}
      //formatDay={formatDate}
      onChange={(value, event) => {
        console.log("name of event: " + event);
        formatDate(value);
        formatDate2(value);
      }}
      returnValue="range"
      tileDisabled={disabledTile}
    />
  </React.StrictMode>
);

const containerReactProducts = document.querySelector("#calendar");
const rootReactProducts = ReactDOM.createRoot(containerReactProducts);
rootReactProducts.render(
  <React.StrictMode>
    <productList />
  </React.StrictMode>
);
