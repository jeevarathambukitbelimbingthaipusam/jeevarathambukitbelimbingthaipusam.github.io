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
        loadMap(data.lat, data.long); // Load the map
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const loadMap = (lat, long) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAUjjIy9Sd5r8T5nxIinHbcseCvNHKKag4&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = function () {
      const map = new window.google.maps.Map(document.getElementById("map"), {
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
              }}
            >
              {/* Logo and Title */}
              <div style={{ flex: "0 1 auto", marginBottom: "10px" }}>
                <img
                  src="/logo512.png"
                  alt="Logo"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <h1 style={{ margin: 0 }}>
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
                    Open in Google Maps
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
                    Open in Apple Maps
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
        {/* /app route */}
        <Route
          path="/app"
          element={
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                padding: "50px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Title and Buttons (Side by Side) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  marginBottom: "20px",
                }}
              >
                {/* Left Section */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <h1>வாழ்க வளமுடன் !</h1>
                  <button
                    onClick={() => window.open("http://example.com/your-apk", "_blank")}
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
                    Download APK
                  </button>
                </div>

                {/* Right Section */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <h1>வேல் முருகா வேல் !</h1>
                  <button
                    onClick={() => window.open("https://example.com/ios-app", "_blank")}
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
                    Download iOS App
                  </button>
                </div>
              </div>

              {/* Centered Image */}
              <div>
                <img
                  src="logo512.png"
                  alt="Center Image"
                  style={{
                    width: "300px",
                    height: "auto",
                    objectFit: "contain",
                    marginTop: "20px",
                  }}
                />
              </div>

              {/* Hello World and Welcome Text */}
              <div style={{ marginTop: "20px" }}>
                <h1>யாமிருக்க பயமென் !!!</h1>
                <h1>வேலும் மயிலும் துணை</h1>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
