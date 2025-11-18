import { useNotificationContext } from "../assets/components/modal/NotificationModal/NotificationContext";

export default function useNotification() {
    return useNotificationContext().showNotification;
}
