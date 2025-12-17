import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../../Loading/Loading";
import useAxiosSecure from "../HooksRole/useAxiosSecure";
import { useNavigate } from "react-router";

const MostPoPularDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosSecure.get("/popular-services?sort=price_desc&limit=6");
        const sortedServices = res.data.data.sort((a, b) => b.price - a.price);
        setServices(sortedServices);
      } catch (err) {
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [axiosSecure]);

  if (loading) return <Loading></Loading>;

  return (
    <div className="max-w-6xl mx-auto py-4">
      <h2 className="text-3xl font-bold mb-4 text-center">
        <span className="text-gray-800">Most Popular</span>{" "}
        <span className="text-indigo-600">Decorators</span>
      </h2>
      {services.length === 0 ? (
        <p className="text-gray-500">No services available</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              onClick={() => navigate(`/service/${service._id}`)}
              className=" cursor-pointer rounded-2xl shadow hover:shadow-lg transition p-5"
            >
              <img
                src={service.image || "https://via.placeholder.com/150"}
                alt={service.serviceName}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">{service.serviceName}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <p className="mt-2 font-bold text-blue-600">${service.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostPoPularDecorator;
