import { Component, type ErrorInfo, type ReactNode } from "react";
import { clearSessionState } from "../lib/storage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error in app tree", error, info);
  }

  private handleReset = () => {
    clearSessionState();
    window.location.assign(window.location.pathname);
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="app-shell">
        <section className="error-card" role="alert">
          <h1>出错了 / Something went wrong</h1>
          <p>
            页面遇到了一个意外错误。重新开始通常可以解决。
            <br />
            The page hit an unexpected error. Restarting usually fixes it.
          </p>
          <button className="question-button" onClick={this.handleReset} type="button">
            重新开始 / Restart
          </button>
        </section>
      </main>
    );
  }
}
