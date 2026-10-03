PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_lesson_progress` (
	`user_id` text NOT NULL,
	`lesson` integer NOT NULL,
	`best_score` integer NOT NULL,
	`attempts` integer DEFAULT 1 NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `lesson`),
	CONSTRAINT "valid_lesson" CHECK("__new_lesson_progress"."lesson" >= 0),
	CONSTRAINT "valid_score" CHECK("__new_lesson_progress"."best_score" BETWEEN 0 AND 3)
);
--> statement-breakpoint
INSERT INTO `__new_lesson_progress`("user_id", "lesson", "best_score", "attempts", "updated_at") SELECT "user_id", "lesson", "best_score", "attempts", "updated_at" FROM `lesson_progress`;--> statement-breakpoint
DROP TABLE `lesson_progress`;--> statement-breakpoint
ALTER TABLE `__new_lesson_progress` RENAME TO `lesson_progress`;--> statement-breakpoint
PRAGMA foreign_keys=ON;