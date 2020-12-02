import './jquery.js'
export const $ = window.jQuery.noConflict(true);
import '../toastr.js'
import './bootstrap.min.js'
export let toast = toastr;
