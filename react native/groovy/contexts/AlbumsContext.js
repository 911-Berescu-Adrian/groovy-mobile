import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllAlbums } from "../db/DatabaseService";

const AlbumsContext = createContext();

export const AlbumsProvider = ({ children }) => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                getAllAlbums((fetchedAlbums) => {
                    setAlbums(fetchedAlbums);
                }, alert);
            } catch (error) {
                console.error("Error fetching albums from database:", error);
            }
        };

        fetchAlbums();
    }, []);

    return <AlbumsContext.Provider value={{ albums, setAlbums }}>{children}</AlbumsContext.Provider>;
};

export const useAlbumsContext = () => {
    const context = useContext(AlbumsContext);
    if (!context) {
        throw new Error("useAlbumsContext must be used within a AlbumsProvider");
    }
    return context;
};
