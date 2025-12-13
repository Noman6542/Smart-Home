import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_Server_localhost}/services`
        );
        setServices(res.data.data || []);
      setFilteredServices(res.data.data || []);
      } catch (error) {
        console.log("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter logic
  useEffect(() => {
    let temp = services;

    if (searchText) {
      temp = temp.filter((s) =>
        s.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      temp = temp.filter((s) => s.type === selectedType);
    }

    if (minBudget) {
      temp = temp.filter((s) => s.price >= parseInt(minBudget));
    }

    if (maxBudget) {
      temp = temp.filter((s) => s.price <= parseInt(maxBudget));
    }

    setFilteredServices(temp);
  }, [searchText, selectedType, minBudget, maxBudget, services]);

  const serviceTypes = ["All", "Home", "Wedding", "Office", "Seminar", "Meeting"];

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading services...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-6">Browse All Services</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <input
          type="text"
          placeholder="Search by service name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          {serviceTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Budget"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
          className="input input-bordered w-full md:w-1/6"
        />

        <input
          type="number"
          placeholder="Max Budget"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
          className="input input-bordered w-full md:w-1/6"
        />
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="p-5 border rounded-xl shadow hover:shadow-lg flex flex-col justify-between h-full"
          >
            <div>
              <img
                src={service.image}
                className="h-48 w-full object-cover rounded-lg"
                alt={service.title}
              />
              <h3 className="text-2xl font-semibold mt-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-primary font-bold mt-2">USD ${service.price}</p>
              <p className="text-sm mt-1 text-gray-500">Type: {service.type}</p>
            </div>

            <div className="text-center mt-4">
              <Link to={`/service/${service._id}`} className="btn btn-outline w-1/2">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
