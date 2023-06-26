import { useState, useEffect } from "react";
import "./DropDown.css";
import { MenuItems } from "../navbar/MenuItems";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DropDown() {
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [newproviderlength, setnewproviderlength] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/locations")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array
        setLocations(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://localhost:5000/providers")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array
        setProviders(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array
        setServices(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    if (selectedLocation && event.target.value && providers.length === 2) {
      toast.error(
        "No providers available for the selected location and service",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
    console.log(providers.length);
  };
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  const handleFindServiceClick = (e) => {
    e.preventDefault();
    if (
      selectedService === "" ||
      selectedLocation === "" ||
      selectedProvider === ""
    ) {
      toast.error("Please select all values to continue", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (selectedProvider === "No provider") {
      e.preventDefault();
      toast.error(
        "No providers available for the selected location and service",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else {
      // Find the selected service in the services array
      const selectedServiceObj = services.find(
        (service) => service.service === selectedService
      );

      const selectedProviderObj = providers.find(
        (provider) => provider.provider === selectedProvider
      );

      // Store the selected service details in local storage
      localStorage.setItem("service", selectedService);
      localStorage.setItem("price", selectedServiceObj.price);
      localStorage.setItem("provider", selectedProvider);
      localStorage.setItem("providerPhone", selectedProviderObj.providerPhone);
      localStorage.setItem("location", selectedLocation);
      window.location.href = "/Appointment";
    }
  };

  return (
    <div className="dropdown">
      <div className="dropDiv">
        <div className="dropTag">
          <label className="lblService">Choose Service</label>
          <select
            className="serviceSel"
            onChange={handleServiceChange}
            value={selectedService}
          >
            <option value="">-Select-</option>
            {services.map((service) => (
              <option key={service._id} value={service.service}>
                {service.service}
              </option>
            ))}
          </select>
        </div>
        <div className="dropCity">
          <label className="lblCity">Choose Location</label>
          <select
            className="citySel"
            onChange={handleLocationChange}
            value={selectedLocation}
          >
            <option value="">-Select-</option>
            {locations.map((location) => (
              <option key={location._id} value={location.name}>
                {location.location}
              </option>
            ))}
          </select>
        </div>

        <div className="dropTag">
          <label className="lblProvider">Choose Provider</label>
          <select
            className="providerSel"
            onChange={handleProviderChange}
            value={selectedProvider}
            disabled={!selectedLocation || !selectedService}
          >
            <option value="">-Select-</option>
            {providers
              .filter(
                (provider) =>
                  provider.location === selectedLocation &&
                  provider.service === selectedService
              )
              .map((provider) => (
                <option key={provider._id} value={provider.provider}>
                  {provider.provider}
                </option>
              ))}
            {providers.filter(
              (provider) =>
                provider.location === selectedLocation &&
                provider.service === selectedService
            ).length === 0 && <option value="No provider">No provider</option>}
          </select>
        </div>

        <div className="buttonSer">
          <Link
            to="/Appointment"
            className="btnService"
            onClick={handleFindServiceClick}
          >
            Find Service
          </Link>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
