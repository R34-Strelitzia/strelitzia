/**
 * Checks if an array includes a specific item
 *
 * @param array The array to search in
 * @param item The item to search for
 * @return true if the item is found in the array, otherwise returns false
 */
export const includes = <T>(array: T[], item: unknown): boolean => {
  for (const arrayItem of array) {
    if (arrayItem === item) {
      return true;
    }
  }

  return false;
};
