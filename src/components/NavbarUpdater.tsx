import React, { useEffect } from 'react';
import { clearAuthData } from '../utils/authUtils';

type NavbarUpdaterProps = {
  authToken: string | null;
  userEmail: string | null;
  onLogout: () => void;
};

const NavbarUpdater: React.FC<NavbarUpdaterProps> = ({ authToken, userEmail, onLogout }) => {
  useEffect(() => {
    // Update navbar based on authentication state
    const updateNavbar = () => {
      // Find navbar items and update them based on auth state
      const loginItem = document.querySelector('.navbar-login-trigger');
      const personalizeItem = document.querySelector('.navbar-personalize-trigger');
      const accountItem = document.querySelector('.navbar-account-trigger');

      if (!loginItem || !personalizeItem || !accountItem) {
        // If items don't exist yet, try again in a bit
        setTimeout(updateNavbar, 100);
        return;
      }

      if (authToken && userEmail) {
        // User is authenticated
        loginItem.classList.add('hidden');
        personalizeItem.classList.remove('hidden');
        accountItem.classList.remove('hidden');

        // Update account dropdown text
        const accountLink = accountItem.querySelector('a');
        if (accountLink) {
          accountLink.innerHTML = userEmail.substring(0, 10) + '...'; // Shorten email
          // Add click handler for logout
          accountLink.onclick = (e) => {
            e.preventDefault();
            onLogout();
          };
        }
      } else {
        // User is not authenticated
        loginItem.classList.remove('hidden');
        personalizeItem.classList.add('hidden');
        accountItem.classList.add('hidden');
      }
    };

    // Run initially and then after DOM updates
    updateNavbar();
    const interval = setInterval(updateNavbar, 500); // Update periodically to handle SPA navigation

    return () => clearInterval(interval);
  }, [authToken, userEmail, onLogout]);

  return null; // This component doesn't render anything
};

export default NavbarUpdater;