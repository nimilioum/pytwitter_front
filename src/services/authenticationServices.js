import axios from "./axios";
import * as queryString from 'query-string';

export const googleAuthenticationUrl = () => {

    const stringifiedParams = queryString.stringify({
        client_id: '498497953371-4h3t8oorr2j3mvhrmpvj6h244qqqlcoq.apps.googleusercontent.com', //add env variable later
        redirect_uri: `${window.location.protocol+'//'+window.location.hostname}/authenticate/google`,
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' '), // space seperated string
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    return googleLoginUrl;


}

export const githubAuthenticationUrl = () => {
    const params = queryString.stringify({
        client_id: '219c7536dccdba993577',
        redirect_uri: `${window.location.protocol+'//'+window.location.hostname}/authenticate/github`,
        scope: ['read:user', 'user:email'].join(' '), // space seperated string
        allow_signup: true,
    });

    const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;
    return githubLoginUrl;
}

export const googleAuthentication = async (code) => {
    try {
        const response = await axios.post('/api/auth/login/google', {
            code,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const githubAuthentication = async (code) => {
    try {
        const response = await axios.post('/api/auth/login/github', {
            code,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}

export const signupWithUsername = async (username, password) => {
    try {
        const response = await axios.post('/api/auth/register/', {

            username,
            password,
        });
        console.log(response, "CMKFMFWN")
        return response.data;
    } catch (error) {
        if (error.response.status == 400) {
            throw new Error("username already exists")
        }
    }

}

export const getCurrentUser = async (username) => {
    try {
        const response = await axios.get(`/api/user/${username}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const loginWithUsername = async (username, password) => {
    try {
        const response = await axios.post('/api/auth/token/', {

            username,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }

}

export const verifyEmailToken = async (token) => {
    try {
        const response = await axios.post('/api/auth/confirm/email', {
            token
        },{
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}