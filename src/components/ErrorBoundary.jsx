import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          padding: "40px",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          color: "var(--color-text-1)",
          background: "var(--color-bg)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "var(--color-surface)",
            padding: "32px",
            borderRadius: "22px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            maxWidth: "600px"
          }}>
            <h1 style={{ margin: "0 0 16px 0", color: "var(--color-danger)" }}>Oops, something went wrong.</h1>
            <p style={{ margin: "0 0 24px 0", color: "var(--color-text-2)" }}>
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                cursor: "pointer",
                border: "none",
                background: "var(--color-primary)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "1rem",
                boxShadow: "0 4px 14px rgba(67, 97, 238, 0.28)"
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
