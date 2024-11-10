"use client";

import { useEffect } from "react";

interface CourseViewTrackerProps {
  courseId: number;
}

export default function CourseViewTracker({
  courseId,
}: CourseViewTrackerProps) {
  useEffect(() => {
    fetch(`/api/courses/${courseId}/views`, {
      method: "POST",
    });
  });

  return null;
}
