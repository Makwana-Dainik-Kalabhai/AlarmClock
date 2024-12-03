import { React, useState, useEffect } from "react";
import "./App.css";
import img from "./clock.jpg";
import myAudio from "./ringtone.mp3";

function App() {
  let isAppend = false;

  let [time, setTime] = useState(new Date().toLocaleTimeString());
  let [alarmT, setAlarmT] = useState([
    { alarmH: -1, alarmM: -1, alarmAmPm: "", status: true },
  ]);
  let [snooze, setSnooze] = useState(false);

  const [audio, setAudio] = useState(new Audio(myAudio));
  audio.loop = true;

  useEffect(() => {
    if (!isAppend) {
      for (let i = 0; i < 12; i++) {
        var option = document.createElement("option");
        if (i < 10) {
          option.text = "0" + i;
          option.value = "0" + i;
        } else {
          option.text = i;
          option.value = i;
        }
        document.getElementById("hour").appendChild(option);
      }
      for (let i = 0; i < 60; i++) {
        var option = document.createElement("option");
        if (i < 10) {
          option.text = "0" + i;
          option.value = "0" + i;
        } else {
          option.text = i;
          option.value = i;
        }
        document.getElementById("minute").appendChild(option);
      }
      isAppend = true;
    }
  }, []);

  function setAlarm() {
    let arr = alarmT;

    let hour = parseInt(document.getElementById("hour").value);
    let min = parseInt(document.getElementById("minute").value);
    let userampm = document.getElementById("ampm").value;

    if (!(hour >= 0 && hour < 12) || !(min >= 0 && min < 60)) {
      alert("Please! Select Valid Time");
      return;
    }

    arr.push({
      alarmH: hour,
      alarmM: min,
      alarmAmPm: userampm,
      status: true,
    });

    setAlarmT(arr);
    document.getElementById("hour").value = "Hours";
    document.getElementById("minute").value = "Minutes";

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

          setTimeout(() => {
            audio.pause();
            setSnooze(false);
          }, 120000);
        }
      }
    }, 1000);
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
      <div className="card mt-5 mx-auto p-1">
        <img
          src={img}
          className={`card-img-top py-4 ${snooze ? "vibrate" : ""}`}
          style={{ width: "27.5%", margin: "auto" }}
          alt="Img not found"
        />
        <div className="card-body">
          <div className="card-text">
            <h3 className="text-center text-danger pb-2">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </h3>
            <hr />
            <div className="row pt-2">
              <div className="col-md-4">
                <select className="form-select p-2" id="hour">
                  <option value="Hours">Hours</option>
                </select>
              </div>

              <div className="col-md-4">
                <select className="form-select p-2" id="minute">
                  <option value="Minutes">Minutes</option>
                </select>
              </div>

              <div className="col-md-4">
                <select className="form-select p-2" id="ampm">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <table style={{ width: "47%", margin: "auto" }} className="mt-4">
            {alarmT.map(function (ele, index) {
              return (
                <tr>
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
                </tr>
              );
            })}
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
