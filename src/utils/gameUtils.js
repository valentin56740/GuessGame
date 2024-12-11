/**
 * Get a random game from the collection
 * @param {Array} games - Array of game objects
 * @returns {Object} A random game object
 */
export const getRandomGame = (games) => {
  const randomIndex = Math.floor(Math.random() * games.length);
  return games[randomIndex];
};

/**
 * Format the release date to a localized string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatReleaseDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

/**
 * Check if a game has alternative names
 * @param {Object} game - Game object
 * @returns {boolean} Whether the game has alternative names
 */
export const hasAlternativeNames = (game) => {
  return Array.isArray(game.alternative_names) && game.alternative_names.length > 0;
};

/**
 * Format alternative names into a readable string
 * @param {string[]} names - Array of alternative names
 * @returns {string} Formatted string of alternative names
 */
export const formatAlternativeNames = (names) => {
  if (!Array.isArray(names) || names.length === 0) {
    return '';
  }
  return names.join(', ');
};