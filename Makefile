default: clean install dev

clean:
	rm -rf dist/

dev:
	npm run dev

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
