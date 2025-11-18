import { createContext, useContext, useState, useCallback } from "react";
import NotificationModal from "./NotificationModal";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((status, custom = {}) => {
        setNotification({
            status,
            ...custom,
        });
    }, []);

    const hideNotification = () => setNotification(null);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <NotificationModal notification={notification} hide={hideNotification} />
        </NotificationContext.Provider>
    );
}

export const useNotificationContext = () => useContext(NotificationContext);
