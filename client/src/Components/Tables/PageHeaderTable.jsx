import  { Component } from "react";
import { IoNotifications } from "react-icons/io5";

class PageHeaderTable extends Component {
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
        <div style={{ width: "1030px", flexShrink: 0 }}>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "30px", // Font size set to 32 pixels
              color: "black",
              textAlign: "left",
              alignSelf: "flex-start",
              lineHeight: "normal",
              height: "auto",
              marginLeft: "140px",
            }}
          >
            {this.getDateString()}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            marginLeft: "auto",
            marginRight: "96px",
          }}
        >
          <button
            onClick={this.handleBellClick}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              width: "32px", // Width set to 32 pixels
              height: "32px", // Height set to 32 pixels
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
                marginTop: "5px", // Adjust the space between button and dropdown
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

  getDateString() {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    let dateString = today.toLocaleDateString("en-US", options);
    const commaIndex = dateString.indexOf(",");
    const spaceIndex = dateString.lastIndexOf(" ");
    dateString =
      dateString.slice(0, commaIndex) +
      dateString.slice(commaIndex + 1, spaceIndex) +
      dateString.slice(spaceIndex);
    return dateString;
  }
}

export default PageHeaderTable;