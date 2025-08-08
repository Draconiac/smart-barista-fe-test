import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../data/MenuItems";
import { useTranslation } from "react-i18next";
import trFlag from "../assets/tr.png";
import enFlag from "../assets/gb.png";
import logo from "../assets/coffee.jpeg";

type MenuItem = {
  label: string;
  path?: string;
  iconPath?: string;
  children?: MenuItem[];
};

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const { t, i18n } = useTranslation("navbar");

  const toggleSubmenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    alert("Çıkış yapıldı!");
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    changeLanguage(selectedLanguage);
  };

  return (
    <div
      className="bg-light border-end vh-100 d-flex flex-column p-3"
      style={{ width: "250px" }}
    >
      <div
        className="mb-4 text-center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "auto",
            height: "40px", // Sabit bir yükseklik belirleyerek logonun orantılı büyümesini sağlayın
            maxWidth: "40%", // Alanın %40'ını geçmeyecek şekilde ayarlandı
            marginRight: "10px",
          }}
        />
        <h5
          className="mt-2 mb-0"
          style={{ textAlign: "left", wordWrap: "break-word" }}
        >
          Eci Veci Vokke Kahvecisi
        </h5>
      </div>
      {/* Orta kısım: Menü */}
      <div className="list-group flex-grow-1">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu(item.label)}
                  aria-expanded={openMenus[item.label] || false}
                >
                  {item.iconPath && (
                    <img
                      src={item.iconPath}
                      alt={t(item.label)}
                      style={{
                        marginRight: "10px",
                        verticalAlign: "middle",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  )}
                  {t(item.label)} {/* Menü etiketini çevir */}
                  <span className="ms-auto">
                    <i
                      className={`bi ${
                        openMenus[item.label]
                          ? "bi-chevron-up"
                          : "bi-chevron-down"
                      }`}
                    ></i>
                  </span>
                </button>
                <div
                  className={`collapse ${
                    openMenus[item.label] ? "show" : ""
                  } ps-3`}
                >
                  {item.children.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.path}
                      className={({ isActive }) =>
                        `list-group-item list-group-item-action border-0 ${
                          isActive ? "active" : ""
                        }`
                      }
                    >
                      {child.iconPath && (
                        <img
                          src={child.iconPath}
                          alt={t(child.label)}
                          style={{
                            marginRight: "10px",
                            verticalAlign: "middle",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      )}
                      {t(child.label)} {/* Alt menü etiketini çevir */}
                    </NavLink>
                  ))}
                </div>
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `list-group-item list-group-item-action ${
                    isActive ? "active" : ""
                  }`
                }
              >
                {item.iconPath && (
                  <img
                    src={item.iconPath}
                    alt={t(item.label)}
                    style={{
                      marginRight: "10px",
                      verticalAlign: "middle",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                )}
                {t(item.label)} {/* Menü etiketini çevir */}
              </NavLink>
            )}
          </div>
        ))}
      </div>

      {/* Alt kısım: Dil ve çıkış */}
      <div className="mt-auto pt-3 border-top">
        <div className="mb-2">
          <select
            className="form-select form-select-sm"
            onChange={handleLanguageChange}
          >
            <option value="tr">
              {/* <img
                src={trFlag}
                alt="Türkçe"
                style={{ marginRight: "5px", verticalAlign: "middle" }}
              /> */}
              Türkçe
            </option>
            <option value="en">
              {/* <img
                src={enFlag}
                alt="English"
                style={{ marginRight: "5px", verticalAlign: "middle" }}
              /> */}
              English
            </option>
          </select>
        </div>
        <button className="btn btn-sm btn-danger w-100" onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
