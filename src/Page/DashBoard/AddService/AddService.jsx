import { useForm } from "react-hook-form";
import { use, useState } from "react";
import { imageUpload } from "../../Utils";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddServicePage() {
  const { user } = use(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
  try {
    const { description, details, price, title, type } = data;
    const imageFile = data?.image[0];

    toast.loading("Uploading image...", { id: "upload" });

    const imageUrl = await imageUpload(imageFile);

    toast.loading("Saving service...", { id: "upload" });

    const serviceData = {
      image: imageUrl,
      description,
      details,
      price: Number(price),
      title,
      type,
      seller: {
        image: user?.photoURL,
        name: user?.displayName,
        email: user?.email,
      },
      createdAt: new Date(),
    };

    const res = await axios.post(
      `${import.meta.env.VITE_Server_localhost}/services`,
      serviceData
    );

    toast.success("Service added successfully!", { id: "upload" });

    reset();
    setPreview(null);

  } catch (error) {
    console.log(error);
    toast.error("Failed to add service!", { id: "upload" });
  }
};

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-xl rounded-2xl bg-white mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Service</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Service Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full input input-bordered"
            placeholder="e.g. Smart Home Installation"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block font-semibold mb-1">Service Type</label>
          <select
            {...register("type", { required: "Service type is required" })}
            className="w-full select select-bordered"
          >
            <option value="">Select Type</option>
            <option value="Smart Home">Smart Home</option>
            <option value="Decoration">Decoration</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Short Description</label>
          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full input input-bordered"
            placeholder="e.g. Complete smart home automation setup"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price (USD $)</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full input input-bordered"
            placeholder="12000"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Details */}
        <div>
          <label className="block font-semibold mb-1">Service Details</label>
          <textarea
            {...register("details", { required: "Details are required" })}
            className="w-full textarea textarea-bordered"
            placeholder="Full description here..."
          ></textarea>
          {errors.details && (
            <p className="text-red-500 text-sm">{errors.details.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Service Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
            onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {preview && (
          <img src={preview} alt="Preview" className="w-40 mt-2 rounded-xl" />
        )}

        <button type="submit" className="btn btn-primary w-full text-lg">
          Add Service
        </button>
      </form>
    </div>
  );
}
