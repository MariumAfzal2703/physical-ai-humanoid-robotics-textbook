import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import { clearAuthData } from '../utils/authUtils';

type UserAvatarProps = {
  userEmail: string | null;
  authToken: string | null;
  onLogout: () => void;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ userEmail, authToken, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Extract initials from email
  const getInitials = (email: string | null): string => {
    if (!email) return '?';
    const parts = email.split('@')[0].split('.');
    if (parts.length >= 2) {
      return (parts[0]?.charAt(0)?.toUpperCase() || '') + (parts[1]?.charAt(0)?.toUpperCase() || '');
    }
    return (parts[0]?.substring(0, 2)?.toUpperCase() || '').substring(0, 2);
  };

  // Determine if we're on a doc page
  const isDocPage = location.pathname.startsWith('/docs/');

  // Color based on the first letter of the email
  const getAvatarColor = (email: string | null): string => {
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

  if (!authToken || !userEmail) {
    return null; // Don't show avatar when not logged in
  }

  return (
    <div className="navbar__item" ref={dropdownRef}>
      <div className="dropdown dropdown--hoverable dropdown--right">
        <button
          className="navbar__link"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: getAvatarColor(userEmail),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {getInitials(userEmail)}
          </div>
        </button>

        {isOpen && (
          <ul className="dropdown__menu">
            <li style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>
              <span style={{ fontSize: '12px', color: '#666' }}>Signed in as</span><br />
              <strong style={{ fontSize: '13px' }}>{userEmail}</strong>
            </li>

            {isDocPage && (
              <li>
                <a
                  href="#"
                  className="dropdown__link"
                  onClick={(e) => {
                    e.preventDefault();
                    // Trigger personalization - we'll let the ChapterActions component handle this
                    setIsOpen(false);
                  }}
                >
                  Personalize Chapter
                </a>
              </li>
            )}

            <li>
              <button
                className="dropdown__link"
                style={{ color: '#dc3545', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;