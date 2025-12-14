import { useEffect, useState, use } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRoleLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(
          `/user/role/${user.email}`
        );
        setRole(res.data?.role);
      } catch (error) {
        console.error("Failed to fetch role", error);
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure]);

  return { role, roleLoading };
};

export default useRole;
