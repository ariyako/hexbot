var foo = $jSpaghetti.module("camping").sequence("bankCamping")

foo.instructions = [
	{"@init": "startBankCamping"},
	{"@startMissionExecution": ["logout", "goToIp"]},
	{"@tryHostConnection": ["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@abortProcess"]}, {"wait":"_forPageToReload"}]},
	{"@accessTarget": "signInKnownTarget"},
	{"@cleanMyClues": ["cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanOwnLogs": ["goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@abortProcess"]}, {"wait": "_forPageToReload"}]},
	{"@abortProcess": "_exit"}
]