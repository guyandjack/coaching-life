//import des breakpoint
import { breakPoint } from "../breakpoint/break_point.js";

/**
 *
 *
 * @return {*} boolean true if screen size < 769px
 */
function isScreenMobil() {
  if (window.innerWidth > breakPoint.large_Max) {
    return false;
  }
  return true;
}

export { isScreenMobil };
