import { useObservable } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const navigate = useNavigate();

  const loginStep = useObservable(db.cloud.userInteraction);
  const user = useObservable(db.cloud.currentUser);

  useEffect(() => {
    if (!loginStep) db.cloud.login();
    if (user?.isLoggedIn) navigate("/");
  }, [loginStep, navigate, user]);

  const submitEmail = () => loginStep?.onSubmit({ email });
  const submitOTP = () => loginStep?.onSubmit({ otp });

  return (
    <>
      <p>Login Page</p>

      {loginStep?.type === "email" && (
        <>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <button onClick={submitEmail}>Get OTP</button>
        </>
      )}

      {loginStep?.type === "otp" && (
        <>
          <input type="text" onChange={(e) => setOtp(e.target.value)} />
          <button onClick={submitOTP}>Login</button>
        </>
      )}

      {/* <MinimalButton onClick={handleLogin}>Go to Homepage</MinimalButton> */}
    </>
  );
}
