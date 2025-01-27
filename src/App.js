import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWU3bIK92Eig8u3bQN_0t-PrJSS39SnSs",
  authDomain: "temple-3ff20.firebaseapp.com",
  databaseURL: "https://temple-3ff20-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "temple-3ff20",
  storageBucket: "temple-3ff20.appspot.com",
  messagingSenderId: "692994408021",
  appId: "YOUR_APP_ID", // Replace with your app ID from Firebase project settings
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [coordinates, setCoordinates] = useState({ lat: null, long: null });

  useEffect(() => {
    const dbRef = ref(database, "/");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.lat !== undefined && data.long !== undefined) {
        setCoordinates({ lat: data.lat, long: data.long });
        loadMap(data.lat, data.long); // Load the map after getting data
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const loadMap = (lat, long) => {
    const mapDiv = document.getElementById("map");
    if (!mapDiv) {
      console.error("Map container not found.");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAUjjIy9Sd5r8T5nxIinHbcseCvNHKKag4&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = function () {
      const map = new window.google.maps.Map(mapDiv, {
        center: { lat, lng: long },
        zoom: 15,
      });

      // Add a marker
      new window.google.maps.Marker({
        position: { lat, lng: long },
        map: map,
      });
    };

    document.body.appendChild(script);
  };

  const openInMaps = (platform) => {
    const { lat, long } = coordinates;
    const label = "Current Location"; // Label for the marker
    if (platform === "google") {
      const googleMapsUrl = `https://www.google.com/maps?q=loc:${lat},${long}&label=${label}`;
      window.open(googleMapsUrl, "_blank");
    } else if (platform === "apple") {
      const appleMapsUrl = `https://maps.apple.com/?ll=${lat},${long}&q=${label}`;
      window.open(appleMapsUrl, "_blank");
    }
  };

  return (
    <Router>
      <Routes>
        {/* Main page with buttons */}
        <Route
          path="/"
          element={
            <div
              style={{
                textAlign: "center",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                fontFamily: '"Noto Sans Tamil", sans-serif', // Apply Noto Sans Tamil font
              }}
            >
              {/* Logo and Title */}
              <div style={{ flex: "0 1 auto", marginBottom: "10px" }}>
                <img
                  src="/logo512.png"
                  alt="Logo"
                  style={{
                    width: "200px",
                    height: "160px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <h1
                  style={{
                    margin: 0,
                    fontWeight: "bold", // Apply bold to the title
                  }}
                >
                  தைப்பூச ஜீவ இரத ஊர்வலம் நேரடி இடமறியல் அமைப்பு
                </h1>

                {/* Buttons */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => openInMaps("google")}
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Google Maps
                  </button>
                  <button
                    onClick={() => openInMaps("apple")}
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      backgroundColor: "#28A745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Apple Maps
                  </button>
                  <button
                    onClick={() => window.open("/#/app", "_blank")}
                    style={{
                      padding: "10px 20px",
                      fontSize: "14px",
                      backgroundColor: "#FF5733",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Download App
                  </button>
                </div>
              </div>

              {/* Map Section */}
              <div
                id="map"
                style={{
                  flex: "1 1 auto",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
          }
        />
        {/* /app route with Bootstrap */}
        <Route
          path="/app"
          element={
            <>
              {/* Import Bootstrap CSS here for the /app page */}
              <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
              />

              <div className="container text-center">
                <div className="row my-5">
                  {/* Left Section */}
                  <div className="col-6 d-flex flex-column align-items-center mb-4">
                    <img
                      src="3.png"
                      alt="Logo"
                      className="img-fluid mb-3"
                      style={{
                        width: "150px", // Fixed width
                        height: "150px", // Fixed height
                        objectFit: "cover", // Ensures the image covers the area
                      }}
                    />
                    <h2
                      style={{
                        fontWeight: "bold", // Apply bold to the title in /app
                      }}
                    >
                      வாழ்க வளமுடன் !
                    </h2>
                    <button
                      onClick={() =>
                        window.open(
                          "https://drive.google.com/drive/folders/1hpqIuyacLbxOj2J1roIvB9hH-NvUcBoL?usp=sharing",
                          "_blank"
                        )
                      }
                      className="btn btn-danger mt-3"
                    >
                      Download APK
                    </button>
                  </div>

                  {/* Right Section */}
                  <div className="col-6 d-flex flex-column align-items-center mb-4">
                    <img
                      src="4.png"
                      alt="Logo"
                      className="img-fluid mb-3"
                      style={{
                        width: "150px", // Fixed width
                        height: "150px", // Fixed height
                        objectFit: "cover", // Ensures the image covers the area
                      }}
                    />
                    <h2
                      style={{
                        fontWeight: "bold", // Apply bold to the title in /app
                      }}
                    >
                      வேல் முருகா வேல் !
                    </h2>
                    <button
                      onClick={() =>
                        window.open(
                          "https://jeevarathambukitbelimbingthaipusam.github.io/",
                          "_blank"
                        )
                      }
                      className="btn btn-success mt-3"
                    >
                      Download iOS App
                    </button>
                  </div>
                </div>

                {/* Centered Image */}
                <div
                  className="mb-4"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <img
                    src="5.png"
                    alt="Center Image"
                    className="img-fluid"
                    style={{
                      width: "300px",
                      height: "180px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Centered Text */}
                <div className="mt-4" style={{ marginTop: "40px" }}>
                  <h2
                    style={{
                      fontWeight: "bold", // Apply bold to the text
                    }}
                  >
                    யாமிருக்க பயமென் !!!
                  </h2>
                  <h2
                    style={{
                      fontWeight: "bold", // Apply bold to the text
                    }}
                  >
                    வேலும் மயிலும் துணை
                  </h2>
                </div>
              </div>

              {/* Custom CSS for mobile screens */}
              <style>
                {`
                  body {
                    font-family: 'Noto Sans Tamil', sans-serif;
                    margin: 0;
                    padding: 0;
                  }

                  h1, h2, h3, h4, h5, h6 {
                    font-family: 'Noto Sans Tamil', sans-serif;
                    margin: 0;
                    font-weight: bold; /* Make all headings bold */
                  }

                  button {
                    font-family: 'Noto Sans Tamil', sans-serif;
                  }

                  .container, .row, .col {
                    font-family: 'Noto Sans Tamil', sans-serif;
                  }

                  @media (max-width: 767px) {
                    .mb-4 {
                      margin-top: -30px; /* Adjust margin-top to move the image upwards */
                    }

                    .mt-4 {
                      margin-top: -30px; /* Adjust margin-top for the text */
                    }
                  }
                `}
              </style>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
