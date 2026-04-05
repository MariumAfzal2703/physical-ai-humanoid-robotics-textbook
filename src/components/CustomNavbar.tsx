import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { Navbar as DocusaurusNavbar } from '@docusaurus/theme-classic';
import styles from './CustomNavbar.module.css';

const CustomNavbar = () => {
  const location = useLocation();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  const handleLogout = () => {
    setAuthToken(null);
    setUserEmail(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  };

  return (
    <DocusaurusNavbar
      items={[
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Curriculum',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        ...(!authToken
          ? [
              {
                label: 'Login',
                position: 'right',
                to: '/docs/intro?auth=1',
                className: 'navbar-login-trigger',
              } as const,
            ]
          : [
              {
                label: `Personalize`,
                position: 'right',
                to: location.pathname,
              } as const,
              {
                type: 'dropdown',
                position: 'right',
                label: `${userEmail || 'Account'}`,
                items: [
                  {
                    label: 'Logout',
                    onClick: handleLogout,
                    className: 'navbar-logout-trigger',
                  },
                ],
              } as const,
            ]),
      ]}
    />
  );
};

export default CustomNavbar;