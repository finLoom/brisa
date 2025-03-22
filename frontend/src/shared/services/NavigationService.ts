// frontend/src/shared/services/NavigationService.ts

/**
* Navigation service to abstract routing logic
*/
export class NavigationService {
    private static instance: NavigationService;
private navigationHandler: (path: string) => void;

  private constructor() {
    // Default no-op navigation handler
    this.navigationHandler = (path: string) => {
      console.warn(`Navigation to ${path} not configured`);
    };
  }

  // Singleton pattern
  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService();
    }
    return NavigationService.instance;
  }

  // Set the navigation handler (typically called by routing provider)
  public setNavigationHandler(handler: (path: string) => void) {
    this.navigationHandler = handler;
  }

  // Navigate to a specific path
  public navigate(path: string) {
    this.navigationHandler(path);
  }
}

// Utility hook for easy navigation
export const useNavigationService = () => {
  const navigationService = NavigationService.getInstance();
  return navigationService.navigate.bind(navigationService);
};