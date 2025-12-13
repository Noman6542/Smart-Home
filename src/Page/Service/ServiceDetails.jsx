import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Loading/Loading";
import toast from "react-hot-toast";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load service
  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((res) => {
        const findService = res.data.data.find((s) => s._id === id);
        setService(findService);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const openModal = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  // BOOKING CREATE 
  const handleBooking = async () => {
    setLoading(true);

    const bookingData = {
      serviceId: service._id,
      serviceTitle: service.title,
      servicePrice: service.price,
      serviceType: service.type,
      userName: user.displayName,
      email: user.email,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      await axios.post("http://localhost:5000/bookings", bookingData);
      toast.success("Booking created successfully! Please complete payment.");
      closeModal();
      navigate("/dashboard/bookings");
    } catch (error) {
      console.error(error);
      toast.error("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!service) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* SERVICE DETAILS */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* IMAGE */}
        <div className="md:w-1/2">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-96 object-cover rounded-xl shadow"
          />
        </div>

        {/* INFO */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-bold">{service.title}</h2>
          <p className="text-gray-600 mt-4 ">{service.details}</p>

          <p className="text-3xl font-bold text-primary mt-6">
            Price: USD ${service.price}
          </p>

          <button
            onClick={openModal}
            className="btn btn-primary mt-6 w-40"
          >
            Book Now
          </button>

          <button
            onClick={() => navigate("/service")}
            className="btn btn-outline mt-4 w-40"
          >
            Back
          </button>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-3">
            <h2 className="text-2xl font-bold text-center">
              Confirm Booking
            </h2>

            <p>
              <strong>Service:</strong> {service.title}
            </p>
            <p className="max-h-40 overflow-y-auto">
              <strong>Details:</strong> {service.details}
            </p>
            <p className="text-xl font-bold">
              Price: ${service.price}
            </p>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>

            <button
              onClick={closeModal}
              className="btn btn-outline w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
