default: clean install start

clean:
	rm -rf dist/

start:
	npm start

build:
	npm run build

fix:
	npm run fix-js
	npm run fix-styles

lint:
	npm run lint-js
	npm run lint-styles

install:
	npm install
