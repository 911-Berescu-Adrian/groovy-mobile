import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllTemporaryActions } from "../db/DatabaseService";

const ActionsContext = createContext();

export const ActionsProvider = ({ children }) => {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                getAllTemporaryActions((fetchedActions) => {
                    setActions(fetchedActions);
                }, alert);
            } catch (error) {
                console.error("Error fetching actions from database:", error);
            }
        };

        fetchActions();
    }, []);

    return <ActionsContext.Provider value={{ actions, setActions }}>{children}</ActionsContext.Provider>;
};

export const useActionsContext = () => {
    const context = useContext(ActionsContext);
    if (!context) {
        throw new Error("useActionsContext must be used within a actionsProvider");
    }
    return context;
};
