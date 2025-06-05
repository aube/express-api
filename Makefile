.PHONY: run
run:
	docker run -d -p 3000:3000 express-api:latest

.PHONY: list
list:
	docker ps -a --filter ancestor=express-api --format="{{.ID}}"

.PHONY: stop
stop:
	docker rm $$(docker stop $$(docker ps -a --filter ancestor=express-api --format="{{.ID}}"))

.PHONY: update
update:
	docker rmi express-api -f
	git pull
	docker build -t express-api .
