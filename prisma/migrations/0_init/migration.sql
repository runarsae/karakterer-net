-- CreateTable
CREATE TABLE `course_views` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `view_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_course_views_course_id_courses_id`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(255) NULL,
    `has_grades` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `uq_courses_code`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `is_graded` BOOLEAN NOT NULL,
    `has_genders` BOOLEAN NOT NULL,
    `students` INTEGER NOT NULL,
    `males` INTEGER NULL,
    `females` INTEGER NULL,
    `a` INTEGER NULL,
    `a_male` INTEGER NULL,
    `a_female` INTEGER NULL,
    `b` INTEGER NULL,
    `b_male` INTEGER NULL,
    `b_female` INTEGER NULL,
    `c` INTEGER NULL,
    `c_male` INTEGER NULL,
    `c_female` INTEGER NULL,
    `d` INTEGER NULL,
    `d_male` INTEGER NULL,
    `d_female` INTEGER NULL,
    `e` INTEGER NULL,
    `e_male` INTEGER NULL,
    `e_female` INTEGER NULL,
    `f` INTEGER NULL,
    `f_male` INTEGER NULL,
    `f_female` INTEGER NULL,
    `g` INTEGER NULL,
    `g_male` INTEGER NULL,
    `g_female` INTEGER NULL,
    `h` INTEGER NULL,
    `h_male` INTEGER NULL,
    `h_female` INTEGER NULL,
    `average_grade` FLOAT NULL DEFAULT (case when (`is_graded` = 1) then ((((((`a` * 5) + (`b` * 4)) + (`c` * 3)) + (`d` * 2)) + `e`) / `students`) end),
    `average_grade_male` FLOAT NULL DEFAULT (case when ((`is_graded` = 1) and (`has_genders` = 1)) then ((((((`a_male` * 5) + (`b_male` * 4)) + (`c_male` * 3)) + (`d_male` * 2)) + `e_male`) / `males`) end),
    `average_grade_female` FLOAT NULL DEFAULT (case when ((`is_graded` = 1) and (`has_genders` = 1)) then ((((((`a_female` * 5) + (`b_female` * 4)) + (`c_female` * 3)) + (`d_female` * 2)) + `e_female`) / `females`) end),
    `fail_percentage` FLOAT NULL DEFAULT (case when (`is_graded` = 1) then ((`f` / `students`) * 100) else ((`h` / `students`) * 100) end),
    `fail_percentage_male` FLOAT NULL DEFAULT (case when (`has_genders` = 1) then (case when `is_graded` then ((`f_male` / `males`) * 100) else ((`h_male` / `males`) * 100) end) end),
    `fail_percentage_female` FLOAT NULL DEFAULT (case when (`has_genders` = 1) then (case when `is_graded` then ((`f_female` / `females`) * 100) else ((`h_female` / `females`) * 100) end) end),

    UNIQUE INDEX `uq_grades_course_id_year_semester`(`course_id`, `year`, `semester`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `top_course_views` (
    `course_id` INTEGER NOT NULL,
    `course_code` VARCHAR(20) NOT NULL,
    `course_name` VARCHAR(255) NULL,
    `view_count` INTEGER NULL,

    UNIQUE INDEX `uq_top_course_views_course_code`(`course_code`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course_views` ADD CONSTRAINT `fk_course_views_course_id_courses_id` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `fk_grades_course_id_courses_id` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `top_course_views` ADD CONSTRAINT `fk_top_course_views_course_id_courses_id` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

