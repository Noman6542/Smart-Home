import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const openModal = (service) => {
    if (!user) {
      navigate("/login"); 
      return;
    }
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setFilteredServices(data);
      });
  }, []);

  useEffect(() => {
    let temp = services;

    // Search Filter
    if (searchText) {
      temp = temp.filter((s) =>
        s.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Type Filter
    if (selectedType !== "All") {
      temp = temp.filter((s) => s.type === selectedType);
    }

    // Budget Filter
    if (minBudget) {
      temp = temp.filter((s) => s.price >= parseInt(minBudget));
    }
    if (maxBudget) {
      temp = temp.filter((s) => s.price <= parseInt(maxBudget));
    }

    setFilteredServices(temp);
  }, [searchText, selectedType, minBudget, maxBudget, services]);

  const serviceTypes = ["All", "Home", "Wedding", "Office", "Seminar", "Meeting"];

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
            key={service.id}
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
              <p className="text-primary font-bold mt-2">BDT {service.price}</p>
              <p className="text-sm mt-1 text-gray-500">Type: {service.type}</p>
            </div>

            <div className="flex gap-3 mt-4">
              <Link to={`/service/${service.id}`} className="btn btn-outline w-1/2">
                Details
              </Link>
              <button
                onClick={() => openModal(service)}
                className="btn btn-primary w-1/2"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Book: {selectedService?.title}
            </h2>

            <p className="text-gray-600 text-center mb-4">
              Price: BDT {selectedService?.price}
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
              <input type="date" className="input input-bordered w-full" />
              <textarea
                placeholder="Additional Notes"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <button className="btn btn-primary w-full">Confirm Booking</button>
            </div>

            <button
              onClick={closeModal}
              className="btn btn-outline w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
