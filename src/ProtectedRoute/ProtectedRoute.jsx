import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { setIsLoginPageInWidow } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function grantAccessToken() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/grant_new_access_token`, {
          method: "POST",
          credentials: "include"
        });
        const data = await res.json();
        if (!data.success) {
          toast(data.msg);
          return false;
        }
        return true;
      } catch (err) {
        toast(err.message);
        return false;
      }
    }

    async function checkLoggedInStatus() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logged_in_status`, {
          method: "GET",
          credentials: "include"
        });
        const data = await res.json();

        if (!data.success) {
          if (data.msg === "no_access_token") {
            const granted = await grantAccessToken();
            if (!granted) {
              if (isMounted) {
                navigate("/auth");
                setIsLoginPageInWidow(true);
              }
              return;
            }
            return checkLoggedInStatus();
          } else {
            if (isMounted) {
              toast(data.msg);
              navigate("/auth");
              setIsLoginPageInWidow(true);
            }
            return;
          }
        }
      } catch (err) {
        if (isMounted) toast(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkLoggedInStatus();

    return () => { isMounted = false; }
  }, [navigate, setIsLoginPageInWidow]);

  if (loading) return null;

  return <>{children}</>;
}

export default ProtectedRoute;
