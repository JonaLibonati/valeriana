import React from "react";
import { handleLogInGoogle } from "../firebase/providers";
import { FilledButton } from "../components/globalComponents/buttons/FilledButton";

export const AppointmentsPage = () => {
  return (
    <>
      
      <FilledButton>
        <button onClick={handleLogInGoogle}>Configurar calendario</button>
      </FilledButton>
    </>
  );
};

/* {
  "federatedId": "https://accounts.google.com/108657921358310099397",
  "providerId": "google.com",
  "email": "libonatijonathan@gmail.com",
  "emailVerified": true,
  "firstName": "Jonathan",
  "fullName": "Jonathan Libonati",
  "lastName": "Libonati",
  "photoUrl": "https://lh3.googleusercontent.com/a/ACg8ocKYqu5g6UKz889T9ylOQ_yAzHQZUTsEAaUoGtUIumI76UZ_1g=s96-c",
  "localId": "KJcaY5opcxNbd4wpb96EfnNw2sy2",
  "displayName": "Jonathan Libonati",
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5M2Y3N2Q0N2ViOTBiZjRiYTA5YjBiNWFkYzk2ODRlZTg1NzJlZTYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSm9uYXRoYW4gTGlib25hdGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS1lxdTVnNlVLejg4OVQ5eWxPUV95QXpIUVpVVHNFQWFVb0d0VUl1bUk3NlVaXzFnPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3ZhbGVyaWFuYS00MTczMjEiLCJhdWQiOiJ2YWxlcmlhbmEtNDE3MzIxIiwiYXV0aF90aW1lIjoxNzIwMTAwNzExLCJ1c2VyX2lkIjoiS0pjYVk1b3BjeE5iZDR3cGI5NkVmbk53MnN5MiIsInN1YiI6IktKY2FZNW9wY3hOYmQ0d3BiOTZFZm5OdzJzeTIiLCJpYXQiOjE3MjAxMDA3MTEsImV4cCI6MTcyMDEwNDMxMSwiZW1haWwiOiJsaWJvbmF0aWpvbmF0aGFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4NjU3OTIxMzU4MzEwMDk5Mzk3Il0sImVtYWlsIjpbImxpYm9uYXRpam9uYXRoYW5AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.W6DL8MBtA1SQ3zzlqcEqfTas67jcGy5znB5i_QwHvIYhLSelZHfnI4avR0g5UjBz7hVSQTDmbe_G7QFCZllXYs4XSWyX8TbZMJXgd_fcxrNdLQR6mWN6y4GExM3ypV7l2VxI4PowP1WKIhg5H0pwtCBqqasOfTqXqK5b3Q813P6_pnJfvrDrkRUWR-RpiU-czNFPMj6Ff0gN5f_1psv8O6tBr4nADyhdbXYvnyE1dnO0g46Xgs1M5cvc4kEPsR-OD3KR_MyNH7m_Jx_ZlEm_FfNZYfJ8-hBvWSquHKm1VJgsrsW4xGkn_YmC_iVg8eUjpA7c1lcNbHsLyNsZS_uXWg",
  "context": "",
  "oauthAccessToken": "ya29.a0AXooCgvY3-0JbBzrkaopC16ryPJdFS60QjNdfAoqT5gXVGn_niu2IgpSj0ivHSCnJGkyE4sYIieaRqEssJULnY6lofDbQXeF7ntNNctuLhtkUiIMumqQDerwIvDug4hXfKqriNnRlEgLh9171t8zWbm19JWlXL0A2z4aCgYKAVgSARESFQHGX2MiZnLb18Bw3nOVQp8NHCCupw0170",
  "oauthExpireIn": 3599,
  "refreshToken": "AMf-vBzyp7TaricODtLO9qwU5Y1MfIRsNeeEQqSaAoEwDzsRtB8_rSrMcSrkr_BPPVR5T5p-oPV57HvLHmVVJTIFDw0LsJKA5MENDjfyJ3oxTLC0-p0erc4q82zdyFaH7Yzo-zncoxFVcTF1z-OlQJhfXVxRF8d5TpztrK9OrhM1LcBvGv7KZOnRCibQj6QdObeIiP5UfIDdZ_jXQmoyqzvfnD2D82R15YYjx-7u7p04v3LYglIGiXTy0VHVj3fdoK6G-rNdW-1CbmMc1Wv5CeT--Xj9DQC3RfCfJh4i0bSJeQj_yFQ_NnTp1GuQS0UPT3W5hM_PlPgYweYH7i1VhXPmR--IT03KUty8g4RLP3xHRAFtQS4w_yMkpVbjQQMoZL2iAnyDSYDHfHUoLywyRVS6yyRLROkicMf0S8RyHAr42tL4Dd7CsOgRZHB4HmpjJuEQDMR-sYVB",
  "expiresIn": "3600",
  "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJhZjkwZTg3YmUxNDBjMjAwMzg4OThhNmVmYTExMjgzZGFiNjAzMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjE0ODYxODU4MTU2LTBsc2RqMG5hOXJoanM0YWZlOW9mMzRnbXZucTVlNmo0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjE0ODYxODU4MTU2LTBsc2RqMG5hOXJoanM0YWZlOW9mMzRnbXZucTVlNmo0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4NjU3OTIxMzU4MzEwMDk5Mzk3IiwiZW1haWwiOiJsaWJvbmF0aWpvbmF0aGFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWHY1Tkh2QU9qX25iTHVUbjVYbWxWUSIsImlhdCI6MTcyMDEwMDcxMSwiZXhwIjoxNzIwMTA0MzExfQ.E5VDzYzvFhWJd8yvbTJSXYYaSAWqFh4JrDwMz-xCMrxt0uf4L0UqhcLn0SNba-3kcVhlM5780lfkvlqHls4_CkD568HnykZwHKXfi-o1VjrxHeN71ARBU3qLeWkbw1jejioH2T8rpv3fG9w2z0qc5oH_F-aZj4aH8s6n3UDq5me-Bx-AsV_oiAEQyJ8gLSULKNmJq9warldLggG81vcYUHNbloDdhfZvaHU9hnSNSN7Bpz5Px7s_HIz5tN1dX_g45unhnfBUbBhZnpb74-q0vifcJMdLUAxVO7oBtGlUrmJ-vx6neQfSQmo7cOMGmkuGw7NqLSWB0Ua8ORodEQQO3A",
  "rawUserInfo": "{\"name\":\"Jonathan Libonati\",\"granted_scopes\":\"openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar\",\"id\":\"108657921358310099397\",\"verified_email\":true,\"given_name\":\"Jonathan\",\"family_name\":\"Libonati\",\"email\":\"libonatijonathan@gmail.com\",\"picture\":\"https://lh3.googleusercontent.com/a/ACg8ocKYqu5g6UKz889T9ylOQ_yAzHQZUTsEAaUoGtUIumI76UZ_1g=s96-c\"}",
  "kind": "identitytoolkit#VerifyAssertionResponse"
} */