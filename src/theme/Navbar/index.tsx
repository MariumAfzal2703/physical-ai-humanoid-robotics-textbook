import React, { useState, useEffect } from 'react';
import Navbar from '@theme-original/Navbar';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

const CustomNavbar = (props) => {
  const [authToken, setAuthToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check for existing token in localStorage on mount
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authToken');
      const storedEmail = localStorage.getItem('userEmail');

      if (storedToken) {
        setAuthToken(storedToken);
      }
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }
  }, [location.pathname]);

  // Extract initials from email
  const getInitials = (email) => {
    if (!email) return '?';
    const parts = email.split('@')[0].split('.');
    if (parts.length >= 2) {
      return (parts[0]?.charAt(0)?.toUpperCase() || '') + (parts[1]?.charAt(0)?.toUpperCase() || '');
    }
    return (parts[0]?.substring(0, 2)?.toUpperCase() || '').substring(0, 2);
  };

  // Color based on the first letter of the email
  const getAvatarColor = (email) => {
    if (!email) return '#6c757d';
    const firstChar = email.charAt(0).toLowerCase();
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
      '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
      '#10ac84', '#ee5a24', '#0abde3', '#2e86de', '#b71540'
    ];
    const index = firstChar.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUserEmail(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    // Refresh the page to update the navbar
    window.location.reload();
  };

  // Clone the original navbar props and modify items
  const modifiedProps = {
    ...props,
    items: props.items.map(item => {
      if (item.label === 'Login') {
        if (authToken && userEmail) {
          // Replace login with user avatar
          return {
            type: 'html',
            value: `
              <div class="dropdown dropdown--hoverable dropdown--right">
                <button class="navbar__link user-avatar-btn" style="padding: 4px 8px; background: transparent; border: none;">
                  <div style="
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background-color: ${getAvatarColor(userEmail)};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                  ">
                    ${getInitials(userEmail)}
                  </div>
                </button>
                <ul class="dropdown__menu" style="min-width: 200px;">
                  <li style="padding: 8px 12px; border-bottom: 1px solid #eee;">
                    <span style="font-size: 12px; color: #666;">Signed in as</span><br />
                    <strong style="font-size: 13px;">${userEmail}</strong>
                  </li>
                  <li>
                    <button class="dropdown__link" style="color: #dc3545; cursor: pointer; width: 100%; text-align: left;" onclick="handleLogout()">
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            `,
            className: 'user-avatar-container',
          };
        } else {
          // Return the original login item
          return item;
        }
      }
      return item;
    })
  };

  return <Navbar {...modifiedProps} />;
};

export default CustomNavbar;