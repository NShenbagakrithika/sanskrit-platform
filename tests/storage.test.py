import sqlite3,unittest
from pathlib import Path
class StorageTests(unittest.TestCase):
 def setUp(self):
  self.db=sqlite3.connect(':memory:')

  for migration in sorted(Path('drizzle').glob('*.sql')):self.db.executescript(migration.read_text())
 def tearDown(self):self.db.close()
 def test_progress_isolated_and_best_score_kept(self):
  query='INSERT INTO lesson_progress(user_id,lesson,best_score,attempts,updated_at) VALUES(?,?,?,1,?) ON CONFLICT(user_id,lesson) DO UPDATE SET best_score=MAX(best_score,excluded.best_score),attempts=attempts+1,updated_at=excluded.updated_at'
  self.db.execute(query,('learner_a',0,3,1));self.db.execute(query,('learner_a',0,1,2));self.db.execute(query,('learner_b',0,2,3))
  self.assertEqual(self.db.execute('SELECT best_score,attempts FROM lesson_progress WHERE user_id=?',('learner_a',)).fetchall(),[(3,2)])
  self.assertEqual(self.db.execute('SELECT best_score,attempts FROM lesson_progress WHERE user_id=?',('learner_b',)).fetchall(),[(2,1)])
 def test_expanded_lessons_and_old_progress(self):
  old=sqlite3.connect(':memory:');old.executescript(Path('drizzle/0000_exotic_the_fury.sql').read_text())
  old.execute('INSERT INTO lesson_progress VALUES(?,?,?,?,?)',('learner',0,2,4,1));old.commit()
  old.executescript(Path('drizzle/0001_slow_deadpool.sql').read_text())
  old.execute('INSERT INTO lesson_progress VALUES(?,?,?,?,?)',('learner',31,3,1,2))
  self.assertEqual(old.execute('SELECT lesson,best_score,attempts FROM lesson_progress ORDER BY lesson').fetchall(),[(0,2,4),(31,3,1)])
  old.close()
 def test_limit_does_not_increment_after_cap(self):
  q='INSERT INTO request_limits(user_id,bucket,requests) VALUES(?,?,1) ON CONFLICT(user_id,bucket) DO UPDATE SET requests=requests+1 WHERE requests<? RETURNING requests'
  for i in range(12):self.assertEqual(self.db.execute(q,('learner',10,12)).fetchone(),(i+1,))
  self.assertIsNone(self.db.execute(q,('learner',10,12)).fetchone())
  self.assertEqual(self.db.execute(q,('learner',11,12)).fetchone(),(1,))
 def test_invalid_progress_cannot_be_saved(self):
  for lesson,score in [(0,99),(-1,0)]:
   with self.assertRaises(sqlite3.IntegrityError):self.db.execute('INSERT INTO lesson_progress VALUES(?,?,?,?,?)',('learner',lesson,score,1,1))
if __name__=='__main__':unittest.main()
