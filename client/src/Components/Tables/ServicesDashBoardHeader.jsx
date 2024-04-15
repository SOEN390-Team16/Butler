import { Component } from "react";
import { IoNotifications } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5"; 

class ServicesDashBoardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      showDropdown: false,
      selectedNotification: null,
    };
  }

  componentDidMount() {
    // Fetch notifications from an API or any other source
    // For demonstration purposes, using dummy notifications
    this.setState({
      notifications: [
        { id: 1, message: "Notification 1" },
        { id: 2, message: "Notification 2" },
        { id: 3, message: "Notification 3" },
      ],
    });
  }

  handleBellClick = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  handleNotificationClick = (notification) => {
    this.setState({ selectedNotification: notification });
  };

  render() {
    const { notifications, showDropdown, selectedNotification } = this.state;

    return (
      <div
        style={{
          marginBottom: "48px",
          display: "flex",
          alignItems: "center",
          marginLeft: "96px",
          marginRight: "96px",
        }}
      >
        {/* Request a Service section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "auto",
            marginLeft: "140px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Request a Service
          <IoCalendarOutline style={{ fontSize: "32px", marginLeft: "10px" }} />
        </div>

        {/* Keep the notification section */}
        <div
          style={{
            position: "relative",
            marginLeft: "auto",
            marginRight: "120px",
          }}
        >
          <button
            onClick={this.handleBellClick}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              width: "32px", 
              height: "32px", 
            }}
          >
            <IoNotifications style={{ fontSize: "32px" }} />
          </button>
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "200px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: 999,
                marginTop: "5px", 
              }}
            >
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => this.handleNotificationClick(notification)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  {notification.message}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedNotification && (
          <div
            style={{
              marginTop: "16px",
              backgroundColor: "#f0f0f0",
              padding: "8px",
            }}
          >
            {selectedNotification.message}
          </div>
        )}
      </div>
    );
  }
}

export default ServicesDashBoardHeader;

