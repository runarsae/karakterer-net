<?php

	require_once "../config/config.php";

	$link = getLink();

	date_default_timezone_set('Europe/Oslo');
	$day = "day" . date("N");

	$stmt = mysqli_prepare($link, "UPDATE `views` SET viewcount = viewcount - `$day`, `$day` = 0");

	if (mysqli_stmt_execute($stmt)) {
		echo "Success! Affected rows: ".mysqli_stmt_affected_rows($stmt); 
	} else {
		echo "Statement execution failed for $day.";
	}

	mysqli_stmt_close($stmt);
	mysqli_close($link);

?>