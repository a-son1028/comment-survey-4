docker build --no-cache -t untadee/comment-survey-fe-4 ./fe
docker push untadee/comment-survey-fe-4:latest


docker build --no-cache -t untadee/comment-survey-be-4 ./be
docker push untadee/comment-survey-be-4:latest
