var foo = $jSpaghetti.module("missions").sequence("transferMoney")

foo.instructions = [
	{"@askForPermission": 			"askPermissionToAbort"},
	{"@init": "startTransferMoney"},
	{"@tryToGetMission": 			["goToMissionsTab", "checkSameTypeAcceptedMission", {"gotoif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"gotoif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission", {"wait": "_forTheSignal"}, {"gotoif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": 		["goToAcceptMissionPage", "isThereMessageError", {"gotoif": ["*.$", "@init"]}, "clickOnAcceptMissionButton", {"wait": {"_forTheSignal": "waitForSubmitButton"}}, "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"gotoif":["*.$", "@init"]}]},
	{"@startMissionExecution": 		["getMissionInfo", "logout", "goToNextIp"]},
	{"@hackAccountProcess": 		["hackAccount", "isCrackerStrongEnough", {"gotoif":["!*.$", "@abortProcess"]}, "isThereMessageError", {"gotoif":["*.$", "@signInAccountAndTransfer"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@signInAccountAndTransfer": 	["signInAccount", "checkFunds", {"gotoif":["!*.$", "@logoutAccount"]}, {"wait": 1000}, "transferRandomValueToTarget", {"gotoif":["*.rest <= 0", "@logoutAccount"]}, {"wait":1000}, "transferTheRestToMe"]},
	{"@logoutAccount": 				["getOutFromAccount", "logout"]},
	{"@tryHostConnection": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogs"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@accessTarget": 				["goToLoginPage", "signInKnownTarget"]},
	{"@cleanTargetLogs": 			["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@cleanOtherTargetLogs": 		[{"gotoif": ["((*.cleanerCount == 2) || (*.ips[0] == *.ips[1]))", "@cleanOwnLogs"]}, "logout", "goToNextIp", {"gotoif": ["true", "@tryHostConnection"]}]},
	{"@cleanOwnLogs": 				["logout", "goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finishMission"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@finishMission": 				[{"gotoif":["*.funds == 0", "@abortProcess"]}, "goToMissionsTab", "clickOnTransferMoneyFinishButton", {"wait": {"_forTheSignal": "waitForSubmitButton"}}, "confirmMissionCompleteButton", {"gotoif": ["true", "@init"]}]},
	{"@abortProcess": 				[{"gotoif":["*.abortMissionAllowed", "@abortMission"]}, "informBadCracker", "_exit"]},
	{"@abortMission": 				["goToMissionsTab", "clickOnAbortMissionButton", {"wait": {"_forTheSignal": "waitForSubmitButton"}}, "clickOnConfirmAbortMissionButton", {"gotoif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": 	["alertAnotherMissionKindAlreadyAccepted", "_exit"]}
]