BEGIN;

  CREATE VIEW tagsbyquiz AS
   SELECT quiz.id,
    array_agg(tag.name) AS tags
   FROM quiz_has_tag
     JOIN quiz ON quiz.id = quiz_has_tag.quiz_id
     JOIN tag ON tag.id = quiz_has_tag.tag_id
  GROUP BY quiz.id;

  CREATE VIEW answersbyQuestion AS
   SELECT answer.question_id,
    array_agg(answer.description) AS answers
   FROM answer
   JOIN question ON question.id = answer.question_id
  GROUP BY answer.question_id;

 CREATE VIEW questionAndAnswers AS
SELECT  quiz.id AS quiz_id,
        quiz.title,
        quiz.description,
        "user".firstname,
        "user".lastname,
        question.id AS question_id,
        question.question,
        question.anecdote,
        question.wiki,
        "level".name,
        tagsbyquiz.tags,
        answersbyQuestion.answers
FROM question
JOIN answer ON answer.question_id = question.id
JOIN "level" ON "level".id = question.level_id
JOIN quiz ON quiz.id = question.quiz_id
JOIN "user" ON "user".id = quiz.user_id
JOIN tagsbyquiz ON quiz.id = tagsbyquiz.id
JOIN answersbyQuestion ON answersbyQuestion.question_id = question.id
GROUP BY quiz.id,quiz.title,quiz.description,"user".firstname,"user".lastname,question.id,"level".name,tagsbyquiz.tags,answersbyQuestion.answers;


COMMIT;
