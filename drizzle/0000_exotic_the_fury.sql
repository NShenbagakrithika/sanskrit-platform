CREATE TABLE IF NOT EXISTS `lesson_progress` (
	`user_id` text NOT NULL,
	`lesson` integer NOT NULL,
	`best_score` integer NOT NULL,
	`attempts` integer DEFAULT 1 NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `lesson`),
	CONSTRAINT "valid_lesson" CHECK("lesson_progress"."lesson" BETWEEN 0 AND 3),
	CONSTRAINT "valid_score" CHECK("lesson_progress"."best_score" BETWEEN 0 AND 3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `request_limits` (
	`user_id` text NOT NULL,
	`bucket` integer NOT NULL,
	`requests` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`user_id`, `bucket`)
);
