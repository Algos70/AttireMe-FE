// src/components/SignUpLock.tsx
import React, { useEffect, useRef } from "react";

export type SignUpLockProps = {
  /** Which tab to show first: "signUp" or "login" */
  initialScreen?: "signUp" | "login";
};

const SignUpLock: React.FC<SignUpLockProps> = ({
  initialScreen = "signUp",
}) => {
  const hasShown = useRef(false);

  useEffect(() => {
    if (hasShown.current) return; // ← bail out on the 2nd mount
    hasShown.current = true;
    // update the page title
    document.title = `AttireMe - Auth0`;
    const Auth0Lock = (window as any).Auth0Lock;
    if (!Auth0Lock) {
      console.error("Auth0Lock not found—did you add the CDN <script>?");
      return;
    }

    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    if (!clientId || !domain) {
      console.error("Missing VITE_AUTH0_… env vars");
      return;
    }

    const lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: window.location.origin,
        responseType: "token id_token",
        params: { scope: "openid profile email" },
      },
      initialScreen, // <<< use the prop here
      additionalSignUpFields: [
        {
          name: "userType",
          type: "select",
          placeholder: "I am a…",
          options: [
            { value: "customer", label: "Customer" },
            { value: "vendor", label: "Vendor" },
          ],
        },
      ],
    });

    lock.show();
  }, [initialScreen]); // re-run effect if this prop changes

  return null;
};

export default SignUpLock;
