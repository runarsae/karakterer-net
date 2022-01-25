<?php
	function updateViews($link, $code) {
		date_default_timezone_set('Europe/Oslo');
		$day = "day" . date("N");
	
		$views_stmt = mysqli_prepare($link, "UPDATE `views` SET `viewcount` = `viewcount` + 1, `$day` = `$day` + 1 WHERE `course` = ?");
	
		mysqli_stmt_bind_param($views_stmt, 's', $code);
	
		mysqli_stmt_execute($views_stmt);
	
		mysqli_stmt_close($views_stmt);
	}
?>