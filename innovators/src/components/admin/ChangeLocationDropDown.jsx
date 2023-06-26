import React, { useState, useEffect } from "react";
import "../admin/admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangeLocationDropDown() {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");

  const [selectedlocation, setSelectedlocation] = useState("");

  const getLocations = () => {
    fetch("http://localhost:5000/locations")
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

  const getProviders = () => {
    fetch("http://localhost:5000/providers")
      .then((res) => res.json())
      .then((data) => {
        // Update the options state with the fetched data array

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
    getLocations();
    getProviders();
  }, []);

  const handleAddOption = (e) => {
    if (newOption === "") {
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
    } else {
      // const provider = providers.find((p) => p.provider === selectedprovider);
      fetch("http://localhost:5000/addLocation", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          location: newOption,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            toast.success("New Location Inserted!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            getLocations();
            const newId =
              options.length > 0 ? options[options.length - 1].id + 1 : 1;
            const newOptions = [...options, { id: newId, location: newOption }];
            setOptions(newOptions);
            setNewOption("");
          } else if ((data.error = "Location Duplication")) {
            toast.error("Location Duplication", {
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

  const handleDeleteOption = (id, location) => {
    fetch("http://localhost:5000/deleteLocation", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        locationid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getLocations();
        toast.info("Location Successfully Deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleUpdateOption = (id, location) => {
    const newOptions = options.map((option) => {
      if (option.id === id) {
        option.location = location;
      }
      return option;
    });
    setOptions(newOptions);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Manage Location Options</h3>
        <p>Below is the list of options for the dropdown:</p>
        <table style={{ width: 500 }}>
          <thead>
            <tr>
              <th></th>
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
                        handleDeleteOption(option._id, option.location)
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
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
              </td>

              <td>
                <button className="addlocation_btn" onClick={handleAddOption}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>{" "}
      <ToastContainer />
    </div>
  );
}
