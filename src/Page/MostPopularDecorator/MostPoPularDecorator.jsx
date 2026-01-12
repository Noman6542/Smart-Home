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
        const res = await axiosSecure.get(
          "/popular-services?sort=price_desc&limit=6"
        );
        const sortedServices = res.data.data.sort(
          (a, b) => b.price - a.price
        );
        setServices(sortedServices);
      } catch (err) {
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="text-gray-800 dark:text-white">Most Popular</span>{" "}
        <span className="text-indigo-600 dark:text-indigo-400">
          Decorators
        </span>
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No services available
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              onClick={() => navigate(`/service/${service._id}`)}
              className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-none hover:shadow-xl dark:hover:shadow-indigo-500/10 transition p-5 border border-gray-100 dark:border-gray-800"
            >
              <img
                src={service.image || "https://via.placeholder.com/300"}
                alt={service.serviceName}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {service.serviceName}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {service.description}
              </p>

              <p className="mt-3 font-bold text-indigo-600 dark:text-indigo-400">
                ${service.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MostPoPularDecorator;
