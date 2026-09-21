// Base URL de l'API. Surchargeable au build via VITE_API_URL
// (ex: docker-compose pointe sur le service api-mock).
export const API_URL: string = import.meta.env.VITE_API_URL || 'https://api.sachadvr.fr';
