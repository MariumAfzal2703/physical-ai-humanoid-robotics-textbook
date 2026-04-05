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
      // Find the login navbar item
      const navbarItems = document.querySelectorAll('.navbar__item');

      navbarItems.forEach((item) => {
        const link = item.querySelector('a[href="/docs/intro?auth=1"]');

        if (link) {
          if (authToken && userEmail) {
            // User is authenticated - replace with avatar
            if (!item.querySelector('.user-avatar-wrapper')) {
              // Extract initials from email
              const parts = userEmail.split('@')[0].split('.');
              let initials = '';
              if (parts.length >= 2) {
                initials = (parts[0]?.charAt(0)?.toUpperCase() || '') + (parts[1]?.charAt(0)?.toUpperCase() || '');
              } else {
                initials = (parts[0]?.substring(0, 2)?.toUpperCase() || '').substring(0, 2);
              }

              // Color based on the first letter of the email
              const firstChar = userEmail.charAt(0).toLowerCase();
              const colors = [
                '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
                '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
                '#10ac84', '#ee5a24', '#0abde3', '#2e86de', '#b71540'
              ];
              const index = firstChar.charCodeAt(0) % colors.length;
              const bgColor = colors[index];

              // Create avatar wrapper
              const avatarWrapper = document.createElement('div');
              avatarWrapper.className = 'user-avatar-wrapper';

              avatarWrapper.innerHTML = `
                <div class="dropdown dropdown--hoverable dropdown--right">
                  <button class="navbar__link user-avatar-btn"
                    style="padding: 4px 8px; background: transparent; border: none; display: flex; align-items: center;">
                    <div style="
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      background-color: ${bgColor};
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: white;
                      font-weight: bold;
                      font-size: 14px;
                    ">
                      ${initials || '?'}
                    </div>
                  </button>
                  <ul class="dropdown__menu" style="min-width: 200px;">
                    <li style="padding: 8px 12px; border-bottom: 1px solid #eee;">
                      <span style="font-size: 12px; color: #666;">Signed in as</span><br />
                      <strong style="font-size: 13px; word-break: break-all;">${userEmail}</strong>
                    </li>
                    <li>
                      <button class="dropdown__link"
                        style="color: #dc3545; cursor: pointer; width: 100%; text-align: left; padding: 8px 12px; border: none; background: none;"
                        onclick="handleUserAvatarLogout()">
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              `;

              // Add logout function to window so it can be called from the button
              (window as any).handleUserAvatarLogout = () => {
                onLogout();
              };

              // Replace the content of the navbar item
              item.innerHTML = '';
              item.appendChild(avatarWrapper);
            }
          } else {
            // User is not authenticated - ensure login button is shown
            if (!item.querySelector('a')) {
              item.innerHTML = '<a href="/docs/intro?auth=1" class="navbar__link navbar-login-trigger">Login</a>';
            }
          }
        }
      });
    };

    // Run initially and then after DOM updates
    updateNavbar();
    const interval = setInterval(updateNavbar, 500); // Update periodically to handle SPA navigation

    return () => {
      clearInterval(interval);
      // Clean up the global function
      delete (window as any).handleUserAvatarLogout;
    };
  }, [authToken, userEmail, onLogout]);

  return null; // This component doesn't render anything
};

export default NavbarUpdater;