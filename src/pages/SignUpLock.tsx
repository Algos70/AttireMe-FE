import React, { useEffect, useRef } from "react";
import { setCookie } from "../utils/cookies";  // adjust path as needed
import { decodeToken } from "../utils/jwt";
import { getUserByEmail, createUser } from "../utils/api";

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
          property: "user_metadata.userType",
          type: "select",
          placeholder: "I am a…",
          options: [
            { value: "customer", label: "Customer" },
            { value: "vendor",   label: "Vendor" },
          ],
        },
      ],
    });

    lock.on("authenticated", async (authResult: any) => {
      setCookie("access_token", authResult.accessToken, 1);
      setCookie("id_token",     authResult.idToken,     1);
      setCookie("expires_at",   String(Date.now() + authResult.expiresIn * 1000), 1);

      // Decode token to get user info
      const decoded = decodeToken(authResult.idToken);
      if (decoded && decoded.email) {
        const email = decoded.email;
        const username = decoded.nickname || decoded.name || email.split('@')[0];
        // You may need to get the role from user_metadata or another claim
        const role = decoded.custom_roles?.includes('creator') ? 'creator' : 'user';
        try {
          await getUserByEmail(email);
        } catch (err: any) {
          if (err.message && err.message.includes('404')) {
            // User does not exist, create user
            await createUser({ email, username, role });
          } else {
            // Other error
            console.error('Error checking user existence:', err);
          }
        }
      }
      window.location.replace("/");
    });

    lock.show();
    return () => lock.hide();
  }, [initialScreen]);

  return null;
};

export default SignUpLock;
