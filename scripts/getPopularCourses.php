<?php

	function getPopularCourses($link) {
		$result = mysqli_query($link, "SELECT `course`, `name` FROM `courses` NATURAL JOIN `views` WHERE `name` <> '' ORDER BY `viewcount` DESC LIMIT 8");
				
		$courses = mysqli_fetch_all($result, MYSQLI_ASSOC);

		mysqli_free_result($result);

		return $courses;
	}

?>