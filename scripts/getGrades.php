<?php
	function getGrades($link, $code) {
		$grades_stmt = mysqli_prepare($link, "SELECT `semester`, `students`, `pass`, `a`, `b`, `c`, `d`, `e`, `f` FROM `grades` WHERE `course` = ?");

		mysqli_stmt_bind_param($grades_stmt, 's', $code);
	
		$grades = array();
	
		mysqli_stmt_execute($grades_stmt);
	
		mysqli_stmt_bind_result($grades_stmt, $semester, $students, $pass, $a, $b, $c, $d, $e, $f);
	
		while (mysqli_stmt_fetch($grades_stmt)) {
			$students = (int) $students;
			$pass = (int) $pass;
			$a = (int) $a;
			$b = (int) $b;
			$c = (int) $c;
			$d = (int) $d;
			$e = (int) $e;
			$f = (int) $f;
	
			$grades["$semester"] = array("students" => $students, "pass" => $pass, "a" => $a, "b" => $b, "c" => $c, "d" => $d, "e" => $e, "f" => $f);
	
			uksort($grades, "cmp");
		}
	
		mysqli_stmt_close($grades_stmt);
	
		return json_encode($grades);
	}

	function cmp($x, $y) {
        if (substr($x, 1, 5) === substr($y, 1, 5)) {
            if (substr($x, 0, 1) === "V") {
                return -1;
            } elseif (substr($x, 0, 1) === "S" && substr($y, 0, 1) === "V") {
                return 1;
            } elseif (substr($x, 0, 1) === "S" && substr($y, 0, 1) === "H") {
                return -1;
            } else {
                return 1;
            }
        }
        return ((int)substr($x, 1, 5) < (int)substr($y, 1, 5)) ? -1 : 1;
    }

?>