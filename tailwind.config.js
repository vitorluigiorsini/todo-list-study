/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // buscar por todos os arquivos html ou js dentro da pasta src
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#5453a0", // alterar a cor da varial blue na chave 500
        },
      },
    },
  },
  plugins: [],
};
