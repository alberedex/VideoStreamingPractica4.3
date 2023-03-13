<?php

$json = $_POST['jsonObj'];

$fecha = time();

$campos = getdate($fecha);

$fd = fopen("Backup-$campos[mday]/$campos[mon]/$campos[year]$campos[hours]:$campos[minutes].txt","a+") or die ("Error al abrir el archivo Ejemplo.txt");

fputs($fd,$json);

?>