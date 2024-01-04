<?php

/**
 * Abort python and linux request attempts, using the browser_agent header
 * The attempt is also checked by a periodic task to add the IP to ban list
 *
 * Examples:
 * - python-requests/2.27.1
 * - Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0
 **/

$re = '/python|(X11.*Linux)/mi';
$ua = $_SERVER['HTTP_USER_AGENT'];

preg_match_all($re, $ua, $matches, PREG_SET_ORDER, 0);

if ($matches) {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    error_log("Invalid USER-AGENT attempt [{$ua}] - IP [$ip] - Session [".session_id()."]"); // Log user to file
    exit();
}

?>