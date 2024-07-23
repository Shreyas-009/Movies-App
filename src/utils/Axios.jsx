import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept:"application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWMzMmViZjY2ZWMyNDk5ZTRmYTMyZjc1MDhmZGU5OSIsIm5iZiI6MTcyMTY4MDI2Ny45MDA2MjksInN1YiI6IjY2OWVjMDExMTRkNjEwOGZkMTRjNThiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f0G4ts8Ugpn3bVLSI-6-D21kCrhqqrT4W9crPmfBjvo",
    }
})

export default instance;