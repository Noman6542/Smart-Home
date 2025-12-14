import { useEffect, useState, use } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    //  wait until auth loading finished
    if (loading) return;

    //  auth done but no user
    if (!user?.email) {
      setRoleLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/user/role/${user.email}`);
        setRole(res.data?.role || "user");
      } catch (error) {
        console.error("Failed to fetch role", error);
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, loading, axiosSecure]);

  return { role, roleLoading };
};

export default useRole;