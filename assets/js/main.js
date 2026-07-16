/* Shared entry point for every page. Each init bails out when its markup is
   absent, so new pages can link this file unchanged. */

import { initReveal } from "./modules/reveal.js";
import { initTerminal } from "./modules/terminal.js";
import { initPrint } from "./modules/print.js";

initReveal();
initTerminal();
initPrint();
