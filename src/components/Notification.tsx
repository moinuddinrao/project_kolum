import React, { useEffect } from "react";

import { notification } from "antd";

type NotificationProps = {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description?: string;
  duration?: number;
  showNotification: boolean;
};

const Notification = ({
  type,
  message,
  description,
  duration,
  showNotification,
}: NotificationProps) => {
  const [api, contextHolder] = notification.useNotification();

  // View notification
  const viewNotification = () => {
    api[type]({
      message,
      description,
      duration,
    });
  };

  // Show notification when showNotification is true
  useEffect(() => {
    if (showNotification) {
      viewNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNotification]);

  return <>{contextHolder}</>;
};

export default Notification;
