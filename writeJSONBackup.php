<?php

$json = $_POST['jsonObj'];

$fecha = time();

$campos = getdate($fecha);

$fd = fopen("Backup/Backup-$campos[mday]-$campos[mon]-$campos[year]-$campos[hours]_$campos[minutes].json","a+") or die ("Error al abrir el archivo Ejemplo.txt");

fputs($fd,$json);

fclose($fd);

?>