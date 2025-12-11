import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import axios, { Axios } from "axios";
import Loading from "../../Loading/Loading";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    notes: "",
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
  axios.get("http://localhost:5000/services")
    .then(res => {
      const data = res.data.data; // backend returns { success, message, data: [] }

      const findService = data.find(s => s._id == id); // MongoDB uses _id

      setService(findService);

      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.displayName || "",
          email: user.email || "",
        }));
      }
    })
    .catch(err => console.log(err));
}, [id, user]);

  const openModal = () => {
    if (!user) {
      navigate("/login"); 
      return;
    }
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.location) {
      alert("Please fill all required fields");
      return;
    }

    const bookingData = {
      ...formData,
      serviceId: service.id,
      serviceTitle: service.title,
      servicePrice: service.price,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      // Backend API call
      const res = await axios.post(
        "http://localhost:5000/bookings",
        bookingData
      );
      alert("Booking successful!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Booking failed. Try again.");
    }
  };

  if (!service) return <Loading></Loading>;

  return (
  <div className="max-w-6xl mx-auto py-10 px-4">

    <div className="flex flex-col md:flex-row gap-8">

      {/* LEFT SIDE - IMAGE */}
      <div className="md:w-1/2">
        <img 
          src={service.image}
          className="w-full h-96 object-cover rounded-xl shadow"
        />
      </div>

      {/* RIGHT SIDE - DETAILS */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <h2 className="text-4xl font-bold">{service.title}</h2>

        <p className="text-gray-600 mt-4 leading-relaxed">
          {service.details}
        </p>

        <p className="text-3xl font-bold text-primary mt-6">
          Price: BDT {service.price}
        </p>

        <button 
          onClick={openModal} 
          className="btn btn-primary mt-6 w-40"
        >
          Book Now
        </button>
      </div>

    </div>

    {/* BOOKING MODAL */}
    {isOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <form 
          onSubmit={handleBooking}
          className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-3"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">
            Book: {service.title}
          </h2>

          <p className="text-gray-600 text-center mb-4">
            Price: BDT {service.price}
          </p>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input input-bordered w-full"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional Notes"
            className="textarea textarea-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full">Confirm Booking</button>
          <button type="button" onClick={closeModal} className="btn btn-outline w-full mt-2">Close</button>
        </form>
      </div>
    )}
  </div>
);

};

export default ServiceDetails;
