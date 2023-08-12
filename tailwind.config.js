/** @type {import('tailwindcss').Config} */
export default {

    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            fontSize:{
                xxs:"11px"
            },
            width: {
                full: "100%",
            },
            backgroundImage: (theme) => ({
                login: "url('./src/assets/image/loginBackground.png')",
            }),
            colors: {
                red: "#E92035",
                blue: "#23499A",
                blue_hover: "#052873",
                white_blue: "#FAFAFA",
                green: "#008000",
            },
            width: {
                562: "500px",
                400: "300px",
                594: "594px",
            },
            height: {
                562: "562px",
                753: "753px",
            },
        },

        screens: {
            "2xl": { max: "1535px" },
            // => @media (max-width: 1535px) { ... }

            xl: { max: "1279px" },
            // => @media (max-width: 1279px) { ... }

            lg: { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            md: { max: "767px" },
            // => @media (max-width: 767px) { ... }

            sm: { max: "639px" },
            // => @media (max-width: 639px) { ... }
        },

    },
    plugins: [],
};