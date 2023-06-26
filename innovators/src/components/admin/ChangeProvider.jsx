import React, { useState, useEffect } from "react";
import "../admin/admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangeProvider() {
  const [services, setservices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [selectedservice, setSelectedservice] = useState("");
  const [selectedlocation, setSelectedlocation] = useState("");

  const getLocations = () => {
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
  };

  const getServices = () => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array
        setservices(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProviders = (e) => {
    fetch("http://localhost:5000/providers")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array
        setOptions(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      // redirect the user to the login or signup page
      window.location.href = "./loginError";
    }
    getServices();
    getLocations();
    getProviders();
  }, []);

  const handleServiceChange = (event) => {
    setSelectedservice(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedlocation(event.target.value);
  };

  const handleAddOption = (e) => {
    if (
      newOption === "" ||
      newPhone === "" ||
      selectedlocation === "" ||
      selectedservice === ""
    ) {
      toast.error("all fields are required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      e.preventDefault();
    } else if (!/^\d{3}-\d{3}-\d{4}$/i.test(newPhone)) {
      toast.error("Phone should be in 111-111-1111 format", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const location = locations.find((l) => l.location === selectedlocation);
      const service = services.find((s) => s.service === selectedservice);
      fetch("http://localhost:5000/addProvider", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          provider: newOption,
          providerPhone: newPhone,
          location: selectedlocation,
          service: selectedservice,
          price: service.price,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            toast.success("Service Provider Added", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            getProviders();
            const newId =
              options.length > 0 ? options[options.length - 1].id + 1 : 1;
            const newOptions = [
              ...options,
              { id: newId, provider: newOption, providerPhone: newPhone },
            ];
            setOptions(newOptions);
            setNewOption("");
            setNewPhone("");
          } else if ((data.error = "Provider Duplication")) {
            toast.error("Provider Duplication", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteOption = (id, provider) => {
    fetch("http://localhost:5000/deleteProvider", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        providerid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getProviders();
        toast.info("Service Provider Deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getProviders();
      });
  };

  const handleUpdateOption = (id, provider, providerPhone) => {
    const newOptions = options.map((option) => {
      if (option.id === id) {
        option.provider = provider;
        option.providerPhone = providerPhone; // update the providerPhone field
      }
      return option;
    });
    setOptions(newOptions);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Manage Provider Options</h3>
        <p>Below is the list of options for the dropdown:</p>
        <table style={{ width: 500 }}>
          <thead>
            <tr>
              <th></th>
              <th>Provider</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option) => {
              return (
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      value={option.provider}
                      onChange={(e) =>
                        handleUpdateOption(option.id, e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={option.providerPhone}
                      onChange={(e) =>
                        handleUpdateOption(
                          option.id,
                          option.provider,
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={option.service}
                      onChange={(e) =>
                        handleUpdateOption(option.id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={option.location}
                      onChange={(e) =>
                        handleUpdateOption(option.id, e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <button
                      className="deleteuser_btn"
                      onClick={() =>
                        handleDeleteOption(option._id, option.provider)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>New:</td>
              <td>
                <input
                  type="text"
                  placeholder="Provider"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Phone"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </td>
              <td>
                <select
                  className="citySel"
                  onChange={handleServiceChange}
                  value={selectedservice}
                >
                  <option value="">-Select-</option>
                  {services.map((service) => (
                    <option key={service._id} value={service.service}>
                      {service.service}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="citySel"
                  onChange={handleLocationChange}
                  value={selectedlocation}
                >
                  <option value="">-Select-</option>
                  {locations.map((location) => (
                    <option key={location._id} value={location.location}>
                      {location.location}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button className="addlocation_btn" onClick={handleAddOption}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
