-- DropIndex
DROP INDEX `courses_course_name_idx` ON `courses`;

-- CreateIndex
CREATE INDEX `courses_name_course_idx` ON `courses`(`name`, `course`);
