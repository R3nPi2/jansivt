<?php
/*
 * jAnsiVT php shell Example
 * 
 * Author: R3n Pi2 <r3npi2@gmail.com> https://github.com/R3nPi2/
 *
 * IMPORTANT NOTE: Take care where you place that script. 
 *   If public, it opens a remote shell with NO SECURITY to your computer. 
 */
header('Access-Control-Allow-Origin: *'); 
$result = shell_exec($_GET['c']);
echo $result;
?>
