<?php	

		$search = $_GET['query'];

		if (strlen($search) >= 3) {

			require_once "../config/config.php";

			$link = getLink();
	
			$search = "%{$search}%";
	
			$stmt = mysqli_prepare($link, "SELECT `course` AS 'value', `name` AS 'data' FROM `courses` WHERE `course` LIKE ? OR `name` LIKE ?");
	
			mysqli_stmt_bind_param($stmt, 'ss', $search, $search);
	
			mysqli_stmt_execute($stmt);
	
			$result = mysqli_stmt_get_result($stmt);
	
			$courses = mysqli_fetch_all($result, MYSQLI_ASSOC);
	
			mysqli_free_result($result);
	
			$suggestions['suggestions'] = $courses;
	
			echo json_encode($suggestions);
		}
?>