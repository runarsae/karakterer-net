create table courses
(
	course varchar(20) not null,
	name varchar(255) null,
	primary key (course)
)
collate=utf8mb4_unicode_ci;

create table courses_with_grades
(
	course varchar(20) collate utf8mb4_unicode_ci not null,
	name varchar(255) collate utf8mb4_unicode_ci null,
	primary key (course)
);

create index courses_with_grades_course_name_index
	on courses_with_grades (course, name);

create table grades
(
	id int auto_increment
		primary key,
	course varchar(20) not null,
	year int not null,
	semester int not null,
	is_graded tinyint(1) default 0 not null,
	has_genders tinyint(1) default 0 not null,
	students int default 0 not null,
	males int null,
	females int default 0 null,
	a int default 0 null,
	a_male int default 0 null,
	a_female int default 0 null,
	b int default 0 null,
	b_male int default 0 null,
	b_female int default 0 null,
	c int default 0 null,
	c_male int default 0 null,
	c_female int default 0 null,
	d int default 0 null,
	d_male int default 0 null,
	d_female int default 0 null,
	e int default 0 null,
	e_male int default 0 null,
	e_female int default 0 null,
	f int default 0 null,
	f_male int default 0 null,
	f_female int default 0 null,
	g int default 0 null,
	g_male int default 0 null,
	g_female int default 0 null,
	h int default 0 null,
	h_male int default 0 null,
	h_female int default 0 null,
	average_grade float default (((((((`a` * 5) + (`b` * 4)) + (`c` * 3)) + (`d` * 2)) + `e`) / `students`)) null,
	average_grade_male float default (((((((`a_male` * 5) + (`b_male` * 4)) + (`c_male` * 3)) + (`d_male` * 2)) + `e_male`) / `males`)) null,
	average_grade_female float default (((((((`a_female` * 5) + (`b_female` * 4)) + (`c_female` * 3)) + (`d_female` * 2)) + `e_female`) / `females`)) null,
	fail_percentage float default ((case when (`is_graded` = 1) then ((`f` / `students`) * 100) when (`is_graded` = 0) then ((`h` / `students`) * 100) end)) null,
	fail_percentage_male float default ((case when (`is_graded` = 1) then ((`f_male` / `males`) * 100) when (`is_graded` = 0) then ((`h_male` / `males`) * 100) end)) null,
	fail_percentage_female float default ((case when (`is_graded` = 1) then ((`f_female` / `females`) * 100) when (`is_graded` = 0) then ((`h_female` / `females`) * 100) end)) null,
	constraint grades_course_year_semester_uindex
		unique (course, year, semester),
	constraint grades_courses_course_fk
		foreign key (course) references courses (course)
)
collate=utf8mb4_unicode_ci;

create table top_views
(
	course varchar(20) not null,
	count_sum int default 0 not null,
	primary key (course),
	constraint top_views_courses_course_fk
		foreign key (course) references courses (course)
)
collate=utf8mb4_unicode_ci;

create table views
(
	course varchar(20) not null,
	date varchar(10) not null,
	count int default 0 not null,
	primary key (course, date),
	constraint views_courses_course_fk
		foreign key (course) references courses (course)
)
collate=utf8mb4_unicode_ci;

create procedure refresh_top_views()
BEGIN
    TRUNCATE TABLE top_views;

    INSERT INTO top_views (
        SELECT course, SUM(count) AS count_sum
        FROM views
        WHERE STR_TO_DATE(date, "%d/%m/%Y") >= DATE(NOW()) - INTERVAL 7 DAY
        GROUP BY course
        ORDER BY count_sum DESC
        LIMIT 8
    );

    # DELETE FROM views WHERE STR_TO_DATE(date, "%d/%m/%Y") < DATE(NOW()) - INTERVAL 7 DAY;
END;

create event refresh_top_views_daily on schedule
	every '1' DAY
	starts '2022-09-25 00:00:00'
	enable
	do
	CALL refresh_top_views();

