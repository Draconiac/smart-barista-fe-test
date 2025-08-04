import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { menuItems } from '../data/MenuItems'

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key:string]:boolean }>({});

  const toggleSubmenu = (label:string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="bg-light border-end vh-100 p-3" style={{ width: '250px' }}>
      <div className="list-group">
        {menuItems.map((item, index) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu(item.label)}
                  aria-expanded={openMenus[item.label] || false}
                >
                  {item.label}
                  <span className="ms-auto">
                    <i
                      className={`bi ${openMenus[item.label] ? 'bi-chevron-up' : 'bi-chevron-down'
                        }`}
                    ></i>
                  </span>
                </button>

                <div
                  className={`collapse ${openMenus[item.label] ? 'show' : ''} ps-3`}
                >
                  {item.children.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.path}
                      className={({ isActive }) =>
                        `list-group-item list-group-item-action border-0 ${isActive ? 'active' : ''
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `list-group-item list-group-item-action ${isActive ? 'active' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
