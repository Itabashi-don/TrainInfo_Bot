module.exports = {
	"extends": "eslint:recommended",
	"plugins": [],
	
	"env": {
		"es6": true,
		"node": true
	},
	
	"parserOptions": {
		"ecmaVersion": 6
	},
	
	"rules": {
		"semi": ["error", "always", { "omitLastInOneLineBlock": true }],
		"semi-style": ["error", "last"],
		"no-unused-vars": "warn",
		"no-duplicate-imports": "error",
		"object-shorthand": ["error", "always", { "avoidExplicitReturnArrows": true }],
		"prefer-rest-params": "warn",
		"prefer-spread": "warn",
		"prefer-template": "warn",
		"prefer-numeric-literals": "warn"
	}
}