// FetchControllerManager.js
export class FetchControllerManager {
  // Singleton instance
  static instance = null;

  // Map to store controllers with their request URLs
  controllersMap = new Map();

  constructor() {
    if (!FetchControllerManager.instance) {
      FetchControllerManager.instance = this;
    }
    return FetchControllerManager.instance;
  }

  /**
   * Create and register a new AbortController for a specific URL
   * @param {string} url The request URL
   * @returns {AbortController} The created AbortController
   */
  createController(url) {
    const controller = new AbortController();
    this.controllersMap.set(controller, url);
    return controller;
  }

  /**
   * Abort all active fetch requests to a specific site
   * @param {string} siteUrl The base URL of the site to abort (e.g., "https://example.com")
   * @param {string} msg Optional message to log
   */
  abortRequestsToSite(siteUrl, msg = "Aborted fetches to site") {
    this.controllersMap.forEach((url, controller) => {
      if (url.startsWith(siteUrl)) {
        controller.abort();
        console.warn(`${msg}: ${url}`);
        this.controllersMap.delete(controller); // Cleanup after abort
      }
    });
  }

  /**
   * Remove a controller from the map after request completion
   * @param {AbortController} controller The controller to remove
   */
  removeController(controller) {
    this.controllersMap.delete(controller);
  }

  /**
   * Abort all active fetch requests regardless of the site
   * @param {string} msg Optional message to log
   */
  abortAll(msg = "Aborted all fetch requests") {
    this.controllersMap.forEach((url, controller) => {
      controller.abort();
      console.warn(`${msg}: ${url}`);
    });
    this.controllersMap.clear(); // Clear all controllers
  }
}

// Singleton instance to use throughout the app
export const fetchControllerManager = new FetchControllerManager();

/**
 * Helper function to abort all fetches to a specific site
 * @param {string} siteUrl The base URL of the site to abort
 */
export const abortAllRequests = (siteUrl) => {
  fetchControllerManager.abortRequestsToSite(
    "http://localhost:3000",
    `Manually Aborted Requests to ${siteUrl}`
  );
};
