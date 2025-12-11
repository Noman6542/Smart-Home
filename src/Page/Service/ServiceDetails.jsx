import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, data } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Loading from "../../Loading/Loading";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((res) => {
        const data = res.data.data;
        const findService = data.find((s) => s._id === id);
        setService(findService);
      })
      .catch((err) => console.log(err));
  }, [id, user]);

  

  const openModal = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  // payment
  const { _id, title, details, price, type } = service || {};

  const handlePayment = async () => {
    const paymentInfo = {
      serviceId: _id,
      serviceName: title,
      serviceType: type,
      description: details,
      price: price,
      userName: user?.displayName,
      userEmail: user?.email,
    };

    const { data } = await axios.post(
      `http://localhost:5000/create-checkout-session`,
      paymentInfo
    )
    window.location.href = data.url
  };

  // Booking

  // const handleBooking = async (e) => {
  //   e.preventDefault();
  //   if (!formData.date || !formData.location) {
  //     alert("Please fill all required fields");
  //     return;
  //   }

  //   const bookingData = {
  //     ...formData,
  //     serviceId: service._id,
  //     serviceTitle: service.title,
  //     servicePrice: service.price,
  //     status: "pending",
  //     createdAt: new Date(),
  //   };

  //   try {
  //     await axios.post("http://localhost:5000/bookings", bookingData);
  //     alert("Booking successful!");
  //     closeModal();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Booking failed. Try again.");
  //   }
  // };

  if (!service) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Service Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT SIDE - IMAGE */}
        <div className="md:w-1/2">
          <img
            src={service.image}
            className="w-full h-96 object-cover rounded-xl shadow"
            alt={service.title}
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
          <button onClick={openModal} className="btn btn-primary mt-6 w-40">
            Book Now
          </button>
          <button onClick={() => navigate('/service')}  className="btn hover:btn-accent mt-6 w-40">
            Back
          </button>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-3">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Book: {service.title}
            </h2>
            <p className="text-gray-600 text-center mb-2">
              Price: BDT {service.price}
            </p>

            {/* Service Info without image */}
            <p>
              <strong>Title:</strong> {service.title}
            </p>
            <p>
              <strong>Details:</strong> {service.details}
            </p>
            <p>
              <strong>Price:</strong> BDT {service.price}
            </p>

            {/* Button text changed to Pay */}
            <button onClick={handlePayment} type="button" className="btn btn-primary w-full">
              Pay
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-outline w-full mt-2"
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
