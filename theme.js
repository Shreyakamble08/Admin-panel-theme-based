// Theme Configuration
const themes = {
  peach: {
    name: "Peach",
    primary: "#f5afaf",
    primaryDark: "#d89595",
    secondary: "#f9dfdf",
    background: "#fcf8f8",
    surface: "rgba(255, 255, 255, 0.85)",
    text: "#1f2937",
    textLight: "#6b7280",
    border: "rgba(0, 0, 0, 0.08)",
    success: "#10b981",
    shadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
  },

  seagreen: {
    name: "Sea Green",
    primary: "#249E94",
    primaryDark: "#0C7779",
    secondary: "#e0f7f5",
    background: "#f0faf9",
    surface: "rgba(255, 255, 255, 0.9)",
    text: "#0f766e",
    textLight: "#115e59",
    border: "rgba(36, 158, 148, 0.15)",
    success: "#10b981",
    shadow: "0 20px 60px rgba(36, 158, 148, 0.15)",
  },

  pastel: {
    name: "Pastel",
    primary: "#A1BC98",
    primaryDark: "#8aa681",
    secondary: "#f1f3e0",
    background: "#f9faf2",
    surface: "rgba(255, 255, 255, 0.9)",
    text: "#3A4A3F",
    textLight: "#4b6352",
    border: "rgba(161, 188, 152, 0.15)",
    success: "#10b981",
    shadow: "0 20px 60px rgba(161, 188, 152, 0.15)",
  },

  purple: {
    name: "Purple",
    primary: "#5D2F77",
    primaryDark: "#3E1E68",
    secondary: "#f3e8ff",
    background: "#faf5ff",
    surface: "rgba(255, 255, 255, 0.9)",
    text: "#4c1d95",
    textLight: "#5b21b6",
    border: "rgba(93, 47, 119, 0.15)",
    success: "#10b981",
    shadow: "0 20px 60px rgba(93, 47, 119, 0.15)",
  },
};

// Apply theme function
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) {
    console.error(`Theme "${themeName}" not found`);
    return;
  }

  // Update CSS variables
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--primary-dark", theme.primaryDark);
  root.style.setProperty("--secondary", theme.secondary);
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--surface", theme.surface);
  root.style.setProperty("--text", theme.text);
  root.style.setProperty("--text-light", theme.textLight);
  root.style.setProperty("--border", theme.border);
  root.style.setProperty("--success", theme.success);
  root.style.setProperty("--shadow", theme.shadow);
  root.style.setProperty(
    "--gradient",
    `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
  );

  // Update theme selector
  updateThemeSelector(themeName);

  // Update background shapes color
  updateShapesColor(theme.primary);

  // Save to localStorage
  localStorage.setItem("pos-admin-theme", themeName);

  // Dispatch event for other components
  document.dispatchEvent(new CustomEvent("themeChanged", { detail: theme }));

  console.log(`Theme applied: ${theme.name}`);
}

// Update theme selector UI
function updateThemeSelector(activeTheme) {
  const themeOptions = document.querySelectorAll(".theme-option");
  themeOptions.forEach((option) => {
    const theme = option.dataset.theme;
    option.classList.toggle("active", theme === activeTheme);
  });
}

// Update background shapes color
function updateShapesColor(color) {
  const shapes = document.querySelectorAll(
    ".bg-shapes::before, .bg-shapes::after, .shape-1, .shape-2, .shape-3, .shape-4",
  );
  // Since we can't directly style pseudo-elements with JS,
  // we'll create a style element
  let styleElement = document.getElementById("dynamic-shapes-style");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "dynamic-shapes-style";
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = `
    .bg-shapes::before,
    .bg-shapes::after,
    .shape-1,
    .shape-2,
    .shape-3,
    .shape-4 {
      background: ${color} !important;
    }
  `;
}

// Initialize theme on page load
function initTheme() {
  // Check for saved theme or use default
  const savedTheme = localStorage.getItem("pos-admin-theme") || "peach";

  // Apply saved theme
  applyTheme(savedTheme);

  // Add click handlers to theme options
  document.querySelectorAll(".theme-option").forEach((option) => {
    option.addEventListener("click", () => {
      const theme = option.dataset.theme;
      applyTheme(theme);
    });
  });
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { themes, applyTheme, initTheme };
}
