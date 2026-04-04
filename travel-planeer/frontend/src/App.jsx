import { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaMapMarkerAlt, FaEuroSign } from "react-icons/fa";

export default function App() {
  const [place, setPlace] = useState("");
  const [data, setData] = useState(null);

  const getPlan = async () => {
    const res = await axios.get(`http://localhost:5000/plan?place=${place}`);
    setData(res.data);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>nomading</h2>
        <button className="active">travel planner</button>
      </div>

      <div className="main">
        <div className="search">
          <input
            placeholder="Enter destination..."
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <button onClick={getPlan}>Plan</button>
        </div>

        {data && (
          <>
            <h2>{data.destination}</h2>
<div className="card flex-row">
  <div className="left">
    <h3>best time to visit</h3>
    <p>{data.best_time}</p>
  </div>

  <div className="right">
    <h3>recommended duration</h3>
    <h2>{data.duration_days} days</h2>
  </div>
</div>
            <div className="card">
              <h3>top attractions</h3>
              <div className="tags">
                {data.top_attractions.map((item, i) => (
                  <span key={i}>
                    <FaMapMarkerAlt /> {item}
                  </span>
                ))}
              </div>
            </div>
           
            <div className="card">
              <h3>sample itinerary</h3>
              {data.sample_itinerary.map((day, i) => (
                <div key={i} className="itinerary">
                  <div className="circle">{day.day}</div>
                  <p>{day.plan}</p>
                </div>
              ))}
            </div>

            <div className="card">
              <h3>estimated budget (eur)</h3>
              <div className="budget">
                <div>
                  <p>budget</p>
                  <h2><FaEuroSign />{data.estimated_budget_eur.low}</h2>
                </div>
                <div>
                  <p>standard</p>
                  <h2><FaEuroSign />{data.estimated_budget_eur.mid}</h2>
                </div>
                <div>
                  <p>luxury</p>
                  <h2><FaEuroSign />{data.estimated_budget_eur.high}</h2>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>local tips</h3>
              <ul>
                {data.local_tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}