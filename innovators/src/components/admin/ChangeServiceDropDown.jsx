import React, { useState, useEffect } from "react";
import "../admin/admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangeServiceDropDown() {
  const [providers, setproviders] = useState([]);
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [selectedprovider, setSelectedprovider] = useState("");

  const getServices = () => {
    fetch("http://localhost:5000/services")
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
        setproviders(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProviderChange = (event) => {
    setSelectedprovider(event.target.value);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      // redirect the user to the login or signup page
      window.location.href = "./loginError";
    }
    getServices();
    getProviders();
  }, []);

  const handleAddOption = (e) => {
    if (newOption === "" || newPrice === "") {
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
    } else if (isNaN(newPrice)) {
      toast.error("price must be a number", {
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
      fetch("http://localhost:5000/addService", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          service: newOption,
          price: newPrice,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            toast.success("New Service Inserted!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            getServices();
            const newId =
              options.length > 0 ? options[options.length - 1].id + 1 : 1;
            const newOptions = [
              ...options,
              { id: newId, service: newOption, price: newPrice },
            ];
            setOptions(newOptions);
            setNewOption("");
            setNewPrice("");
          } else if ((data.error = "Service Duplication")) {
            toast.error("Service Duplication", {
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

  const handleDeleteOption = (id, service) => {
    fetch("http://localhost:5000/deleteService", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        serviceid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getServices();
        toast.info("Service Successfully Deleted", {
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

  const handleUpdateOption = (id, service, price) => {
    const newOptions = options.map((option) => {
      if (option.id === id) {
        option.service = service;
        option.price = price;
      }
      return option;
    });
    setOptions(newOptions);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Manage Service Options</h3>
        <p>Below is the list of options for the dropdown:</p>
        <table style={{ width: 500 }}>
          <thead>
            <tr>
              <th></th>
              <th>Service</th>
              <th>Price</th>

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
                      value={option.service}
                      onChange={(e) =>
                        handleUpdateOption(option.id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={option.price}
                      onChange={(e) =>
                        handleUpdateOption(option.id, e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <button
                      className="deleteuser_btn"
                      onClick={() =>
                        handleDeleteOption(option._id, option.service)
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
                <input
                  type="text"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
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
