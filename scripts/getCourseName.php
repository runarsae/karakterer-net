<?php
	function getCourseName($link, $code) {
		$name_stmt = mysqli_prepare($link, "SELECT `name` FROM `courses` WHERE `course` = ?");

		mysqli_stmt_bind_param($name_stmt, 's', $code);
	
		mysqli_stmt_execute($name_stmt);
	
		mysqli_stmt_bind_result($name_stmt, $name);
	
		mysqli_stmt_fetch($name_stmt);
	
		mysqli_stmt_close($name_stmt);

		return $name;
	}
?>