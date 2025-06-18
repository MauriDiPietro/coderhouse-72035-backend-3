export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Noticias",
      version: "1.0.0",
      description: "API para gestionar noticias",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "https://api.example.com",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
