import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/services.json")
      .then(res => res.json())
      .then(data => {
        const findService = data.find(s => s.id == id);
        setService(findService);
      });
  }, [id]);

  const openModal = () => {
    if (!user) {
      navigate("/login"); 
      return;
    }
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  if (!service) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <img src={service.image} className="w-full h-80 object-cover rounded-xl" />
      
      <h2 className="text-4xl font-bold mt-5">{service.title}</h2>
      <p className="text-gray-600 mt-2">{service.details}</p>

      <p className="text-2xl font-bold text-primary mt-4">
        Price: BDT {service.price}
      </p>

      <button onClick={openModal} className="btn btn-primary mt-6">
        Book Now
      </button>

      {/*  BOOKING MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">

            <h2 className="text-2xl font-bold mb-2 text-center">
              Book: {service?.title}
            </h2>

            <p className="text-gray-600 text-center mb-4">
              Price: BDT {service?.price}
            </p>

            <div className="space-y-3">
              <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
              <input type="text" placeholder="Phone Number" className="input input-bordered w-full" />
              <input type="date" className="input input-bordered w-full" />
              <textarea placeholder="Additional Notes" className="textarea textarea-bordered w-full"></textarea>

              <button className="btn btn-primary w-full">Confirm Booking</button>
            </div>

            <button onClick={closeModal} className="btn btn-outline w-full mt-4">
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default ServiceDetails;
