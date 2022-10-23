-- CreateTable
CREATE TABLE `courses` (
    `course` VARCHAR(20) NOT NULL,
    `name` VARCHAR(255) NULL,

    FULLTEXT INDEX `courses_course_name_idx`(`course`, `name`),
    PRIMARY KEY (`course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course` VARCHAR(20) NOT NULL,
    `year` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `is_graded` BOOLEAN NOT NULL DEFAULT false,
    `has_genders` BOOLEAN NOT NULL DEFAULT false,
    `students` INTEGER NOT NULL DEFAULT 0,
    `males` INTEGER NULL,
    `females` INTEGER NULL DEFAULT 0,
    `a` INTEGER NULL DEFAULT 0,
    `a_male` INTEGER NULL DEFAULT 0,
    `a_female` INTEGER NULL DEFAULT 0,
    `b` INTEGER NULL DEFAULT 0,
    `b_male` INTEGER NULL DEFAULT 0,
    `b_female` INTEGER NULL DEFAULT 0,
    `c` INTEGER NULL DEFAULT 0,
    `c_male` INTEGER NULL DEFAULT 0,
    `c_female` INTEGER NULL DEFAULT 0,
    `d` INTEGER NULL DEFAULT 0,
    `d_male` INTEGER NULL DEFAULT 0,
    `d_female` INTEGER NULL DEFAULT 0,
    `e` INTEGER NULL DEFAULT 0,
    `e_male` INTEGER NULL DEFAULT 0,
    `e_female` INTEGER NULL DEFAULT 0,
    `f` INTEGER NULL DEFAULT 0,
    `f_male` INTEGER NULL DEFAULT 0,
    `f_female` INTEGER NULL DEFAULT 0,
    `g` INTEGER NULL DEFAULT 0,
    `g_male` INTEGER NULL DEFAULT 0,
    `g_female` INTEGER NULL DEFAULT 0,
    `h` INTEGER NULL DEFAULT 0,
    `h_male` INTEGER NULL DEFAULT 0,
    `h_female` INTEGER NULL DEFAULT 0,
    `average_grade` FLOAT NULL,
    `average_grade_male` FLOAT NULL DEFAULT ((((((`a_male` * 5) + (`b_male` * 4)) + (`c_male` * 3)) + (`d_male` * 2)) + `e_male`) / `males`),
    `average_grade_female` FLOAT NULL DEFAULT ((((((`a_female` * 5) + (`b_female` * 4)) + (`c_female` * 3)) + (`d_female` * 2)) + `e_female`) / `females`),
    `fail_percentage` FLOAT NULL DEFAULT (case when (`is_graded` = 1) then ((`f` / `students`) * 100) when (`is_graded` = 0) then ((`h` / `students`) * 100) end),
    `fail_percentage_male` FLOAT NULL DEFAULT (case when (`is_graded` = 1) then ((`f_male` / `males`) * 100) when (`is_graded` = 0) then ((`h_male` / `males`) * 100) end),
    `fail_percentage_female` FLOAT NULL DEFAULT (case when (`is_graded` = 1) then ((`f_female` / `females`) * 100) when (`is_graded` = 0) then ((`h_female` / `females`) * 100) end),

    UNIQUE INDEX `grades_course_year_semester_uindex`(`course`, `year`, `semester`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `top_visits` (
    `course` VARCHAR(20) NOT NULL,
    `count_sum` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visits` (
    `course` VARCHAR(20) NOT NULL,
    `date` DATE NOT NULL DEFAULT (curdate()),
    `count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`course`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_courses_course_fk` FOREIGN KEY (`course`) REFERENCES `courses`(`course`) ON DELETE NO ACTION ON UPDATE NO ACTION;
