<?php

$json = $_POST['jsonObj'];

$fecha = time();

$campos = da

$fd = fopen("Backup-.txt","a+") or die ("Error al abrir el archivo Ejemplo.txt");

fputs($fd,$json);

?>