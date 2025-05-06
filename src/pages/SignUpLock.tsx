import React, { useEffect, useRef } from "react";
import { setCookie } from "../utils/cookies";  // adjust path as needed

export type SignUpLockProps = {
  initialScreen?: "signUp" | "login";
};

const SignUpLock: React.FC<SignUpLockProps> = ({
  initialScreen = "signUp",
}) => {

  useEffect(() => {
    const Auth0Lock = (window as any).Auth0Lock;
    if (!Auth0Lock) {
      console.error("Auth0Lock not found—did you add the CDN <script>?");
      return;
    }

    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
    const domain   = import.meta.env.VITE_AUTH0_DOMAIN!;

    const lock = new Auth0Lock(clientId, domain, {
      auth: {
        responseType: "token id_token",
        params: { scope: "openid profile email" },
      },
      initialScreen,
      additionalSignUpFields: [
        {
          name: "userType",
          type: "select",
          placeholder: "I am a…",
          options: [
            { value: "customer", label: "Customer" },
            { value: "vendor",   label: "Vendor" },
          ],
        },
      ],
    });

    lock.on("authenticated", (authResult: any) => {
      // Set as normal (readable) cookies
      setCookie("access_token", authResult.accessToken, 1);
      setCookie("id_token",     authResult.idToken,     1);
      // Optional: expiry timestamp
      setCookie("expires_at",   String(Date.now() + authResult.expiresIn * 1000), 1);

      // Now you can redirect or fetch profile
      //console.log("access_token", authResult.accessToken);
      //console.log("id_token", authResult.idToken);
      //console.log("expires_at", Date.now() + authResult.expiresIn * 1000);
      window.location.replace("/");
    });

    lock.show();
    return () => lock.hide();
  }, [initialScreen]);

  return null;
};

export default SignUpLock;
