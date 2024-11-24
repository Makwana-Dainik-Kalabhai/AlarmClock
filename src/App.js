import { React, useState } from "react";
import "./App.css";
import img from "./clock.jpg";
import myAudio from "./ringtone.mp3";

function App() {
  let [time, setTime] = useState(new Date().toLocaleTimeString());
  let [alarmT, setAlarmT] = useState([
    { alarmH: -1, alarmM: -1, alarmAmPm: "", status: true },
  ]);
  let [snooze, setSnooze] = useState(false);

  const [audio, setAudio] = useState(new Audio(myAudio));
  audio.loop = true;

  function setAlarm() {
    let arr = alarmT;

    let hour = document.getElementById("hour").value;
    let min = document.getElementById("min").value;
    let userampm = document.getElementById("ampm").value;

    if (hour === "" && min === "") {
      alert("Please! Enter the Time");
    } //
    else {
      arr.push({
        alarmH: hour,
        alarmM: min,
        alarmAmPm: userampm,
        status: true,
      });

      setAlarmT(arr);
      document.getElementById("hour").value = "";
      document.getElementById("min").value = "";

      let ampm = new Date().getHours() <= 12 ? "AM" : "PM";

      setInterval(() => {
        for (let i = 0; i < alarmT.length; i++) {
          if (
            new Date().getHours() % 12 == alarmT[i].alarmH &&
            new Date().getMinutes() % 60 == alarmT[i].alarmM &&
            new Date().getSeconds() == 0 &&
            alarmT[i].alarmAmPm == ampm &&
            alarmT[i].status
          ) {
            audio.currentTime = 0;
            audio.play();
            setSnooze(true);
          }
        }
      }, 1000);
    }
  }

  function snoozeAlarm() {
    audio.pause();
    setSnooze(false);
  }

  function chageStatus(index) {
    let arr = alarmT;

    for (let i = 0; i < alarmT.length; i++) {
      if (i == index) {
        arr[i].status = arr[i].status ? false : true;
      }
    }
    setAlarmT(arr);
  }

  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <>
      <div
        className="card mt-5 mx-auto p-1"
        style={{
          width: "25rem",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <img
          src={img}
          className={`card-img-top py-4 ${(snooze)?"vibrate":""}`}
          style={{ width: "27.5%", margin: "auto" }}
          alt="Img not found"
        />
        <div className="card-body">
          <div className="card-text">
            <h3 className="text-center text-danger pb-2">{time}</h3>
            <hr />
            <div className="row pt-2">
              <div className="col-md-4 pl-5">
                <h5>Hour</h5>
                <input
                  type="number"
                  className="form-control"
                  id="hour"
                  placeholder="00"
                  min="00"
                  max="12"
                />
              </div>
              <div className="col-md-4">
                <h5>Minute</h5>
                <input
                  type="number"
                  className="form-control"
                  id="min"
                  placeholder="00"
                  min="00"
                  max="59"
                />
              </div>
              <div className="col-md-4">
                <h5>AM/PM</h5>
                <select className="form-select" id="ampm">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <table style={{width: "47%", margin: "auto"}} className="mt-4">
            {/* <div className="row mt-4" style={{ width: "45%", margin: "auto" }}> */}
            {alarmT.map(function (ele, index) {
              return (
                <tr>
                  {/* <div className="alarm-times" style={{ display: "flex" }}> */}
                  {ele.alarmH >= 0 ? (
                    <>
                      <td>{ele.alarmH}</td>
                      <td>: </td>
                      <td>{ele.alarmM}</td>
                      <td className="p-0">{ele.alarmAmPm}</td>
                      <td className="form-check form-switch pl-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          onChange={() => {
                            chageStatus(index);
                          }}
                          checked={alarmT[index].status}
                        />
                      </td>
                    </>
                  ) : (
                    ""
                  )}
                  {/* </div> */}
                </tr>
              );
            })}
            {/* </div> */}
          </table>
          <button
            id="set_alarm"
            className="btn btn-danger w-100 mt-4"
            onClick={(e) => {
              !snooze ? setAlarm() : snoozeAlarm();
            }}
          >
            {!snooze ? "Set Alarm" : "Snooze"}
          </button>
        </div>
      </div>
    </>
  );
}
export default App;
