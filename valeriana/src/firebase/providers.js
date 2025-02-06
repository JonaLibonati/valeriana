import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { appFireBase } from "./config";

const provider = new GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/calendar');
provider.setCustomParameters({
    'access_type': 'offline',
    'prompt': 'consent'
});

const auth = getAuth(appFireBase);

export const handleLogInGoogle = async () => {
    if(auth.currentUser) {
        const url = "https://securetoken.googleapis.com/v1/token?key=[AIzaSyAuVm3A5wsff1VNn8s9VNIUdgW-WPILjDU]"
        const payload = {
            grant_type: "refresh_token",
            refresh_token: "AMf-vBzyp7TaricODtLO9qwU5Y1MfIRsNeeEQqSaAoEwDzsRtB8_rSrMcSrkr_BPPVR5T5p-oPV57HvLHmVVJTIFDw0LsJKA5MENDjfyJ3oxTLC0-p0erc4q82zdyFaH7Yzo-zncoxFVcTF1z-OlQJhfXVxRF8d5TpztrK9OrhM1LcBvGv7KZOnRCibQj6QdObeIiP5UfIDdZ_jXQmoyqzvfnD2D82R15YYjx-7u7p04v3LYglIGiXTy0VHVj3fdoK6G-rNdW-1CbmMc1Wv5CeT--Xj9DQC3RfCfJh4i0bSJeQj_yFQ_NnTp1GuQS0UPT3W5hM_PlPgYweYH7i1VhXPmR--IT03KUty8g4RLP3xHRAFtQS4w_yMkpVbjQQMoZL2iAnyDSYDHfHUoLywyRVS6yyRLROkicMf0S8RyHAr42tL4Dd7CsOgRZHB4HmpjJuEQDMR-sYVB",
        }

        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          };

        const res = await fetch(url, options);
        const body = await res.json();
        console.log(body)

    } else {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
    }
    /* const result = await signInWithPopup(auth, provider) */
}